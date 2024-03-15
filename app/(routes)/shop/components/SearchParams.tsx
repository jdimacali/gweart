"use client";

import clsx from "clsx";
import Categories from "./Categories";
import CategoriesMobileSidebar from "./CategoriesMobileSidebar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Category } from "@/types";

interface searchParamProps {
  categories: Category[];
}

const SearchParams = ({ categories }: searchParamProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: null,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <>
      <div className="md:block hidden mr-10 lg:mr-20 xl:mr-40 mt-16">
        <div className="underline decoration-2 underline-offset-8 mb-2 t tracking-tight whitespace-nowrap">
          Browse by category
        </div>
        <button
          onClick={onClick}
          className={clsx(
            "text-left tracking-tight",
            !categoryId ? "font-semibold" : "font-medium"
          )}
        >
          All Items
        </button>
        {categories && <Categories categories={categories} />}
      </div>
      <CategoriesMobileSidebar categories={categories} />
    </>
  );
};
export default SearchParams;
