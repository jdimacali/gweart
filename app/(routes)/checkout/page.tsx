"use client";

import { useCallback, useEffect, useState } from "react";
import CheckoutForm from "./components/CheckoutForm";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useElements } from "@stripe/react-stripe-js";
import { formatCents } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const elements = useElements();
  const cart = useCart();
  const router = useRouter();
  const items = cart.items;
  const cartAmount: number = items.reduce((total, item) => {
    return total + item.quantity * Number(item.product.price);
  }, 0);

  const [amount, setAmount] = useState(cartAmount);
  const [tax, setTax] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState<
    "standard" | "express"
  >("standard");
  const [shippingLoading, setShippingLoading] = useState(false);

  const handleShippingChangeState = (value: "standard" | "express") => {
    setSelectedShipping(value);
  };

  const [shippingInfo, setShippingInfo] = useState({
    id: "",
    standard: 0,
    express: 0,
  });

  useEffect(() => {
    if (items.length === 0) {
      return router.push("/cart");
    }
  }, [items, router]);

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

      try {
        setShippingLoading(true);
        const response = await axios.post("/api/rates", payload);

        setShippingInfo({
          id: response.data.id,
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
      } catch (error) {
        console.error("Error during checkout", error);
      } finally {
        setShippingLoading(false);
      }
    },
    [cartAmount, items, selectedShipping, elements]
  );

  return (
    <CheckoutForm
      cartAmount={cartAmount}
      amount={amount}
      handleShipping={handleShipping}
      shippingInfo={shippingInfo}
      handleShippingChangeState={handleShippingChangeState}
      selectedShipping={selectedShipping}
      setAmount={setAmount}
      tax={tax}
      shippingLoading={shippingLoading}
    />
  );
};

export default Checkout;
