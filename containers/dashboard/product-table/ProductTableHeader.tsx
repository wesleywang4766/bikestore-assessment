import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProductTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="hidden sm:table-cell">
          <span className="sr-only">Image</span>
        </TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Price</TableHead>
        <TableHead className="hidden md:table-cell">Total Sales</TableHead>
        <TableHead className="hidden md:table-cell">Created at</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}