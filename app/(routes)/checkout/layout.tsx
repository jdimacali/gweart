"use client";

import { Elements } from "@stripe/react-stripe-js";

import { loadStripe, StripeAddressElementChangeEvent } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_live_51OqS0fJ3V5zq7YYD0jL4wa93pg2HiBy9p28mZhPiAaku1W13e7tqVN88v0N3r60i158CyNss2q1SjT88m8umxT3g00g9kA1XU2"
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        // amount is in cents; hence the 00
        amount: 100,
        currency: "usd",
        appearance: {
          theme: "flat",
        },
      }}
    >
      {children}
    </Elements>
  );
};
export default Layout;
