"use client";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import HelpfulInformation from "../../../components/HelpfulInformation";
import useCart from "@/hooks/use-cart";
import BackToShop from "@/components/BackToShop";
import { Suspense } from "react";

const CartPage = () => {
  const cart = useCart();

  return (
    <div className="bg-white">
      <Suspense>
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
      </Suspense>
    </div>
  );
};

export default CartPage;
