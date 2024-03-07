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
      image: "/icon/apple-pay.svg",
    },
    {
      name: "google pay",
      image: "/icon/google-pay.svg",
    },

    {
      name: "visa",
      image: "/icon/visa.svg",
    },

    {
      name: "american express",
      image: "/icon/american-express.png",
    },
    {
      name: "master card",
      image: "/icon/master-card.svg",
    },
    {
      name: "discover",
      image: "/icon/discover.png",
    },
    {
      name: "diners club",
      image: "/icon/diners-club.png",
    },
    {
      name: "JCB",
      image: "/icon/jcb.jpg",
    },
    {
      name: "China UnionPay",
      image: "/icon/union-pay.png",
    },
    {
      name: "afterpay",
      image: "/icon/after-pay.svg",
    },
    {
      name: "cash app",
      image: "/icon/cash-app.svg",
    },
  ];
  return (
    <div className="text-sm mt-20">
      <div className="mb-10 text-base flex flex-col items-center justify-center">
        <Image src="/icon/stripe.png" alt="Stripe" width={100} height={100} />
        <div>Checkout powered by Stripe</div>

        <div className="flex items-center justify-center gap-x-2 mt-4">
          {icons.map((icon) => (
            <Image
              key={icon.name}
              src={icon.image}
              alt={icon.name}
              height={35}
              width={35}
              className="object-contain aspect-square"
            />
          ))}
        </div>
        <div className="flex gap-x-2 text-sm text-neutral-500 mt-4">
          <Link
            href={"https://stripe.com/legal/consumer"}
            className="hover:text-neutral-600 border-r pr-2"
            target="_blank"
          >
            Terms
          </Link>
          <Link
            href={"https://stripe.com/privacy"}
            className="hover:text-neutral-600"
            target="_blank"
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
