import Image from "next/image";
import Header from "./Header";

const Slime = () => {
  return (
    <div
      className="absolute w-full h-[35rem] xs:h-[40rem] sm:h-[45rem] 
      top-0 -mt-[50px] xs:-mt-[80px] sm:-mt-[100px] md:-mt-[120px] 
      flex items-center text-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent mix-blend-overlay" />
      <Image
        src="/slime.svg"
        alt="slime"
        fill
        className="object-cover opacity-60 scale-x-[-1] pt-10"
        quality={100}
        priority
      />

      <Image
        src="/slime.svg"
        alt="slime"
        fill
        className="object-cover opacity-100 z-4 pb-4 z-[10]"
        quality={100}
        priority
      />

      <div className="relative z-10">
        <Header />
      </div>
    </div>
  );
};

export default Slime;
