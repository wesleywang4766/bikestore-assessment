import { getProducts } from '@/lib/db';
import { ProductTabs } from './product-tabs';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string; status: string; pageSize: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const status = searchParams.status ?? 'active';
  const pageSize = searchParams.pageSize ?? 5;
  const { products, newOffset, totalProducts } = await getProducts(
    search,
    Number(offset),
    Number(pageSize),
    status
  );

  return (
    <ProductTabs
      products={products}
      newOffset={newOffset}
      pageSize={Number(pageSize)}
      totalProducts={totalProducts}
      status={status}
    />
  );
}
