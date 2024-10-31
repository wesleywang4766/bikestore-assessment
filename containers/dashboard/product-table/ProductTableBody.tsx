import { TableBody } from "@/components/ui/table";
import { SelectProduct } from "@/lib/db";
import { Product } from "./Product";

export function ProductTableBody({ products }: { products: SelectProduct[] }) {
  return (
    <TableBody>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </TableBody>
  );
}