"use client";

import MobileNavbar from "./MobileNavbar";
import NavbarRoutes from "./NavbarRoutes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import NavUtil from "./NavUtil";

const routes = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming_events" },
  { label: "Contact Us", href: "/contact_us" },
  {
    label: "Shop",
    href: "/shop/search",
  },
  { label: "Linktree", href: "/linktree" },
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
        `flex md:py-4 py-2 justify-between text-center items-center sticky z-50 transition-all 
        delay-100 duration-1000 ease-in-out text-white bg-black border-opacity-10 px-6 md:px-12 max-sm:top-0 max-sm:translate-y-0 `,
        visible ? "top-0 translate-y-0" : "-translate-y-full"
      )}
    >
      <Link href="/" className="relative sm:h-20 sm:w-20 w-14 h-14">
        <Image
          src="/icon/gwe.png"
          alt="gwe"
          quality="100"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="object-contain pointer-events-none"
          priority
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        />
      </Link>
      <div className="flex md:gap-x-4">
        <div className="hidden md:block">
          <NavbarRoutes routes={routes} pathname={pathname} />
        </div>
        <div className="md:hidden mr-2">
          <MobileNavbar routes={routes} />
        </div>
        <NavUtil />
      </div>
    </section>
  );
};
export default Navbar;
