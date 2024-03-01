import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationBarProps {
  metadata: {
    page: number;
    pageCount: number;
  };
  nextUrl: string;
  prevUrl: string;
  categoryId?: string | null;
}
const PaginationBar = ({
  metadata,
  prevUrl,
  nextUrl,
  categoryId,
}: PaginationBarProps) => {
  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          {metadata.page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={prevUrl} />
            </PaginationItem>
          )}
          {metadata.page > 1 && (
            <PaginationItem>
              <PaginationLink
                href={`/shop/search?page=${metadata.page - 1}&${
                  categoryId && `categoryId=${categoryId}`
                }`}
              >
                {metadata.page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem className="border rounded-xl">
            <PaginationLink>{metadata.page}</PaginationLink>
          </PaginationItem>
          {metadata.page < metadata.pageCount && (
            <PaginationItem>
              <PaginationLink
                href={`/shop/search?page=${metadata.page + 1}&${
                  categoryId && `categoryId=${categoryId}`
                }`}
              >
                {metadata.page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {metadata.page < metadata.pageCount && (
            <PaginationItem>
              <PaginationNext href={nextUrl} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default PaginationBar;
