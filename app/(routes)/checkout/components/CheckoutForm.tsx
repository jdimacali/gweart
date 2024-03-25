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

interface CheckoutFormProps {
  handleShipping: (code: any) => void;
  amount: number;
  shippingCost: {
    standard: number;
    express: number;
  };
}

const CheckoutForm = ({
  handleShipping,
  amount,
  shippingCost,
}: CheckoutFormProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState<
    "standard" | "express"
  >("standard");
  
  const stripe = useStripe();
  const elements = useElements();

  const handleShippingChange = (value: "standard" | "express") => {
    setSelectedShipping(value);
  };

  const router = useRouter();

  const handleError = (error: any) => {
    setLoading(false);
    console.error("Error during checkout", error);
    toast({
      title: "Error during checkout",
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded or there are not elements.
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
    // pass the information to the page.tsx to handle shipping label calculations when form is completed
    if (e.complete) {
      console.log("Address complete", e);
      handleShipping(e);
    }
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
            <ShippingElement
              selectedShipping={selectedShipping}
              handleShippingChange={handleShippingChange}
            />
          </div>
          <div className="w-full xl:px-10 xl:pr-20">
            <CheckoutSummary
              amount={amount}
              shippingCost={shippingCost}
              selectedShipping={selectedShipping}
            />
          </div>
        </form>
      </div>
      <HelpfulInformation />
    </div>
  );
};

export default CheckoutForm;
