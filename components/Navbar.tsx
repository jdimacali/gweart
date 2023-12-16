"use client";

import {
  CalendarHeart,
  Contact2Icon,
  HomeIcon,
  ShoppingCartIcon,
  Trees,
} from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import NavbarRoutes from "./NavbarRoutes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavUtil from "./NavUtil";
import { useEffect, useState } from "react";
import clsx from "clsx";

const routes = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Upcoming Events", href: "/upcoming_events", icon: CalendarHeart },
  { label: "Contact Us", href: "/contact_us", icon: Contact2Icon },
  { label: "Shop All", href: "/shop", icon: ShoppingCartIcon },
  { label: "Linktree", href: "/linktree", icon: Trees },
];

const Navbar = () => {
  const pathname = usePathname();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <section
      className={clsx(
        `flex max-sm:py-5 text-black p-6 gap-x-4 mr-auto justify-between text-center items-center sticky z-[10] transition-all 
        delay-100 duration-1000 ease-in-out dark:text-white dark:bg-black dark:border-opacity-10 bg-[#F6F1EE] md:px-10`,
        visible ? "top-0 translate-y-0" : "-translate-y-full"
      )}
    >
      <Link className="relative h-[2.5rem] w-[5rem]" href="/">
        <Image
          src="/icon/gwe.png"
          alt="gwe"
          quality="100"
          sizes="100vh"
          fill
          className="object-contain"
        />
      </Link>
      <div className="flex gap-x-8 ">
        <div className="hidden md:block">
          <NavbarRoutes routes={routes} pathname={pathname} />
        </div>
        <NavUtil />
        <div className="md:hidden">
          <MobileNavbar routes={routes} />
        </div>
      </div>
    </section>
  );
};
export default Navbar;
