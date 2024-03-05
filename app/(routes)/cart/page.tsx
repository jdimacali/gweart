"use client";

import { useEffect, useState } from "react";
import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import HelpfulInformation from "../../../components/HelpfulInformation";
import useCart from "@/hooks/use-cart";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BackToShop from "@/components/BackToShop";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <BackToShop title="Continue Shopping" />
        <div className="text-center text-3xl font-bold text-neutral-800 mb-10">
          Art by G.W.E.
        </div>
        <h1 className="text-3xl font-semibold text-black">Shopping Cart</h1>
        <div className="my-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {cart.items.length === 0 && (
              <p className="text-neutral-500">No items added to cart.</p>
            )}
            <ul>
              {cart.items.map((item) => (
                <CartItem key={item.product.id} data={item} />
              ))}
            </ul>
          </div>
          <Summary />
        </div>
        <HelpfulInformation />
      </div>
    </div>
  );
};

export default CartPage;
