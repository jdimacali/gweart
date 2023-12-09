import Image from "next/image";

const Event = () => {
  return (
    <section className="w-full h-full bg-zinc-300 dark:bg-black flex flex-col items-center pt-12 pb-20 gap-y-5">
      <div className="w-full max-sm:h-[40rem] sm:h-[40rem] h-[60rem] flex flex-col items-center pt-12 pb-20 gap-y-5 relative">
        <Image
          src={"/event2.png"}
          alt="event"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
};
export default Event;
