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
    <div className="flex gap-x-10 font-[600] h-full justify-center items-center text-sm">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.label}
          className={clsx(
            "last animate-out link  link-underline link-underline-black",
            pathname === route.href &&
              "underline underline-offset-4 decoration-2 transition-colors",
            pathname !== route.href ? "last:animate-bounce" : ""
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};
export default NavbarRoutes;
