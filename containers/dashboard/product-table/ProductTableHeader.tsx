import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProductTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="hidden sm:table-cell">
          <span className="sr-only">Image</span>
        </TableHead>
        <TableHead>Name/Description</TableHead>
        <TableHead>Type</TableHead>
        <TableHead className="hidden md:table-cell">Status</TableHead>
        <TableHead className="hidden md:table-cell">Rating</TableHead>
        <TableHead className="hidden md:table-cell">Price</TableHead>
        <TableHead className="hidden md:table-cell">Quantity</TableHead>
        <TableHead className="hidden md:table-cell">Created at</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}