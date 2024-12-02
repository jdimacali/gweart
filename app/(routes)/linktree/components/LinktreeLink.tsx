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
        className="rounded-lg text-black flex items-center bg-[#82a346] border-[#b8d87e] w-[95%] md:w-[80%] mx-auto
        font-semibold border-2 p-4 hover:bg-[#82a346] transition-all duration-300 
        shadow-lg shadow-green-900/30"
      >
        <div className="w-5 opacity-80">{getIconByName(name)}</div>
        <h1 className="text-base flex-1 text-center font-bold tracking-wide">
          {name}
        </h1>
      </div>
    </Link>
  );
};
export default LinktreeLink;
