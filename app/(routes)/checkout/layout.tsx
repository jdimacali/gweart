"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51OqS0fJ3V5zq7YYDevgvkQhKsUpfoPUsaGuQX5Qfs3yc2oeW4LMccO1OpcXPODebZdpZooecW9ZkWJ5koDhBXplR00mRHcOom5"
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
