import Image from "next/image";

const Slime = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="absolute w-full h-[35rem] xs:h-[40rem] sm:h-[45rem] md:h-[55rem] lg:h-[65rem] 
      top-0 -mt-[50px] xs:-mt-[80px] sm:-mt-[100px] md:-mt-[120px] 
      flex items-center text-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent mix-blend-overlay" />
      <Image
        src="/slime.svg"
        alt="slime"
        fill
        className="object-cover opacity-80"
        quality={100}
        priority
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Slime;
