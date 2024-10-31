'use client'

import { useEffect, useState } from 'react';
import { Dialog, DialogClose, DialogOverlay, DialogContent, DialogDescription, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useModal } from '@/components/context/modal-context';
import { Button } from "@/components/ui/button";
import { PencilIcon, PencilOffIcon } from "lucide-react";
import { newProduct, editProduct } from './actions';

export const ProductModal = () => {
  const { isOpen, modalContent, closeModal } = useModal();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    if (modalContent) {
      setName(modalContent.name || '');
      setPrice(modalContent.price || 0);
      setStock(modalContent.stock || 0);
      setIsDraft((modalContent.status || 'active') === 'inactive' ? false : true);
    }
  }, [modalContent]);

  if (!isOpen) return null;
  const modalType = modalContent?.type || 'create';

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') setIsDraft(false);
    else if (isDraft === false) setIsDraft(true);
    setName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) === 0) setIsDraft(false);
    else if (isDraft === false) setIsDraft(true);
    setPrice(Number(event.target.value));
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) === 0) setIsDraft(false);
    else if (isDraft === false) setIsDraft(true);
    setStock(Number(event.target.value));
  };

  const saveProduct = () => {
    const status: "inactive" | "active" | "archived" = isDraft ? 'active' : 'inactive';
    const availableAt = new Date();
    const imageUrl = '';

    if (modalType === 'create') {
      newProduct({ name, price: price.toString(), stock, status, availableAt, imageUrl });
    } else {
      editProduct(modalContent.id, { name, price: price.toString(), stock, status });
    }
    closeModal();
  }

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
          <form>
            <div className="flex flex-col gap-4">
              <fieldset>
                <div className="flex items-center">
                  <label className="text-sm w-[100px]" htmlFor="name">
                    Name
                  </label>
                  <Input
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
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
                    value={price}
                    onChange={handlePriceChange}
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
                    value={stock}
                    onChange={handleStockChange}
                    className="rounded-lg bg-background"
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="flex gap-4 items-center">
                  <Button
                    type="submit"
                    className="w-full h-8 gap-1"
                    onClick={() => saveProduct()}
                    disabled={!isDraft}
                  >
                    <PencilIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Save</span>
                  </Button>
                  <Button
                    type="submit"
                    className="w-full h-8 gap-1"
                    onClick={() => saveProduct()}
                    disabled={isDraft}
                  >
                    <PencilOffIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Save as draft</span>
                  </Button>
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