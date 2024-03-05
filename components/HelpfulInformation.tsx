import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Policy from "../app/(routes)/shop/components/Policy";
import Link from "next/link";

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
  const icons = [
    {
      name: "apple pay",
      image: "/apple-pay.svg",
    },
    {
      name: "google pay",
      image: "/google-pay.svg",
    },

    {
      name: "visa",
      image: "/visa.svg",
    },

    {
      name: "american express",
      image: "/american-express.png",
    },
    {
      name: "master card",
      image: "/master-card.svg",
    },
    {
      name: "discover",
      image: "/discover.png",
    },
    {
      name: "diners club",
      image: "/diners-club.png",
    },
    {
      name: "JCB",
      image: "/jcb.jpg",
    },
    {
      name: "China UnionPay",
      image: "/union-pay.png",
    },
    {
      name: "afterpay",
      image: "/after-pay.svg",
    },
    {
      name: "cash app",
      image: "/cash-app.svg",
    },
  ];
  return (
    <div className="text-sm mt-20">
      <div className="mb-10 text-base flex flex-col items-center justify-center gap-y-2">
        <Image src="/icon/stripe.png" alt="Stripe" width={100} height={100} />
        Checkout powered by Stripe
        <div className="flex items-center justify-center gap-x-2">
          {icons.map((icon) => (
            <Image
              key={icon.name}
              src={icon.image}
              alt={icon.name}
              height={40}
              width={40}
              className="object-contain aspect-square"
            />
          ))}
        </div>
        <div className="flex gap-x-2 text-sm text-neutral-500 mt-1">
          <Link
            href={"https://stripe.com/legal/consumer"}
            className="hover:text-neutral-600 border-r pr-2"
          >
            Terms
          </Link>
          <Link
            href={"https://stripe.com/privacy"}
            className="hover:text-neutral-600"
          >
            Privacy
          </Link>
        </div>
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
