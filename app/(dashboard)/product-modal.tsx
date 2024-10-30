'use client'

import { Dialog, DialogClose, DialogOverlay, DialogContent, DialogDescription, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from '@/components/context/modal-context';

export const ProductModal = () => {
  const { isOpen, modalContent, closeModal } = useModal();

  if (!isOpen) return null;

  const initialValues = modalContent ? {
    name: modalContent.name || '',
    price: modalContent.price || 0,
    stock: modalContent.stock || 0,
  } : {};

  const modalType = modalContent?.type || 'create';

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="outline-none">
          <DialogTitle>
            {`${modalType.replace(/^\w/, (c: any) => c.toUpperCase())}`} Product
          </DialogTitle>
          <DialogDescription>
            {`Fill in the necessary details to ${modalType} a product.`}
          </DialogDescription>
          <form> {/* onSubmit={handleCreateProduct}*/}
            <div className="flex flex-col gap-2">
              <fieldset>
                <div className="flex items-center">
                  <label className="text-sm w-[100px]" htmlFor="name">
                    Name
                  </label>
                  <Input
                    name="name"
                    type="text"
                    defaultValue={initialValues.name}
                    placeholder="Enter product name"
                    className="rounded-lg bg-background"
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="flex items-center">
                  <label className="text-sm w-[100px]" htmlFor="price">
                    Price
                  </label>
                  <Input
                    name="price"
                    type="number"
                    defaultValue={initialValues.price}
                    className="rounded-lg bg-background"
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="flex items-center">
                  <label className="text-sm w-[100px]" htmlFor="stock">
                    Total Sales
                  </label>
                  <Input
                    name="stock"
                    type="number"
                    defaultValue={initialValues.stock}
                    className="rounded-lg bg-background"
                  />
                </div>
              </fieldset>
            </div>
            <DialogClose asChild />
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};