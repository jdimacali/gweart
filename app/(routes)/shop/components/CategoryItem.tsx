"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CategoryItemProps {
  name: string;
  id?: number;
}

const CategoryItem = ({ name, id }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");

  const isSelected = currentCategoryId === String(id);

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : id,
          name: "",
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "text-left hover:opacity-80 animate-in-[opacity-10]",
        isSelected && "font-semibold"
      )}
      type="button"
    >
      <div className="tracking-tight">{name}</div>
    </button>
  );
};

export default CategoryItem;
