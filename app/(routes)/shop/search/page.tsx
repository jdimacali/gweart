"use client";

import { useEffect, useState } from "react";
import CategoriesMobileSidebar from "../components/CategoriesMobileSidebar";
import axios from "axios";
import Products from "../components/Products";
import Categories from "../components/Categories";
import clsx from "clsx";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Categories {
  id: number;
  attributes: {
    name: string;
  };
}

interface Products {
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
}

export const revalidate = 0;

const Page = () => {
  const [categories, setCategories] = useState<Categories[] | undefined>([]);
  const [products, setProducts] = useState<Products[] | undefined>([]);
  const [metadata, setMetadata] = useState({} as any);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentCategoryId = searchParams.get("categoryId");
  const currentName = searchParams.get("name");
  const currentPage = searchParams.get("page");

  useEffect(() => {
    const getProductsCategories = async () => {
      try {
        setLoading(true);
        const categoryResponse = await axios.get("/api/categories");
        const productResponse = await axios.get("/api/products", {
          params: {
            categoryId: currentCategoryId,
            name: currentName,
            page: currentPage,
          },
        });
        setCategories(categoryResponse.data);
        setProducts(productResponse.data.response);
        setMetadata(productResponse.data.metadata);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    getProductsCategories();
  }, [currentCategoryId, currentName, currentPage]);

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          name: currentName,
          categoryId: null,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col md:flex-row md:pl-20 xl:px-40">
        <div className="md:block hidden md:mr-20 lg:mr-40">
          <div className="border-b text-lg">Browse by category</div>
          <button
            onClick={onClick}
            className={clsx(
              "text-left",
              !currentCategoryId ? "font-bold" : "font-normal"
            )}
          >
            All Items
          </button>
          {categories && <Categories categories={categories} />}
        </div>
        <CategoriesMobileSidebar categories={categories} />
        {products && (
          <Products products={products} loading={loading} metadata={metadata} />
        )}
      </div>
    </div>
  );
};

export default Page;
