"use client";

import { Parcel } from "@/types";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  categories: {
    id: number;
    attributes: {
      name: string;
      parcel: Parcel;
    };
  }[];
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <div className="flex flex-col">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          name={category.attributes.name}
          id={category.id}
        />
      ))}
    </div>
  );
};

export default Categories;
