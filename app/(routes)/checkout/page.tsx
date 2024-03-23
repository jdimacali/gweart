"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./components/CheckoutForm";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_live_51OqS0fJ3V5zq7YYD0jL4wa93pg2HiBy9p28mZhPiAaku1W13e7tqVN88v0N3r60i158CyNss2q1SjT88m8umxT3g00g9kA1XU2"
);

const Checkout = () => {
  const cart = useCart();
  const items = cart.items;
  const router = useRouter();

  if (items.length === 0) {
    return router.push("/cart");
  }

  const amount = items.reduce((total, item) => {
    return total + item.quantity * Number(item.product.price);
  }, 0);

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        // amount is in cents
        amount: Number(`${amount}00`),
        currency: "usd",
        appearance: {
          theme: "flat",
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
