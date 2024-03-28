"use client";

import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Stripe } from "@stripe/stripe-js";

interface CheckoutSummaryProps {
  amount: number;
  shippingCost: {
    standard: number;
    express: number;
  };
  selectedShipping: "standard" | "express";
  stripe: Stripe | null;
  cartAmount: number;
  tax: number;
}

const CheckoutSummary = ({
  amount,
  shippingCost,
  selectedShipping,
  stripe,
  cartAmount,
  tax,
}: CheckoutSummaryProps) => {
  const items = useCart((state) => state.items);

  return (
    <div className=" rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 sticky top-32">
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
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm font-[600] text-gray-900">Subtotal</div>
            {formatPrice(cartAmount)}
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex text-neutral-500">Shipping</div>
            <div className="flex gap-x-3">
              <>
                {shippingCost.standard > 0 ? (
                  <div>
                    {formatPrice(
                      selectedShipping === "standard"
                        ? shippingCost.standard
                        : shippingCost.express
                    )}
                  </div>
                ) : (
                  "--"
                )}

                <div className="text-neutral-500">{selectedShipping}</div>
              </>
            </div>
          </div>
          <div className="flex items-center justify-between border-gray-200">
            <div className="text-neutral-500">Tax</div>
            {formatPrice(tax)}
          </div>
        </div>

        <div className="flex justify-between"></div>
      </div>
      <div className="mt-2 border-t border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-gray-200 pt-4">
          <div className="text-base font-[600] text-gray-900">Total due</div>
          {formatPrice(amount)}
        </div>
      </div>
      <Button
        disabled={items.length === 0 || !stripe}
        className="w-full mt-6 bg-blue-500 text-white hover:bg-blue-600 hover:opacity-[85%] transition"
        type="submit"
      >
        Pay
      </Button>
    </div>
  );
};

export default CheckoutSummary;
