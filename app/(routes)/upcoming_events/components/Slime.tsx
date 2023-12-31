import Image from "next/image";

const Slime = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute w-full h-[48rem] sm:h-[60rem] top-0 mt-[-200px] flex items-center text-center justify-center">
      <Image
        src="/slime.svg"
        alt="slime"
        fill
        className="object-cover"
        quality={100}
      />
      {children}
    </div>
  );
};
export default Slime;
