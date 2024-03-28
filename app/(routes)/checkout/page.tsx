"use client";

import { useCallback, useState } from "react";
import CheckoutForm from "./components/CheckoutForm";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useElements } from "@stripe/react-stripe-js";
import { formatCents } from "@/lib/utils";

const Checkout = () => {
  const elements = useElements();
  // Amount is in cents
  const cart = useCart();
  const items = cart.items;
  const router = useRouter();

  const cartAmount: number = items.reduce((total, item) => {
    return total + item.quantity * Number(item.product.price);
  }, 0);

  const [amount, setAmount] = useState(cartAmount);
  const [tax, setTax] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState<
    "standard" | "express"
  >("standard");

  const handleShippingChangeState = (value: "standard" | "express") => {
    setSelectedShipping(value);
  };

  const [shippingCost, setShippingCost] = useState({
    standard: 0,
    express: 0,
  });

  // Pass this to the checkout form to handle the calculations for easypost
  const handleShipping = useCallback(
    async (code: any) => {
      if (!elements) {
        return;
      }

      const payload = {
        values: code.value,
        parcel: items,
        selectedShipping: selectedShipping,
      };

      const response = await axios.post("/api/rates", payload);

      // !IMPORTANT: get the shipping type for express and standard; then display them to the user to choose from
      setShippingCost({
        standard: response.data.standard.rate,
        express: response.data.express.rate,
      });

      // Get the lowest shipping label rate according to which shipping type the user chooses
      const selectedShippingCost =
        selectedShipping == "standard"
          ? response.data.standard.rate
          : response.data.express.rate;

      // Trigger a state change that re-renders the Elements provider with the new amount
      const newAmount =
        Number(cartAmount) +
        Number(selectedShippingCost) +
        Number(response.data.tax);

      elements?.update({
        amount: formatCents(newAmount),
        currency: "usd",
      });
      setTax(response.data.tax);
      setAmount(newAmount);
    },
    [cartAmount, items, selectedShipping, elements]
  );

  if (items.length === 0) {
    router.push("/cart");
  }

  return (
    <CheckoutForm
      cartAmount={cartAmount}
      amount={amount}
      handleShipping={handleShipping}
      shippingCost={shippingCost}
      handleShippingChangeState={handleShippingChangeState}
      selectedShipping={selectedShipping}
      setAmount={setAmount}
      tax={tax}
    />
  );
};

export default Checkout;
