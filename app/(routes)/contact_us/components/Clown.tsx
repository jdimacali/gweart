import Image from "next/image";

const Clown = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center lg:overflow-visible overflow-clip">
      <div className="relative h-80 max-sm:w-[130%] w-[120%] z-2 ">
        <Image
          src="/clown/top.png"
          fill
          alt="clown_top"
          className="absolute object-fill z-2"
        />
      </div>
      <div className="flex justify-center items-center w-full">{children}</div>
      <div className="relative h-60 max-sm:w-[120%] w-[100%] z-2">
        <Image
          src="/clown/bottom.png"
          fill
          alt="clown_top"
          className="absolute object-fill"
        />
      </div>
    </div>
  );
};
export default Clown;
