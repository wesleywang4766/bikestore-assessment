import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTransitionContext } from "@/providers/context/transition-context";

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

  function handlePageClick(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('offset', ((page - 1) * pageSize).toString());
    startTransition(() => {
      router?.push(`?${params.toString()}`, { scroll: false });
    });
  }

  const lastIndex = Math.ceil(totalProducts / pageSize);
  const currentIndex = Math.ceil(offset / pageSize);
  const maxBtnCount = 3;
  let btnNames: Array<number | string> = [];
  if (lastIndex < maxBtnCount * 2 + 1) {
    btnNames = [...Array(lastIndex)].map((_, index) => index + 1);
  } else {
    if (currentIndex < maxBtnCount + 1) {
      btnNames = [...Array(maxBtnCount)].map((_, index) => index + 1);
      btnNames.push('...');
      btnNames.push(lastIndex);
    } else if (currentIndex > lastIndex - maxBtnCount) {
      btnNames = [1, '...'];
      btnNames.push(...[...Array(maxBtnCount)].map((_, index) => lastIndex - maxBtnCount * 2 + index));
    } else {
      btnNames = [1, '...'];
      btnNames.push(...[...Array(maxBtnCount)].map((_, index) => currentIndex - maxBtnCount + index));
      btnNames.push('...');
      btnNames.push(lastIndex);
    }
  }

  return (
    <form className="flex items-center w-full justify-between">
      <div className="text-xs text-muted-foreground">
        Showing{' '}
        <strong>
          {offset - ((offset - 1) % pageSize)}-{offset}
        </strong>{' '}
        of <strong>{totalProducts}</strong> products
      </div>
      <div className="flex">
        <Button
          formAction={() => handlePageClick(1)}
          variant="ghost"
          size="sm"
          type="submit"
          disabled={offset <= pageSize}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          formAction={prevPage}
          variant="ghost"
          size="sm"
          type="submit"
          disabled={offset <= pageSize}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {btnNames.map((page, _) => {
          return (
            <Button
              key={page}
              formAction={() => handlePageClick(Number(page))}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={page === '...' || currentIndex === page}
            >
              {page}
            </Button>
          );
        })}
        <Button
          formAction={nextPage}
          variant="ghost"
          size="sm"
          type="submit"
          disabled={offset === totalProducts}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          formAction={() => handlePageClick(lastIndex)}
          variant="ghost"
          size="sm"
          type="submit"
          disabled={offset === totalProducts}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}