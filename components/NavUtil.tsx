import { ShoppingCartIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatPrice } from "@/lib/format";
import CartItemInfo from "./CartItemInfo";

const NavUtil = () => {
  const cart = useCart();
  const router = useRouter();

  const totalPrice = cart.items.reduce((total, item) => {
    return total + item.quantity * Number(item.product.price);
  }, 0);

  const handleClick = () => {
    router.push("/cart");
  };

  return (
    <div className="flex items-center justify-center">
      <HoverCard openDelay={100}>
        <HoverCardTrigger>
          {" "}
          <Button
            onClick={() => router.push("/cart")}
            className="flex items-center bg-black py-2 px-4"
          >
            <ShoppingCartIcon size={20} color="white" />
            <span className="ml-2 text-sm font-medium text-white">
              {cart.items.length}
            </span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent
          sideOffset={30}
          className="bg-black overflow-y-auto h-full w-96 border-neutral-500 text-white rounded-[0.35rem]"
        >
          <h1 className="text-xl font-bold py-5 pl-4 text-left Sst">
            {" "}
            Your Cart{" "}
          </h1>
          <div className="flex flex-col">
            {cart.items.length > 0 &&
              cart.items.map((item) => (
                <CartItemInfo
                  product={item.product}
                  quantity={item.quantity}
                  key={item.product.id}
                />
              ))}
            {cart.items.length == 0 && (
              <h1 className="text-md py-5 pl-4 text-left">
                You have no items in your cart
              </h1>
            )}
            {cart.items.length > 0 && (
              <Button
                className="text-md font-semibold h-12 p-4 hover:bg-purple-700/90 bg-[#8b46c4] text-left m-4"
                onClick={handleClick}
              >
                Continue to cart {formatPrice(totalPrice)}
              </Button>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
export default NavUtil;
