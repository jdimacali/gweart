import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackToShop = ({ title, hidden }: { title: string; hidden?: boolean }) => {
  return (
    <Link
      href="/shop/search"
      className="flex gap-x-2 mb-8 items-center text-gray-500 hover:text-black group h-10 w-40"
    >
      <ArrowLeft
        className={clsx(
          "group-hover:translate-x-[-5px] transition ease-in-out",
          hidden && "hidden"
        )}
        color="purple"
        size={20}
      />
      <div className=" text-sm text-neutral-600 text-left sm:block hidden">
        {title}
      </div>
    </Link>
  );
};
export default BackToShop;
