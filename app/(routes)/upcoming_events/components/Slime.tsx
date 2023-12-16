import Image from "next/image";

const Slime = () => {
  return (
    <div className="absolute w-full top-0 h-[100vh] overflow-hidden">
      <Image src="/slime3.svg" alt="slime" fill className="object-cover" />
    </div>
  );
};
export default Slime;
