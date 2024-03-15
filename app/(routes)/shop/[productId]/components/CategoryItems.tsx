import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import getProducts from "@/actions/getProducts";
import { Product } from "@/types";

interface CategoryItemsProps {
  categoryId: string;
}

const CategoryItems = async ({ categoryId }: CategoryItemsProps) => {
  const products = await getProducts({ categoryId });
  return (
    <Carousel className="w-full md:mx-12">
      <CarouselContent>
        {products.response?.map((product: Product) => (
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
