"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SpooktacularGoodies = () => {
  return (
    <section
      className={
        "w-full min-h-[850px] bg-violet-950 shadow-2xl flex max-sm:flex-col justify-center text-center items-center gap-x-20 p-10"
      }
    >
      <div>
        <h2 className="text-7xl tracking-wider font-bold text-black font-mania antialiased drop-shadow-xl underline-offset-[13px] underline decoration-from-font">
          Spooktacular Goodies
        </h2>
        <Button
          onClick={() => {
            alert("Hello World");
          }}
          className="bg-gray-950 p-6 rounded-xl  max-sm:w-full transition-all hover:bg-gray-900 mt-8"
        >
          <h3 className="text-lg text-white m-3"> Shop Now </h3>
        </Button>
      </div>
      <div className="flex justify-center items-center relative drop-shadow-2xl">
        <Image
          src="/mex/mex1.png"
          width={600}
          height={600}
          alt="cholagif"
          className="object-contain absolute right-40"
        />
        <Image
          src="/mex/mex4.png"
          width={600}
          height={600}
          alt="cholagif"
          className="object-contain absolute left-[200px]"
        />
        <Image
          src="/mex/mex5.png"
          width={600}
          height={600}
          alt="cholagif"
          className="object-contain "
        />
      </div>
    </section>
  );
};
export default SpooktacularGoodies;
