"use client";

import Link from "next/link";

const error = () => {
  return (
    <div className="w-full h-full items-center justify-center text-center mt-20">
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="text-7xl font-bold text-[#8b46c4] font-mania antialiased drop-shadow-2xl underline-offset-[13px] underline decoration-from-font text-shadow-white">
          404
        </h1>
        <span className="text-3xl font-bold text-[#bd43e2] antialiased">
          Page Not Found
        </span>
        <Link href="/shop/search">
          <button className="bg-gray-950 rounded-xl max-sm:w-[90vw] transition-all hover:bg-gray-900 hover:opacity-80 ">
            <h3 className="text-md font-bold text-white m-3">Back to Shop</h3>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default error;
