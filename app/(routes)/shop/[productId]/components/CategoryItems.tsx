"use client";

import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemsProps {
  categoryId: number;
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

const CategoryItems = ({ categoryId }: CategoryItemsProps) => {
  const [products, setProducts] = useState<Products[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductsCategories = async () => {
      try {
        setLoading(true);
        const productResponse = await axios.get("/api/products", {
          params: {
            categoryId: categoryId,
          },
        });
        setProducts(productResponse.data.response);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    getProductsCategories();
  }, [categoryId]);

  return (
    <Carousel className="w-full mx-12">
      <CarouselContent>
        {products?.map((product) => (
          <CarouselItem key={product.id} className="basis-1/3">
            <Link href={`/shop/${product.id}`}>
              <Image
                src={product.attributes.image.data[0].attributes.url}
                alt={product.attributes.name}
                width={300}
                height={300}
                className="object-cover aspect-square"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default CategoryItems;
