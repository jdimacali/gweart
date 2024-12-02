import Image from "next/image";

const Divider = () => {
  return (
    <div className="relative w-full h-16 flex justify-center items-center -my-8 z-10">
      <div className="flex items-center gap-4">
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <Image
          src="/ghost.png"
          width={30}
          height={30}
          alt="Ghost"
          className="opacity-20"
        />
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>
    </div>
  );
};

export default Divider;
