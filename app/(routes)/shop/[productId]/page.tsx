"use client";

import { useEffect, useState } from "react";
import ProductPage from "./components/ProductPage";
import BackToShop from "@/components/BackToShop";
import axios from "axios";
import { API_URL } from "@/lib/utils";
import { Product } from "@/types";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product>();

  const URL = `${API_URL}/api/products?[filters][id][$in]=${params.productId}&populate[image][fields][0]=url&populate[categories][populate]=point`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setProduct(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [URL]);

  return (
    <section className="h-full w-full text-black bg-white items-center justify-center md:px-10 xl:px-20 2xl:px-40 3xl:px-80">
      <div className="hidden md:block">
        <BackToShop title="Back to Shop" />
      </div>

      <div className="w-full h-full">
        {product && (
          <ProductPage
            id={Number(params.productId)}
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
