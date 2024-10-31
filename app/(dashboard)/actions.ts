'use server';

import {
  deleteProductById,
  setProductStatusToArchivedById,
  createProduct,
  editProductById,
  CreateProduct,
  uploadProductImageById
} from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function newProduct(product: CreateProduct) {
  await createProduct(product);
  revalidatePath('/');
}

export async function editProduct(id: number, product: Partial<CreateProduct>) {
  await editProductById(id, product);
  revalidatePath('/');
}

export async function deleteProduct(id: number) {
  await deleteProductById(id);
  revalidatePath('/');
}

export async function setProductStatusToArchived(id: number) {
  await setProductStatusToArchivedById(id);
  revalidatePath('/');
}

export async function uploadProductImage(id: number, imageData: string) {
  await uploadProductImageById(id, imageData);
  revalidatePath('/');
}