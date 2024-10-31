import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { ProductsTable } from "../product-table";
import { SelectProduct } from '@/lib/db';

interface TabContentProps {
  status: string;
  products: SelectProduct[];
  newOffset: number;
  pageSize: number;
  totalProducts: number;
}

export const TabContent: React.FC<TabContentProps> = ({ status, products, newOffset, pageSize, totalProducts }) => (
  <TabsContent value={status}>
    <ProductsTable
      products={products}
      offset={newOffset}
      pageSize={pageSize}
      totalProducts={totalProducts}
    />
  </TabsContent>
);