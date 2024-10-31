'use client';

import { useSearchParams } from "next/navigation";

import { Table } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "./Pagination";
import { ProductTableHeader } from "./ProductTableHeader";
import { ProductTableBody } from "./ProductTableBody";

import { SelectProduct } from "@/lib/db";
import { useRouterContext } from "@/components/context/router-context";

export function ProductsTable({
  products,
  offset,
  pageSize,
  totalProducts,
}: {
  products: SelectProduct[];
  offset: number;
  pageSize: number;
  totalProducts: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouterContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <ProductTableHeader />
          <ProductTableBody products={products} />
        </Table>
      </CardContent>
      <CardFooter>
        <Pagination
          offset={offset}
          pageSize={pageSize}
          totalProducts={totalProducts}
          router={router}
          searchParams={searchParams}
        />
      </CardFooter>
    </Card>
  );
}