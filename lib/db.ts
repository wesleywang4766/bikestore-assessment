import 'server-only';

import { put } from '@vercel/blob';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike, desc } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { and } from 'drizzle-orm';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'draft', 'archived']);
export const typeEnum = pgEnum('type', ['road bike', 'mountain bike', 'racing bike']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  rating: numeric('rating', { precision: 10, scale: 2 }).notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),
  type: typeEnum('type').notNull(),
  status: statusEnum('status').notNull(),
  imageUrl: text('image_url').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export type CreateProduct = typeof products.$inferInsert;
export const insertproductschema = createInsertSchema(products);

export async function getProducts(
  search: string,
  offset: number,
  pageSize: number,
  status: string = 'active'
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  const whereClause = and(
    eq(products.status, status as 'active' | 'draft' | 'archived'),
    ilike(products.name, `%${search}%`)
  );

  let totalproducts = await db
    .select({ count: count() })
    .from(products)
    .where(whereClause);

  let moreProducts = await db
    .select()
    .from(products)
    .where(whereClause)
    .limit(5)
    .offset(offset);

  const totalCount: number = totalproducts[0].count;
  const newOffset = Math.min(offset + pageSize, totalCount);

  const result = {
    products: moreProducts,
    newOffset,
    totalProducts: totalCount
  };

  return result;
}

export async function createProduct(product: CreateProduct) {
  const maxProduct = await db
    .select()
    .from(products)
    .orderBy(desc(products.id))
    .limit(1);

  product.id = maxProduct[0].id + 1;

  await db.insert(products).values(product);
}

export async function editProductById(id: number, product: Partial<CreateProduct>) {
  await db.update(products).set(product).where(eq(products.id, id));
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export async function setProductStatusToArchivedById(id: number) {
  await db.update(products).set({ status: 'archived' }).where(eq(products.id, id));
}

export async function uploadProductImageById(id: number, imageData: string) {
  const { url: imageUrl } = await put(`products/${id}.png`, Buffer.from(imageData, 'base64'), {
    access: 'public',
  });
  await db.update(products).set({ imageUrl }).where(eq(products.id, id));
}