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
  const categoryId = useSearchParams().get("categoryId");

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
    <div className="md:block hidden md:mr-20 lg:mr-40">
      <div className="border-b text-lg">Browse by category</div>
      <button
        onClick={onClick}
        className={clsx("text-left", !categoryId ? "font-bold" : "font-normal")}
      >
        All Items
      </button>
      {categories && <Categories categories={categories} />}
      <CategoriesMobileSidebar categories={categories} />
    </div>
  );
};
export default SearchParams;
