import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavbarRoutesProps {
  routes: Array<{
    label: string;
    href: string;
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
          className={clsx(
            "relative px-2 py-1 text-sm font-medium tracking-wide",
            "transition-all duration-300",
            "hover:text-purple-300",
            "group",
            pathname === route.href ? "text-purple-300" : "text-white/90"
          )}
        >
          {route.label}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-purple-400"
            initial={false}
            animate={{
              width: pathname === route.href ? "100%" : "0%"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          />
        </Link>
      ))}
    </div>
  );
};
export default NavbarRoutes;
