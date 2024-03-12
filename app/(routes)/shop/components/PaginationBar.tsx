import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Metadata } from "@/types";

interface PaginationBarProps {
  metadata: Metadata;
  nextUrl: string;
  prevUrl: string;
  categoryId?: string | null;
  name?: string | null;
}
const PaginationBar = ({
  metadata,
  prevUrl,
  nextUrl,
  categoryId,
  name,
}: PaginationBarProps) => {
  return (
    <div className="mt-4">
      <Pagination>
        <PaginationContent>
          {metadata.pagination.page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={prevUrl} />
            </PaginationItem>
          )}
          {metadata.pagination.page > 1 && (
            <>
              {metadata.pagination.page > 2 && (
                <PaginationItem>
                  <PaginationLink
                    href={`/shop/search?page=${metadata.pagination.page - 2}&${
                      categoryId && `categoryId=${categoryId}`
                    }&${name && `name=${name}`}`}
                  >
                    {metadata.pagination.page - 2}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  href={`/shop/search?page=${metadata.pagination.page - 1}&${
                    categoryId && `categoryId=${categoryId}`
                  }&${name && `name=${name}`}`}
                >
                  {metadata.pagination.page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem className="border rounded-xl">
            <PaginationLink>{metadata.pagination.page}</PaginationLink>
          </PaginationItem>
          {metadata.pagination.page < metadata.pagination.pageCount && (
            <PaginationItem>
              <PaginationLink
                href={`/shop/search?page=${metadata.pagination.page + 1}&${
                  categoryId && `categoryId=${categoryId}`
                }&${name && `name=${name}`}`}
              >
                {metadata.pagination.page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {metadata.pagination.page + 1 < metadata.pagination.pageCount && (
            <PaginationItem>
              <PaginationLink
                href={`/shop/search?page=${metadata.pagination.page + 2}&${
                  categoryId && `categoryId=${categoryId}`
                }&${name && `name=${name}`}`}
              >
                {metadata.pagination.page + 2}
              </PaginationLink>
            </PaginationItem>
          )}

          {metadata.pagination.page < metadata.pagination.pageCount && (
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
