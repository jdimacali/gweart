import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { toast } from "./ui/use-toast";
import { X } from "lucide-react";
import clsx from "clsx";
import { CartItemProduct } from "@/types";

interface CartItemInfoProps {
  product: CartItemProduct;
  quantity: number;
}

const CartItemInfo = ({ product, quantity }: CartItemInfoProps) => {
  const cart = useCart();
  const data = { product, quantity };

  const addQuantity = () => {
    cart.addItemQuantity({ ...data });
  };
  const subtractQuantity = () => {
    cart.removeItemQuantity({ ...data });
  };

  const onRemove: MouseEventHandler<HTMLButtonElement> = () => {
    cart.removeItem(product.id);

    toast({
      title: "Item removed from cart",
      description: product.name,
    });
  };

  return (
    <div className="bg-black p-4 flex" key={product.id}>
      <div className="relative h-12 w-12 rounded-md">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={product.image}
          alt={product.name}
          className="object-cover object-center"
        />
      </div>

      <div className="text-sm flex justify-between h-24 w-full pl-4">
        <div className="flex flex-col justify-between">
          {" "}
          <div className="font-semibold place-self-start">{product.name}</div>
          <div className="place-self-start text-neutral-300">
            {product.categories.data[0].attributes.name}
          </div>
          <div className="flex justify-between gap-x-4 items-center place-content-end">
            <button
              className={clsx(
                " bg-gray-100/20 w-8 h-8 flex items-center justify-center hover:bg-gray-100/40 transition-colors",
                data.quantity <= 1 && "cursor-not-allowed opacity-50"
              )}
              onClick={subtractQuantity}
              disabled={data.quantity <= 1}
            >
              <span className="text-2xl opacity-80">-</span>
            </button>
            <div>{data.quantity}</div>

            <button
              className=" bg-gray-100/20 w-8 h-8 flex items-center justify-center hover:bg-gray-100/40 transition-colors"
              onClick={addQuantity}
            >
              <span className="text-2xl opacity-80">+</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>{formatPrice(product.price)}</div>
          <button
            onClick={onRemove}
            className="hover:opacity-70 place-content-end flex items-center justify-end"
          >
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartItemInfo;
