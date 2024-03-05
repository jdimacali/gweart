import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { toast } from "./ui/use-toast";
import { X } from "lucide-react";

interface CartItemInfoProps {
  product: { image: string; name: string; id: string; price: number };
  quantity: number;
}

const CartItemInfo = ({ product, quantity }: CartItemInfoProps) => {
  const cart = useCart();

  const onRemove: MouseEventHandler<HTMLButtonElement> = () => {
    cart.removeItem(product.id);

    toast({
      title: "Item removed from cart",
      description: product.name,
    });
  };
  return (
    <div className="bg-white p-4 flex justify-between" key={product.id}>
      <div className="relative h-20 w-20 rounded-md">
        <Image
          fill
          src={product.image}
          alt={product.name}
          className="object-cover object-center"
        />
      </div>

      <div className="text-sm flex flex-col justify-evenly">
        <div className="font-semibold">{product.name}</div>
        <div className="text-neutral-500">x{quantity}</div>
        <div>{formatPrice(product.price)}</div>
      </div>
      <button onClick={onRemove} className="hover:opacity-70">
        <X />
      </button>
    </div>
  );
};
export default CartItemInfo;
