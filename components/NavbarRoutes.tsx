import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavbarRoutesProps {
  routes: Array<{
    label: string;
    href: string;
    highlight?: boolean;
  }>;
  pathname: string;
}

const NavbarRoutes = ({ routes, pathname }: NavbarRoutesProps) => {
  return (
    <div className="flex items-center gap-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          target={route.href.startsWith("http") ? "_blank" : "_self"}
          className={clsx(
            "relative px-2 py-1 text-sm font-medium tracking-wide transition-all duration-300 group",

            // NORMAL LINKS
            !route.highlight &&
              clsx(
                "hover:text-purple-300",
                pathname === route.href ? "text-purple-300" : "text-white/90"
              ),

            // SHOP BUTTON
            route.highlight &&
              "relative px-5 py-2 rounded-full bg-purple-600 text-white shadow-lg hover:scale-105 z-10"
          )}
        >
          {route.label}

          {/* underline animation for normal links */}
          {!route.highlight && (
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-purple-400"
              initial={false}
              animate={{
                width: pathname === route.href ? "100%" : "0%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}

          {/* shining sweep inside the button */}
          {route.highlight && (
            <span
              className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-r from-transparent via-white/30 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            "
            />
          )}

          {/* NEW notification dot */}
          {route.highlight && (
            <span className="absolute top-0 right-1 translate-x-1/4 -translate-y-1/4 z-50 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 ring-1 ring-black"></span>
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default NavbarRoutes;