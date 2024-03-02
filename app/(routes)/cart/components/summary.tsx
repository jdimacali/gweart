"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      // toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      // toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * Number(item.product.price);
  }, 0);

  // const onCheckout = async () => {
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
  //     {
  //       productIds: items.map((item) => item.product.id),
  //     }
  //   );

  //   window.location = response.data.url;
  // };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
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
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
