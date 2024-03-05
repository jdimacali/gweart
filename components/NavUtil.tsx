import { ShoppingCartIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { toast } from "./ui/use-toast";
import { MouseEventHandler } from "react";
import CartItemInfo from "./CartItemInfo";

const NavUtil = () => {
  const cart = useCart();
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <HoverCard openDelay={100}>
        <HoverCardTrigger>
          {" "}
          <Button
            onClick={() => router.push("/cart")}
            className="flex items-center rounded-full border-white border bg-black py-2 px-4"
          >
            <ShoppingCartIcon size={20} color="white" />
            <span className="ml-2 text-sm font-medium text-white">
              {cart.items.length}
            </span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent
          sideOffset={30}
          className="bg-white overflow-y-auto h-96 w-80 text-black"
        >
          <h1 className="text-xl font-bold py-5 pl-4 text-left border-b">
            {" "}
            Your Cart{" "}
          </h1>
          <div className="flex flex-col bg-white ">
            {cart.items.length > 0 &&
              cart.items.map((item) => (
                <CartItemInfo
                  product={item.product}
                  quantity={item.quantity}
                  key={item.product.id}
                />
              ))}
            {cart.items.length == 0 && (
              <h1 className="text-md text-neutral-700 py-5 pl-4 text-left">
                You have no items in your cart
              </h1>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
export default NavUtil;
