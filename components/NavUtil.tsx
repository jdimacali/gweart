"use client";

import { Search } from "lucide-react";
import { ModeToggle } from "./ui/toggle";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import Auth from "./Auth";

const NavUtil = () => {
  const { toast } = useToast();
  return (
    <div className="flex items-center justify-center ">
      {/* <Button
        onClick={() => {
          toast({
            description: "Searching ",
          });
        }}
      >
        <Search />
      </Button> */}
      <ModeToggle />
      {/* <Auth /> */}
    </div>
  );
};
export default NavUtil;
