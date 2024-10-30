'use server';

import { deleteProductById, setProductStatusToArchivedById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData) {
  let id = Number(formData.get('id'));
  await deleteProductById(id);
  revalidatePath('/');
}

export async function setProductStatusToArchived(formData: FormData) {
  let id = Number(formData.get('id'));
  await setProductStatusToArchivedById(id);
  revalidatePath('/');
}