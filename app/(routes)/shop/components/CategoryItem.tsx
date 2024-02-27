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
  const currentName = searchParams.get("name");

  const isSelected = currentCategoryId === String(id);

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          name: currentName,
          categoryId: isSelected ? null : id,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn("text-left hover:opacity-80", isSelected && "font-bold")}
      type="button"
    >
      <div className="truncate">{name}</div>
    </button>
  );
};

export default CategoryItem;
