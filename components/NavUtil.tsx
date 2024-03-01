import { SearchIcon } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const NavUtil = () => {
  return (
    <div className="flex items-center justify-center">
      <Button>
        <SearchIcon />
      </Button>
      <Link href={"/cart"}>
        <ShoppingCart />
      </Link>
    </div>
  );
};
export default NavUtil;
