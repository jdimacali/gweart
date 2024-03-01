import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Policy from "./Policy";

const HelpfulInformation = () => {
  const information = [
    {
      name: "Shipping Policy ",
      description:
        "U.S. customers only. All ready to ship orders will be shipped USPS within 3-5 business days. Please message before placing your order if you are interested in upgraded shipping options.",
    },
    {
      name: "Returns Policy",
      description:
        "No returns. All sales are final but please message me with any issues.",
    },
  ];
  return (
    <div className="text-sm mt-20">
      <div className="mb-10 text-base flex flex-col items-center justify-center">
        <Image src="/icon/stripe.png" alt="Stripe" width={100} height={100} />
        Checkout powered by stripe{" "}
      </div>
      <div className="text-sm">
        <div className="mb-4">Helpful Information</div>
        <div className="flex flex-col gap-y-4">
          {information.map((info) => (
            <Policy
              key={info.name}
              name={info.name}
              description={info.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default HelpfulInformation;
