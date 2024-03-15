const Footer = () => {
  return (
    <section className="w-full h-full px-8 text-white bg-black flex flex-col items-center text-center border-t border-black/10 shadow-inner shadow-black">
      <h1 className="opacity-50 font-semibold pt-4 px-2 absolute z-[1] sm:w-[40%] w-[80%] mt-20 tracking-wider text-sm">
        © 2023 Gweart All rights reserved. | Los Angeles, CA 90042 | Art by Girl
        Wonder Extraordinaire | Specializing in the UnOrdinary |
        www.artbygwe.com
      </h1>
      <div className="bg-[url('/assets/graveyard.png')] w-full h-[31rem] bg-center bg-no-repeat absolute overflow-hidden bg-inherit brightness-150 pointer-events-none" />
    </section>
  );
};
export default Footer;
