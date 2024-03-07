"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const stripePromise = loadStripe(
    "pk_live_51OqS0fJ3V5zq7YYD0jL4wa93pg2HiBy9p28mZhPiAaku1W13e7tqVN88v0N3r60i158CyNss2q1SjT88m8umxT3g00g9kA1XU2"
  );

  useEffect(() => {
    if (searchParams.get("success")) {
      toast({
        title: "Payment completed",
        description: "Your order is being processed",
      });
      // make stripe webhook post request to fulfill the order
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast({
        title: "Checkout was not completed",
      });
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * Number(item.product.price);
  }, 0);

  const onCheckout = async () => {
    try {
      const res = await axios.post(`/api/orders`, {
        items,
      });

      window.location = res.data.stripeSession.url;
    } catch (error) {
      console.error("Error during checkout", error);
      toast({
        title: "Error during checkout",
      });
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sticky top-32">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Order summary
      </h2>
      <div className="flex flex-col gap-y-2">
        {items.map((item) => (
          <div key={item.product.id} className="flex justify-between">
            <div>{item.product.name}</div>
            <div className="flex gap-x-3">
              <div>{formatPrice(item.product.price)}</div>
              <div className="text-neutral-500">x{item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          {formatPrice(totalPrice)}
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        className="w-full mt-6 bg-black text-white hover:bg-black hover:opacity-[85%] transition"
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
