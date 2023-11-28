import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarSearchIcon,
  FacebookIcon,
  LucideInstagram,
  LucideShoppingCart,
  PersonStandingIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import LinktreeLink from "./components/LinktreeLink";

const socials = [
  { label: "Upcoming Events", link: "", icon: CalendarSearchIcon },
  { label: "G.W.E New Item Shop Drop", link: "", icon: LucideShoppingCart },
  { label: "Tee Public", link: "", icon: ShoppingBagIcon },
  { label: "Etsy Shop", link: "", icon: ShoppingBasketIcon },
  { label: "Instagram", link: "", icon: LucideInstagram },
  { label: "Facebook", link: "", icon: FacebookIcon },
  { label: "Tik Tok", link: "", icon: PersonStandingIcon },
];

const page = () => {
  return (
    <section className="h-full w-full flex flex-col items-center">
      <div className="bg-[url('../public/background/bg3.jpg')] w-full h-full bg-cover bg-clip-padding bg-fixed bg-blend-overlay bg-gray-950  bg-opacity-50 pb-[7rem]">
        <div className="flex flex-col justify-center items-center w-full">
          <Avatar className="mt-10 h-[65px] w-[65px]">
            <AvatarImage src="./icon/gweart.jpg" />
            <AvatarFallback className="text-white"> Gwe </AvatarFallback>
          </Avatar>
          <h1 className="text-white font-semibold text-3xl">GweArt</h1>
        </div>
        <div className="flex flex-col items-center text-center justify-center text-black gap-y-10 mt-8">
          {socials.map((social) => (
            <LinktreeLink
              key={social.label}
              label={social.label}
              icon={social.icon}
              link={social.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default page;
