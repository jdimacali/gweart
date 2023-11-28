"use client";

import {
  CalendarHeart,
  Contact2Icon,
  HomeIcon,
  Search,
  ShoppingCartIcon,
  Trees,
} from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import NavbarRoutes from "./NavbarRoutes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Upcoming Events", href: "/upcoming_events", icon: CalendarHeart },
  { label: "Contact Us", href: "/contact_us", icon: Contact2Icon },
  { label: "Shop All", href: "/shop", icon: ShoppingCartIcon },
  { label: "Linktree", href: "/linktree", icon: Trees },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <section className="flex bg-black text-white p-10 gap-x-4 mr-auto justify-between text-center items-center shadow-2xl sticky top-0 z-[10]">
      <Link className="relative h-[3rem] w-[5rem] m-[-1rem]" href="/">
        <Image
          src="/icon/gwe.png"
          alt="gwe"
          quality="100"
          fill
          className="object-contain"
        />
      </Link>
      <div className="flex gap-x-10 md:mr-10">
        <div className="hidden sm:block">
          <NavbarRoutes routes={routes} pathname={pathname} />
        </div>
        <Search />
        <div className="sm:hidden">
          <MobileNavbar routes={routes} />
        </div>
      </div>
    </section>
  );
};
export default Navbar;
