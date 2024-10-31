'use client';

import { useTransition } from 'react';
import { useSearchParams } from "next/navigation";

import { Table } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "./Pagination";
import { ProductTableHeader } from "./ProductTableHeader";
import { ProductTableBody } from "./ProductTableBody";

import { SelectProduct } from "@/lib/db";
import { useRouterContext } from "@/components/context/router-context";
import { useTransitionContext } from '@/components/context/transition-context';
import Loader from 'app/(dashboard)/loading';

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
  const { isPending } = useTransitionContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      {isPending ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </Card>
  );
}