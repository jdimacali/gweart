"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const SpooktacularGoodies = () => {
  return (
    <section className="w-full h-[950px] bg-teal-800 shadow-2xl flex justify-center text-center items-center">
      <div>
        <h2 className="text-4xl font-bold text-white">Spooktacular Goodies</h2>
        <Button>Shop Now </Button>
      </div>
      <div className="h-80 w-80 relative">
        <Image
          src="/chola.gif"
          fill
          alt="cholagif"
          className="object-contain"
        />
      </div>
    </section>
  );
};
export default SpooktacularGoodies;
