'use client'

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { useModal } from '@/components/context/modal-context';
import { SelectProduct } from '@/lib/db';
import { TabHeader } from "./TabHeader";
import { TabContent } from "./TabContent";
import { useRouterContext } from '@/components/context/router-context';

interface ProductsTabsProps {
  products: SelectProduct[];
  newOffset: number | null;
  pageSize: number;
  totalProducts: number;
  status: string;
}

const productStatuses = ["active", "inactive", "archived"];

export const ProductTabs = (props: ProductsTabsProps) => {
  const { products, newOffset = 0, pageSize, totalProducts, status } = props;
  const searchParams = useSearchParams();
  const router = useRouterContext();
  const { openModal } = useModal();

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', value);
    params.set('offset', '0');
    router?.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <Tabs defaultValue={status}>
        <div className="flex justify-between items-center mb-4">
          <TabHeader statuses={productStatuses} currentStatus={status} onStatusChange={handleStatusChange} />
          <Button onClick={() => openModal({ type: 'create' })}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        {productStatuses.map((status) => (
          <TabContent
            key={status}
            status={status}
            products={products}
            newOffset={Number(newOffset)}
            pageSize={pageSize}
            totalProducts={totalProducts}
          />
        ))}
      </Tabs>
    </div>
  );
};
