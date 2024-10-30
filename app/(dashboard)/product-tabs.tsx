'use client'

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SelectProduct } from '@/lib/db';
import { PlusCircle } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductsTable } from "./products-table";
import { ProductModal } from "./product-modal";


interface ProductsTabsProps {
  products: SelectProduct[];
  newOffset: number | null;
  pageSize: number;
  totalProducts: number;
  status: string;
}

export const ProductTabs = (props: ProductsTabsProps) => {
  const { products, newOffset, pageSize, totalProducts, status } = props;
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', value);
    params.set('offset', '0');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <Tabs defaultValue={status} onValueChange={handleTabChange}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <ProductModal triggerButton={
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            } />
          </div>
        </div>
        <TabsContent value="active">
          <ProductsTable
            products={products}
            offset={newOffset ?? 0}
            pageSize={pageSize}
            totalProducts={totalProducts}
          />
        </TabsContent>
        <TabsContent value="inactive">
          <ProductsTable
            products={products}
            offset={newOffset ?? 0}
            pageSize={pageSize}
            totalProducts={totalProducts}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ProductsTable
            products={products}
            offset={newOffset ?? 0}
            pageSize={pageSize}
            totalProducts={totalProducts}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
