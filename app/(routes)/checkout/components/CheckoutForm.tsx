import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";
import HelpfulInformation from "@/components/HelpfulInformation";
import ShippingElement from "./ShippingElement";
import { API_URL, formatPrice } from "@/lib/utils";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { StripeAddressElementChangeEvent } from "@stripe/stripe-js";

interface CheckoutFormProps {
  handleShipping: (code: any) => void;
  amount: number;
  shippingInfo: {
    id: string;
    standard: number;
    express: number;
  };
  handleShippingChangeState: (value: "standard" | "express") => void;
  selectedShipping: "standard" | "express";
  cartAmount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  tax: number;
  shippingLoading: boolean;
}

const CheckoutForm = ({
  handleShipping,
  amount,
  shippingInfo,
  handleShippingChangeState,
  selectedShipping,
  cartAmount,
  setAmount,
  tax,
  shippingLoading,
}: CheckoutFormProps) => {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleShippingChange = (value: "standard" | "express") => {
    handleShippingChangeState(value);
  };

  const router = useRouter();

  const handleError = (error: any) => {
    setLoading(false);
    console.error("Error during checkout", error);
    toast({
      title: "Error during checkout",
      description: `${error.message}`,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      selectedShipping: selectedShipping,
      shippingId: shippingInfo.id,
    };

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const paymentAmount = Math.round(amount * 100) / 100;
    // Create the PaymentIntent and obtain clientSecret
    const res = await axios.post(`${API_URL}/api/orders`, {
      amount: paymentAmount,
      shipping: payload,
    });

    const { client_secret: clientSecret } = await res.data;

    // Confirm the PaymentIntent using the details collected by the Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // !Important: Change the return url when in production
        return_url: "http://localhost:3000/cart",
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
      router.push("/cart");
    }

    setLoading(false);
  };

  const handleAddressChange = (e: StripeAddressElementChangeEvent) => {
    // pass the information to the page.tsx to handle shipping label calculations when form is completed
    if (e.complete) {
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
            <ShippingElement
              selectedShipping={selectedShipping}
              handleShippingChange={handleShippingChange}
              shippingInfo={shippingInfo}
              setAmount={setAmount}
              cartAmount={cartAmount}
              tax={tax}
            />
            <AddressElement
              onChange={handleAddressChange}
              options={{
                mode: "shipping",
                allowedCountries: ["US"],
                display: { name: "split" },
                fields: {
                  phone: "always",
                },
              }}
            />
          </div>
          <div className="w-full xl:px-10 xl:pr-20">
            <CheckoutSummary
              amount={amount}
              shippingInfo={shippingInfo}
              selectedShipping={selectedShipping}
              stripe={stripe}
              cartAmount={cartAmount}
              tax={tax}
              shippingLoading={shippingLoading}
              loading={loading}
            />
          </div>
        </form>
      </div>
      <HelpfulInformation />
    </div>
  );
};

export default CheckoutForm;
