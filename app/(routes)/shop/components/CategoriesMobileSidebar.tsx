"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import CategoryItem from "./CategoryItem";
import queryString from "query-string";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { Parcel } from "@/types";

interface Categories {
  categories?: {
    id: number;
    attributes: {
      name: string;
      parcel: Parcel;
    };
  }[];
}

const CategoriesMobileSidebar = ({ categories }: Categories) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const onClick = () => {
    const url = queryString.stringifyUrl(
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
    <div className="md:hidden block mb-10">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="pt-2 border w-full text-center pb-2 bg-amber-400/10">
          Categories
        </SheetTrigger>
        <SheetContent className="p-0" side={"top"}>
          <section className="flex flex-col text-center items-center gap-y-5 pt-12 bg-white gap-x-10 font-medium h-full w-full m-0">
            <div className=" w-full">
              <button
                onClick={onClick}
                className={clsx(
                  "text-left tracking-tight",
                  !categoryId ? "font-semibold" : "font-medium"
                )}
              >
                All Items
              </button>
              <div className="h-[1px] bg-gray-950 opacity-20 w-full mt-4" />
            </div>
            {categories?.map((category) => (
              <div
                className="w-full text-center"
                key={category.id}
                onClick={() => setOpen(false)}
              >
                <CategoryItem
                  name={category.attributes.name}
                  id={category.id}
                />
                <div className="h-[1px] bg-gray-950 opacity-20 w-full mt-4" />
              </div>
            ))}
          </section>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default CategoriesMobileSidebar;
