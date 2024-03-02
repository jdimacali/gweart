"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import ProductPage from "./components/ProductPage";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0;

interface Product {
  id: number;
  attributes: {
    name: string;
    price: number;
    description: string;
    availability: boolean;
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

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | undefined>();
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    const getProductsCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/products/${productId}`, {
          params: {
            productId,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    getProductsCategories();
  }, [productId]);

  return (
    <section className="h-full w-full text-black bg-white items-center justify-center md:px-10 xl:px-80 px-10">
      <Link
        href="/shop/search"
        className="flex gap-x-2 mb-8 md:mb-10 text-gray-500 hover:text-black group h-10 w-40"
      >
        <ArrowLeft className="group-hover:translate-x-[-5px] transition ease-in-out" />
        Back to shop
      </Link>
      <div className="w-full h-full">
        {product && (
          <ProductPage
            id={product.id}
            name={product.attributes.name}
            price={product.attributes.price}
            description={product.attributes.description}
            image={product.attributes.image}
            availability={product.attributes.availability}
            categories={product.attributes.categories}
          />
        )}
      </div>
    </section>
  );
};

export default Page;
