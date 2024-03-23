"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { API_URL } from "@/lib/utils";
import { TruckIcon } from "lucide-react";

const CheckoutSummary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

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
      const res = await axios.post(`${API_URL}/api/orders`, items);
      window.location = res.data.stripeSession.url;
    } catch (error) {
      console.error("Error during checkout", error);
      toast({
        title: "Error during checkout",
      });
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 sticky top-32">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Order summary
      </h2>
      <div className="flex flex-col gap-y-2">
        <div className="border-b border-gray-200 pb-4">
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

        <div className="flex justify-between">
          <div className="flex gap-x-2">
            Shipping <TruckIcon className="opacity-60" />
          </div>
          <div className="flex gap-x-3">
            <div>{formatPrice(1)}</div>
            <div className="text-neutral-500">Standard</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Tax</div>
          <div className="flex gap-x-3">
            <div>{formatPrice(1)}</div>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-[600] text-gray-900">Order total</div>
          {formatPrice(totalPrice)}
        </div>
      </div>
      <Button
        disabled={items.length === 0}
        className="w-full mt-6 bg-black text-white hover:bg-black hover:opacity-[85%] transition"
        type="submit"
      >
        Checkout
      </Button>
    </div>
  );
};

export default CheckoutSummary;
