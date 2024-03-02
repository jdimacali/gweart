import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

const NavUtil = () => {
  const cart = useCart();
  const router = useRouter();
  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full border-white border bg-black py-2 px-4"
      >
        <ShoppingCartIcon size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};
export default NavUtil;
