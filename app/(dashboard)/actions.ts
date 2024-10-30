'use server';

import { deleteProductById, setProductStatusToArchivedById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(id: number) {
  await deleteProductById(id);
  revalidatePath('/');
}

export async function setProductStatusToArchived(id: number) {
  await setProductStatusToArchivedById(id);
  revalidatePath('/');
}