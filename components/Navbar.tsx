"use client";

import MobileNavbar from "./MobileNavbar";
import NavbarRoutes from "./NavbarRoutes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useScrollDirection } from "react-use-scroll-direction";
import clsx from "clsx";

export const routes = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming_events" },
  { label: "Gallery", href: "/art_gallery" },
  { label: "Social", href: "/social" },
  { label: "Contact Us", href: "/contact_us" },
  {
    label: "Shop",
    href: "https://gweart.square.site/",
  },
  { label: "Linktree", href: "/linktree" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  useEffect(() => {
    if (isScrollingDown) {
      setIsVisible(false);
    } else if (isScrollingUp) {
      setIsVisible(true);
    }
  }, [isScrollingUp, isScrollingDown]);

  return (
    <>
      <section
        className={clsx(
          `sticky top-0 flex w-full items-center justify-between
           bg-black/95 backdrop-blur-sm border-b border-purple-100/[0.1]
           px-6 md:px-10 py-4 z-50`,
          isVisible
            ? "translate-y-0 opacity-100 shadow-lg shadow-purple-100/[0.025]"
            : "-translate-y-full opacity-0",
          "transition-all duration-700 ease-in-out transform"
        )}
      >
        <Link
          href="/"
          className="relative sm:h-16 sm:w-16 w-14 h-14 transform transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/icon/gwe.png"
            alt="gwe"
            quality={100}
            sizes="100vh"
            fill
            className="relative w-20 h-20 opacity-95 hover:opacity-100 transition-all duration-300"
            onContextMenu={(e) => e.preventDefault()}
            priority
          />
        </Link>
        <div className="flex gap-x-8">
          <div className="hidden md:block">
            <NavbarRoutes routes={routes} pathname={pathname} />
          </div>
          <div className="md:hidden">
            <MobileNavbar routes={routes} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
