import { Dialog, DialogClose, DialogOverlay, DialogContent, DialogDescription, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ProductModalProps {
  triggerButton: React.ReactNode;
}

export const ProductModal: React.FC<ProductModalProps> = ({ triggerButton }) => (
  <Dialog>
    <DialogTrigger asChild>
      {triggerButton}
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay />
      <DialogContent className="outline-none">
        <DialogTitle>Create Product</DialogTitle>
        <DialogDescription>
          Fill in the necessary details to create a product.
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
                  defaultValue=""
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
                  defaultValue="0"
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
                  defaultValue="0"
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