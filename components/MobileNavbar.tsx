import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LucideIcon, MenuIcon } from "lucide-react";
import { Fragment, useState } from "react";

interface MobileNavbarProps {
  routes: Array<{
    label: string;
    href: string;
    icon: LucideIcon;
  }>;
}

const MobileNavbar = ({ routes }: MobileNavbarProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="pt-2">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="p-0">
          <section className="flex flex-col text-center items-center gap-y-5 pt-12 bg-white gap-x-10 font-medium h-full w-full m-0">
            {routes.map((route) => (
              <Fragment key={route.label}>
                <Link
                  href={route.href}
                  className="hover: text-decoration-line: underline;"
                  onClick={() => setOpen(false)}
                >
                  <div>
                    <h1 className="text-1xl text-black">{route.label}</h1>
                  </div>
                </Link>
                <div className="h-[1px] bg-gray-950 opacity-20 w-full" />
              </Fragment>
            ))}
          </section>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
