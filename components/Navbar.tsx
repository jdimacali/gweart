"use client";

import MobileNavbar from "./MobileNavbar";
import NavbarRoutes from "./NavbarRoutes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Spin from "./Spin";

const routes = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming_events" },
  { label: "Contact Us", href: "/contact_us" },
  {
    label: "Shop",
    href: "https://gweart.square.site/",
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

  const imageLoader = <Spin />;

  return (
    <section
      className={clsx(
        `flex max-sm:py-2 max-sm:px-6 p-4 gap-x-4 mr-auto justify-between text-center items-center sticky z-50 transition-all 
        delay-100 duration-1000 ease-in-out text-white bg-black border-opacity-10 md:px-10 max-sm:top-0 max-sm:translate-y-0 `,
        visible ? "top-0 translate-y-0" : "-translate-y-full"
      )}
    >
      <Link href="/" className="relative sm:h-16 sm:w-16 w-14 h-14">
        <Image
          src="/icon/gwe.png"
          alt="gwe"
          quality="100"
          sizes="100vh"
          fill
          className="object-contain pointer-events-none"
          onContextMenu={(e) => {
            e.preventDefault();
          }}
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
  );
};
export default Navbar;
