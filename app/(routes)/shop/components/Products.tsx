"use client";

import qs from "query-string";
import ProductCard from "./ProductCard";
import { usePathname, useSearchParams } from "next/navigation";
import PaginationBar from "./PaginationBar";
import { Metadata } from "@/types";
interface Products {
  products: {
    id: number;
    attributes: {
      name: string;
      price: number;
      description: string;
      availablitiy: boolean;
      image: {
        data: [
          {
            id: number;
            attributes: {
              url: string;
            };
          }
        ];
      };
      categories: {
        data: [
          {
            id: number;
            attributes: {
              name: string;
            };
          }
        ];
      };
    };
  }[];
  metadata: Metadata;
}

const ProductList = ({ products, metadata }: Products) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const page = searchParams.get("page");
  const name = searchParams.get("name");
  const pathname = usePathname();

  const nextUrl = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        categoryId: categoryId,
        page: page ? parseInt(page) + 1 : 2,
        name: name,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );

  const prevUrl = qs.stringifyUrl(
    {
      url: pathname,
      query: {
        categoryId: categoryId,
        page: page ? parseInt(page) - 1 : 2,
        name: name,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );

  return (
    <div className="flex flex-col gap-y-10">
      <div className="text-3xl font-bold ">
        {categoryId
          ? products[0]?.attributes.categories.data[0].attributes.name
          : "All Items"}
      </div>
      {products.length === 0 && (
        <div className=" text-sm font-semibold text-neutral-600 mt-10 w-[57vw] h-full">
          No products were found
        </div>
      )}
      {products.length > 0 && (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-2 2xl:grid-cols-3 gap-16">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.attributes.image.data[0].attributes.url}
                id={product.id}
                name={product.attributes.name}
                price={product.attributes.price}
                description={product.attributes.description}
                categories={product.attributes.categories}
              />
            ))}
          </div>
          <PaginationBar
            metadata={metadata}
            nextUrl={nextUrl}
            prevUrl={prevUrl}
            categoryId={categoryId}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
