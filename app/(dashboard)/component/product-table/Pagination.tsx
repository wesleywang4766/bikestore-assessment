import { TransitionStartFunction } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTransitionContext } from "@/components/context/transition-context";

export function Pagination({
  offset,
  pageSize,
  totalProducts,
  router,
  searchParams
}: {
  offset: number;
  pageSize: number;
  totalProducts: number;
  router: any;
  searchParams: URLSearchParams;
}) {
  let productsPerPage = 5;
  const { startTransition } = useTransitionContext();

  function prevPage() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('offset', (Math.floor((offset - 1) / pageSize - 1) * pageSize).toString());
    startTransition(() => {
      router?.push(`?${params.toString()}`, { scroll: false });
    });
  }

  function nextPage() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('offset', offset.toString());
    startTransition(() => {
      router?.push(`?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <form className="flex items-center w-full justify-between">
      <div className="text-xs text-muted-foreground">
        Showing{' '}
        <strong>
          {offset - ((offset - 1) % productsPerPage)}-{offset}
        </strong>{' '}
        of <strong>{totalProducts}</strong> products
      </div>
      <div className="flex">
        <Button
          formAction={prevPage}
          variant="ghost"
          size="sm"
          type="submit"
          disabled={offset <= productsPerPage}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Prev
        </Button>
        <Button
          formAction={nextPage}
          variant="ghost"
          size="sm"
          type="submit"
          disabled={offset === totalProducts}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}