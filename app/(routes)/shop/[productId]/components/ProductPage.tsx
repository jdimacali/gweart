"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { formatPrice } from "@/lib/format";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import CategoryItems from "./CategoryItems";
import HelpfulInformation from "../../../../../components/HelpfulInformation";
import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface ProductProps {
  id: number;
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
          point: [
            {
              id: number;
              point: string;
            }
          ];
        };
      }
    ];
  };
}

const ProductPage = ({
  id,
  name,
  price,
  description,
  availability,
  image,
  categories,
}: ProductProps) => {
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => setQuantity((prev) => (prev += 1));
  const subtractQuantity = () => setQuantity((prev) => (prev -= 1));

  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem({
      product: {
        id: String(id),
        name,
        price,
        image: image.data[0].attributes.url,
        categories,
      },
      quantity: quantity,
    });
    toast({
      title: "Item added to cart!",
      description: `${quantity} ${name}`,
    });
  };

  const stringId = String(categories.data[0].id);
  return (
    <>
      <div className="flex md:flex-row flex-col gap-y-2 md:gap-x-20 lg:gap-x-20 xl:gap-x-40 w-full justify-center lg:items-start">
        <div className="flex flex-col gap-y-4 mb-4 h-auto w-auto items-center">
          <div className="flex relative w-full md:w-72 xl:w-96 h-72 lg:h-96">
            <Image
              src={image.data[0].attributes.url}
              alt={name}
              fill
              quality={100}
              className="object-cover aspect-square shadow-2xl"
              priority
            />
          </div>
          <div className="flex items-center justify-center w-[80%] md:w-full h-32">
            <CategoryItems categoryId={stringId} />
          </div>
        </div>

        <div className="flex flex-col gap-4 h-full w-auto">
          <div>
            <div className="text-2xl md:text-3xl font-bold">{name}</div>
            <div className="text-md opacity-80 italic">
              {categories.data[0].attributes.name}
            </div>
          </div>
          <div className="text-xl">{formatPrice(price)}</div>
          {categories.data[0].attributes.point.length > 0 && (
            <div>
              <div className="font-bold mb-1">About this item</div>
              <div className="flex flex-col gap-y-1">
                {categories.data[0].attributes.point.map((point) => (
                  <li key={point.id}> {point.point} </li>
                ))}
              </div>
            </div>
          )}
          <div className=" md:text-md lg:text-lg text-gray-600 my-4">
            {description}
          </div>
          <div className="flex flex-col mb-4">
            <div className="opacity-70 mb-3">Quantity</div>
            <div className="flex gap-x-4 items-center">
              <Button
                className={clsx(
                  " bg-amber-100/30 w-10 h-10 flex items-center justify-center hover:bg-amber-100 transition-colors",
                  quantity <= 1 && "cursor-not-allowed opacity-50"
                )}
                onClick={subtractQuantity}
                disabled={quantity <= 1}
                type="button"
              >
                <span className="text-2xl opacity-80">
                  <Minus size={20} />
                </span>
              </Button>
              <div>{quantity}</div>

              <Button
                className=" bg-amber-100/30 w-10 h-10 flex items-center justify-center hover:bg-amber-100 transition-colors"
                onClick={addQuantity}
                type="button"
              >
                <span className="text-2xl opacity-80">
                  <Plus size={20} />
                </span>
              </Button>
            </div>
          </div>
          <Button
            className={clsx(
              "border bg-black hover:bg-neutral-800 transition-colors h-14 text-white",
              !availability && "bg-gray-100"
            )}
            onClick={onAddToCart}
            disabled={!availability}
            type="button"
          >
            {availability ? (
              <div className="flex items-center justify-center gap-x-2 scale-110 transition">
                Add to Cart <ShoppingCartIcon size={15} />
              </div>
            ) : (
              <p className="opacity-80">Out of Stock</p>
            )}
          </Button>
        </div>
      </div>
      <HelpfulInformation />
    </>
  );
};
export default ProductPage;
