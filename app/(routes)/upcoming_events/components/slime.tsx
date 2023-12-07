import Image from "next/image";

const Slime = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute w-full h-[50rem] mt-[-3rem] ">
      <Image
        src="/slime1.svg"
        alt="slime"
        fill
        className="object-fit z-[-10] bg-repeat"
      />
      {children}
    </div>
  );
};
export default Slime;
