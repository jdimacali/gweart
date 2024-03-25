"use client";

import { useEffect, useState } from "react";
import ProductPage from "./components/ProductPage";
import BackToShop from "@/components/BackToShop";
import { useParams } from "next/navigation";
import BouncingCircles from "@/components/BouncingCircles";
import getProduct from "@/actions/getProduct";
import { Product } from "@/types";

const Page = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        setLoading(true);
        const product = await getProduct(String(params.productId));
        setProduct(product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProductInfo();
  }, [params.productId]);

  console.log(product);

  return (
    <section className="h-full w-full text-black bg-white items-center justify-center md:px-10 xl:px-20 2xl:px-40 3xl:px-80">
      {loading && (
        <div className="flex w-full h-[70vh] items-center justify-center">
          <BouncingCircles />
        </div>
      )}
      {!loading && (
        <>
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
        </>
      )}
    </section>
  );
};

export default Page;
