import Image from "next/image";

const Footer = () => {
  return (
    <section className="w-full h-[200px] bg-gray-950 flex flex-col items-center text-center pt-10 min-sm:pb-10 gap-5">
      <h1 className="text-white opacity-20 text-lg font-semibold">
        © 2023 Gweart All rights reserved. | Los Angeles, CA 90042 |
        www.gweart.com
      </h1>
      <Image
        src="/gwe.png"
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
