import clsx from "clsx";
import Link from "next/link";

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
            "after:content-[''] after:absolute after:left-0 after:bottom-0",
            "after:h-[2px] after:w-0 after:bg-purple-400",
            "after:transition-all after:duration-300",
            "hover:after:w-full",
            pathname === route.href
              ? "text-purple-300 after:w-full"
              : "text-white/90"
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};
export default NavbarRoutes;
