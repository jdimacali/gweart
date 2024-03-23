import { FormEvent, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import CheckoutSummary from "./CheckoutSummary";
import HelpfulInformation from "@/components/HelpfulInformation";
import ShippingElement from "./ShippingElement";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { StripeAddressElementChangeEvent } from "@stripe/stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleError = (error: any) => {
    setLoading(false);
    console.error("Error during checkout", error);
    toast({
      title: "Error during checkout",
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret
    const res = await axios.post(`${API_URL}/api/orders`);
    const { client_secret: clientSecret } = await res.data();

    // Confirm the PaymentIntent using the details collected by the Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://artbygwe.com/cart?success=true",
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      router.push("/cart?success=true");
    }
  };

  const handleAddressChange = (e: StripeAddressElementChangeEvent) => {
    console.log("Address changed");
  };

  return (
    <div className="h-full w-[full] bg-white justify-center lg:px-40 xl:px-60 2xl:px-72 py-12 px-8 pb-32">
      <div className="flex flex-col w-full ">
        <h1 className="text-3xl text-start font-bold mb-12">Checkout</h1>
        <form
          className="w-full flex flex-col md:flex-row justify-center gap-x-10"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <LinkAuthenticationElement />
            <PaymentElement options={{}} />
            <AddressElement
              onChange={handleAddressChange}
              options={{
                mode: "shipping",
                allowedCountries: ["US"],
                display: { name: "split" },
              }}
            />
            <ShippingElement />
          </div>
          <div className="w-full xl:px-10 xl:pr-20">
            <CheckoutSummary />
          </div>
        </form>
      </div>
      <HelpfulInformation />
    </div>
  );
};

export default CheckoutForm;
