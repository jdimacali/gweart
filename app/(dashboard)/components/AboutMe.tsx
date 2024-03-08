import Image from "next/image";

const AboutMe = () => {
  return (
    <div className="w-full h-full py-12 bg-[#612f75]">
      <div className="flex flex-col md:flex-row gap-y-14 gap-x-20 items-center justify-center">
        <div className="">
          <Image
            src="/assets/karen.webp"
            alt="Picture of the author"
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="h-full flex flex-col justify-center text-white gap-y-4">
          <p className="text-lg md:text-xl font-semibold">
            {" "}
            Specializing in the UnOrdinary
          </p>
          <p className="text-2xl md:text-3xl font-bold">
            {" "}
            I am Girl Wonder Extraordinaire
          </p>
          <p className="text-md"> Los Angeles based Mixed Media Artist</p>
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
