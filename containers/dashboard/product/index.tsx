import Image from 'next/image';
import { PencilIcon, CircleXIcon, ArchiveXIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { useModal } from '@/providers/context/modal-context';
import { SelectProduct } from '@/lib/db';
import { deleteProduct, setProductStatusToArchived } from '../../../app/(dashboard)/actions';
import { ImageUploader } from '../product-image-upload';

export function Product({ product }: { product: SelectProduct }) {
  const { openModal } = useModal();

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        {product.imageUrl ? (
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="128"
            src={product.imageUrl}
            width="128"
          />) : (
          <ImageUploader productId={product.id} />
        )}
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.availableAt.toLocaleDateString("en-US")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openModal({ type: "edit", ...product })}>
              <div className="flex items-center gap-2">
                <PencilIcon className="h-3.5 w-3.5" />
                <span>Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteProduct(product.id)}>
              <div className="flex items-center gap-2">
                <CircleXIcon className="h-3.5 w-3.5" />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setProductStatusToArchived(product.id)}>
              <div className="flex items-center gap-2">
                <ArchiveXIcon className="h-3.5 w-3.5" />
                <span>Archive</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
