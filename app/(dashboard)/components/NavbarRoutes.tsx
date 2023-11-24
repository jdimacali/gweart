import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavbarRoutesProps {
  routes: Array<{
    label: string;
    href: string;
    icon: LucideIcon;
  }>;
}

const NavbarRoutes = ({ routes }: NavbarRoutesProps) => {
  return (
    <div className="flex gap-x-10 font-medium">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.label}
          className="hover: text-decoration-line: underline;"
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};
export default NavbarRoutes;
