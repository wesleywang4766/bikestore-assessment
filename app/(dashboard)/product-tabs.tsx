'use client'

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from '@/components/context/modal-context';
import { SelectProduct } from '@/lib/db';
import { PlusCircle } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductsTable } from "./products-table";
import React, { useMemo } from 'react';

interface ProductsTabsProps {
  products: SelectProduct[];
  newOffset: number | null;
  pageSize: number;
  totalProducts: number;
  status: string;
}

const productStatues = ["active", "inactive", "archived"];

export const ProductTabs = (props: ProductsTabsProps) => {
  const { products, newOffset, pageSize, totalProducts, status } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openModal } = useModal();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', value);
    params.set('offset', '0');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const tableProps = useMemo(() => ({
    products,
    offset: newOffset ?? 0,
    pageSize,
    totalProducts
  }), [products, newOffset, pageSize, totalProducts]);

  return (
    <div>
      <Tabs defaultValue={status} onValueChange={handleTabChange}>
        <div className="flex items-center">
          <TabsList>
            {productStatues.map((tabStatus) => (
              <TabsTrigger
                key={tabStatus}
                value={tabStatus}
                className={tabStatus === "archived" ? "hidden sm:flex" : ""}
              >
                {tabStatus.charAt(0).toUpperCase() + tabStatus.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1" onClick={openModal}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        {productStatues.map((tabStatus) => (
          <TabsContent key={tabStatus} value={tabStatus}>
            <ProductsTable {...tableProps} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
