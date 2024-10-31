'use client'

import { PencilIcon, PencilOffIcon } from "lucide-react";
import { Dialog, DialogClose, DialogOverlay, DialogContent, DialogDescription, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from './FormField';
import { useProductForm } from '../../../hooks/useProductForm';

export const ProductModal = () => {
  const {
    isOpen,
    name,
    description,
    type,
    rating,
    price,
    quantity,
    isDraft,
    modalType,
    handleInputChange,
    saveProduct,
    closeModal,
  } = useProductForm();

  if (!isOpen) return null;

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
              <FormField label="Name" name="name" type="text" value={name} onChange={handleInputChange} />
              <FormField label="Description" name="description" type="text" value={description} onChange={handleInputChange} />
              <FormField label="Rating" name="rating" type="number" max={5} value={rating} onChange={handleInputChange} />
              <FormField label="Price" name="price" type="number" value={price} onChange={handleInputChange} />
              <FormField label="Quantity" name="quantity" type="number" value={quantity} onChange={handleInputChange} />
              <div className="flex gap-4 items-center">
                <label className="text-sm font-bold">
                  Type:&nbsp;
                </label>
                <FormField label="Road Bike" name="type" type="radio" value="road bike" correctValue={type} onChange={handleInputChange} />
                <FormField label="Mountain Bike" name="type" type="radio" value="mountain bike" correctValue={type} onChange={handleInputChange} />
                <FormField label="Racing Bike" name="type" type="radio" value="racing bike" correctValue={type} onChange={handleInputChange} />
              </div>
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
            </div>
            <DialogClose asChild />
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};