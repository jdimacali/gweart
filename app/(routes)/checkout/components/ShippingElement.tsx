import { formatCents, formatPrice } from "@/lib/utils";
import { useElements } from "@stripe/react-stripe-js";
import { Dispatch, SetStateAction } from "react";
interface ShippingElementProps {
  selectedShipping: string;
  handleShippingChange: (value: "standard" | "express") => void;
  shippingCost: {
    standard: number;
    express: number;
  };
  setAmount: Dispatch<SetStateAction<number>>;
  cartAmount: number;
  tax: number;
}
const ShippingElement = ({
  handleShippingChange,
  selectedShipping,
  shippingCost,
  setAmount,
  cartAmount,
  tax,
}: ShippingElementProps) => {
  const elements = useElements();
  return (
    <fieldset className="flex flex-col my-4 ">
      <h2 className="mb-2 text-sm text-neutral-700">Shipping Method</h2>
      <div className="border border-neutral-100 p-2 flex flex-col rounded bg-yellow-100/10">
        <div className="flex justify-between border-b border-neutral-200 pb-2 pt-1">
          <div className="flex gap-x-2">
            <input
              type="radio"
              name="shipping"
              value="standard"
              checked={selectedShipping === "standard"}
              onChange={() => {
                handleShippingChange("standard");
                setAmount(cartAmount + tax + Number(shippingCost.standard));
                elements?.update({
                  amount: formatCents(
                    cartAmount + tax + Number(shippingCost.express)
                  ),
                  currency: "usd",
                });
              }}
            />

            <div>
              <label className="flex gap-x-2 justify-items text-sm ">
                Standard Shipping
              </label>
              <div className="text-xs text-neutral-500">
                {" "}
                3 - 5 business days{" "}
              </div>
            </div>
          </div>
          {/* calculate with easypost api using address and total weight and box type */}
          <div className="text-sm place-self-center">
            {shippingCost.standard > 0
              ? formatPrice(shippingCost.standard)
              : "--"}
          </div>
        </div>
        <div className="flex justify-between pb-1 pt-2">
          <div className="flex gap-x-2">
            <input
              type="radio"
              name="shipping"
              value="express"
              onChange={() => {
                handleShippingChange("express");
                setAmount(cartAmount + tax + Number(shippingCost.express));
                elements?.update({
                  amount: formatCents(
                    cartAmount + tax + Number(shippingCost.express)
                  ),
                  currency: "usd",
                });
              }}
            />

            <div>
              <label className="flex gap-x-2 justify-items text-sm">
                Express Shipping
              </label>
              <div className="text-xs text-neutral-500">
                {" "}
                1 - 3 business days{" "}
              </div>
            </div>
          </div>
          <div className="text-sm place-self-center">
            {" "}
            {shippingCost.express > 0
              ? formatPrice(shippingCost.express)
              : "--"}
          </div>
        </div>
      </div>
    </fieldset>
  );
};
export default ShippingElement;
