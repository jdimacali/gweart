import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LucideIcon, MenuSquareIcon } from "lucide-react";

interface MobileNavbarProps {
  routes: Array<{
    label: string;
    href: string;
    icon: LucideIcon;
  }>;
}

const MobileNavbar = ({ routes }: MobileNavbarProps) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <MenuSquareIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
