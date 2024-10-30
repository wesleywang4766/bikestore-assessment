import 'server-only';

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
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { and } from 'drizzle-orm';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);

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
    eq(products.status, status as 'active' | 'inactive' | 'archived'),
    ilike(products.name, `%${search}%`)
  );

  let totalProducts = await db
    .select({ count: count() })
    .from(products)
    .where(whereClause);

  let moreProducts = await db
    .select()
    .from(products)
    .where(whereClause)
    .limit(5)
    .offset(offset);

  const totalCount: number = totalProducts[0].count;
  const newOffset = Math.min(offset + pageSize, totalCount);

  const result = {
    products: moreProducts,
    newOffset,
    totalProducts: totalCount
  };

  return result;
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export async function setProductStatusToArchivedById(id: number) {
  await db.update(products).set({ status: 'archived' }).where(eq(products.id, id));
}
