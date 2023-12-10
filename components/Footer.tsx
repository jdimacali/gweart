import Image from "next/image";

const Footer = () => {
  return (
    <section className="w-full h-full px-8 text-black dark:text-white bg-gray-100 dark:bg-gray-900 flex flex-col items-center text-center border-t border-black/10 shadow-inner shadow-black">
      <h1 className="dark:opacity-40 opacity-60 text-lg font-semibold pt-4 absolute z-[1] sm:w-[50vh] max-sm:w-[50vh] mt-20 tracking-wider">
        © 2023 Gweart All rights reserved. | Los Angeles, CA 90042 | Art by Girl
        Wonder Extraordinaire | Specializing in the UnOrdinary | www.gweart.com
      </h1>
      <div className="bg-[url('/graveyard.png')] w-full h-[31rem] bg-auto bg-no-repeat absolute overflow-hidden bg-inherit brightness-95  dark:brightness-110" />
    </section>
  );
};
export default Footer;
