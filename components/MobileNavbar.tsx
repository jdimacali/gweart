import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, X } from "lucide-react";
import { Fragment, useState } from "react";

interface MobileNavbarProps {
  routes: Array<{
    label: string;
    href: string;
  }>;
}

const MobileNavbar = ({ routes }: MobileNavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={`
          p-2 rounded-full
          transition-all duration-300
          hover:bg-white/10
          active:scale-95
        `}
      >
        <MenuIcon className="w-6 h-6 text-white" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[300px] bg-black/95 backdrop-blur-lg border-l border-white/10"
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className={`
            absolute right-4 top-4
            p-2 rounded-full
            transition-all duration-300
            hover:bg-white/10
            active:scale-95
          `}
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <nav className="flex flex-col gap-y-6 pt-12">
          {routes.map((route, index) => (
            <Fragment key={route.label}>
              <Link
                href={route.href}
                onClick={() => setOpen(false)}
                className={`
                  relative px-4 py-2
                  text-lg font-medium text-white/90
                  transition-all duration-300
                  hover:text-purple-300
                  hover:translate-x-2
                  focus:outline-none
                  group
                `}
              >
                <span className="relative">
                  {route.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
              {index < routes.length - 1 && (
                <div className="h-px bg-white/10 mx-4" />
              )}
            </Fragment>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
