import Image from "next/image";

const Footer = () => {
  return (
    <section className="w-full h-full pb-10 px-8 bg-gray-950 flex flex-col items-center text-center pt-10 min-sm:pb-10 gap-5">
      <h1 className="text-white opacity-20 text-lg font-semibold">
        © 2023 Gweart All rights reserved. | Los Angeles, CA 90042 | Art by Girl
        Wonder Extraordinaire | Specializing in the UnOrdinary | www.gweart.com
      </h1>
      <Image
        src="/icon/gwe.png"
        alt="gwe"
        quality="100"
        height={100}
        width={100}
        className="object-contain"
      />
    </section>
  );
};
export default Footer;
