"use client";

import { useCallback, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import easyPost from "@easypost/api";

import CheckoutForm from "./components/CheckoutForm";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_live_51OqS0fJ3V5zq7YYD0jL4wa93pg2HiBy9p28mZhPiAaku1W13e7tqVN88v0N3r60i158CyNss2q1SjT88m8umxT3g00g9kA1XU2"
);

const Checkout = () => {
  // Amount is in cents
  const cart = useCart();
  const items = cart.items;
  const router = useRouter();

  const cartAmount = items.reduce((total, item) => {
    return total + item.quantity * Number(item.product.price);
  }, 0);

  const [amount, setAmount] = useState(cartAmount);

  const [shippingCost, setShippingCost] = useState({
    standard: 0,
    express: 0,
  });

  // Pass this to the checkout form to handle the calculations for easypost
  const handleShipping = useCallback(
    async (code: any) => {
      // const api = new easyPost(process.env.NEXT_PUBLIC_EASYPOST_TEST!);
      // // Create shipping lable using EasyPost API: fill in user details from the form and parcel data from cart
      // const shipment = await api.Shipment.create({
      // // Get Karens address and set it to the from address
      //   from_address: {
      //     street1: "417 MONTGOMERY ST",
      //     street2: "FLOOR 5",
      //     city: "SAN FRANCISCO",
      //     state: "CA",
      //     zip: "94104",
      //     country: "US",
      //     company: "EasyPost",
      //     phone: "415-123-4567",
      //   },
      //   to_address: {
      //     name: "Dr. Steve Brule",
      //     street1: "179 N Harbor Dr",
      //     city: "Redondo Beach",
      //     state: "CA",
      //     zip: "90277",
      //     country: "US",
      //     phone: "4155559999",
      //   },
      // // Pass the parcel information from the cart
      //   parcel: {
      //     length: 5,
      //     width: 6,
      //     height: 7,
      //     weight: 8,
      //   },
      // });

      // !IMPORTANT: get the shipping type for express and standard; then display them to the user to choose from
      setShippingCost({
        standard: 5,
        express: 10,
      });

      // Get the lowest shipping label rate according to which shipping type the user chooses
      const shippingCost = 10;

      // Trigger a state change that re-renders the Elements provider with the new amount
      const newAmount = cartAmount + shippingCost;
      setAmount(newAmount);
    },
    [cartAmount]
  );

  if (items.length === 0) {
    return router.push("/cart");
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        // amount is in cents; hence the 00
        amount: Number(`${amount}00`),
        currency: "usd",
        appearance: {
          theme: "flat",
        },
      }}
    >
      <CheckoutForm
        amount={amount}
        handleShipping={handleShipping}
        shippingCost={shippingCost}
      />
    </Elements>
  );
};

export default Checkout;
