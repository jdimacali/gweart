import { SearchIcon } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

const NavUtil = () => {
  return (
    <div>
      <Button>
        <SearchIcon />
      </Button>
      <Button>
        <ShoppingCart />
      </Button>
    </div>
  );
};
export default NavUtil;
