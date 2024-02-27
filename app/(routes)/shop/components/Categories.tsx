"use client";

import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  categories: {
    id: number;
    attributes: {
      name: string;
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
