"use client";

import { Search } from "lucide-react";
import { ModeToggle } from "./ui/toggle";
import { Button } from "./ui/button";

const NavUtil = () => {
  return (
    <div className="flex items-center justify-center ">
      <Button
        onClick={() => {
          alert("Searching...");
        }}
      >
        <Search />
      </Button>
      <ModeToggle />
    </div>
  );
};
export default NavUtil;
