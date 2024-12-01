import Link from "next/link";

interface LinktreeLinkProps {
  name: string;
  url: string;
  icon?: string;
}

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ShoppingCart,
} from "lucide-react";

const getIconByName = (name: string) => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("shop")) {
    return <ShoppingCart className="w-5 h-5" />;
  }

  switch (lowerName) {
    case "facebook":
      return <Facebook className="w-5 h-5" />;
    case "twitter":
      return <Twitter className="w-5 h-5" />;
    case "instagram":
      return <Instagram className="w-5 h-5" />;
    case "linkedin":
      return <Linkedin className="w-5 h-5" />;
    default:
      return null; // Return null for no match
  }
};

const LinktreeLink = ({ name, url, icon }: LinktreeLinkProps) => {
  return (
    <Link href={url} target="blank">
      <div
        className="rounded-full text-white flex items-center bg-gray-600 border-gray-700 w-[24rem] max-w-[32rem] mx-auto
        font-semibold border-b-[5px] border-r-[5px] p-4 hover:animate-bounce hover:opacity-90 transition shadow-lg shadow-gray-900/50 hover:delay-150"
      >
        <div className="w-5">{getIconByName(name)}</div>
        <h1 className="text-sm flex-1 text-center">{name}</h1>
      </div>
    </Link>
  );
};
export default LinktreeLink;
