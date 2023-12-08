import Image from "next/image";

const Hand = () => {
  return (
    <div className="absolute w-full top-0 h-[100vh] overflow-hidden">
      <Image src="hand.svg" alt="hand" fill className="object-cover" />
    </div>
  );
};
export default Hand;
