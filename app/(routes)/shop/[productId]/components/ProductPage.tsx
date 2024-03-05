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

  console.log(id);
  return (
    <>
      <div className="flex md:flex-row flex-col gap-x-40">
        <div className="flex flex-col gap-y-4 md:gap-y-10 mb-4">
          <div className="relative md:w-[25rem] xl:w-[30rem] h-[20rem] md:h-[35rem]">
            <Image
              src={image.data[0].attributes.url}
              alt={name}
              fill
              quality={100}
              className="object-cover"
            />
          </div>
          <div className="flex w-full">
            <CategoryItems categoryId={categories.data[0].id} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-bold">{name}</div>
            <div className="text-md opacity-80 italic">
              {categories.data[0].attributes.name}
            </div>
          </div>
          <div className="text-xl">{formatPrice(price)}</div>
          <div>
            <div className="font-bold mb-1">About this item</div>
            {/* TODO: Add bullet points to backend and retrieve them from the frontend */}
            <div className="flex flex-col gap-y-1">
              <li> Ultrices mi tempus </li>
              <li> Lorem ipsum dolor </li>
              <li> Dignissim enim sit amet </li>
            </div>
          </div>
          <div className="text-lg text-gray-600 my-4">{description}</div>
          <div className="flex flex-col mb-4">
            <div className="opacity-70 mb-3">Quantity</div>
            <div className="flex gap-x-4 items-center">
              <button
                className={clsx(
                  " bg-amber-100/30 w-10 h-10 flex items-center justify-center hover:bg-amber-100 transition-colors",
                  quantity <= 1 && "cursor-not-allowed opacity-50"
                )}
                onClick={subtractQuantity}
                disabled={quantity <= 1}
              >
                <span className="text-2xl opacity-80">
                  <Minus size={20} />
                </span>
              </button>
              <div>{quantity}</div>

              <button
                className=" bg-amber-100/30 w-10 h-10 flex items-center justify-center hover:bg-amber-100 transition-colors"
                onClick={addQuantity}
              >
                <span className="text-2xl opacity-80">
                  <Plus size={20} />
                </span>
              </button>
            </div>
          </div>
          <Button
            className={clsx(
              "border bg-black hover:bg-neutral-800 transition-colors h-14 text-white",
              !availability && "bg-gray-100"
            )}
            onClick={onAddToCart}
            disabled={!availability}
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
