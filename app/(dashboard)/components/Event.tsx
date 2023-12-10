import Image from "next/image";
import Link from "next/link";

const Event = () => {
  return (
    <section className="w-full h-full justify-center bg-orange-600 dark:bg-violet-950 flex flex-col items-center gap-y-5 py-20">
      <div className="flex items-center justify-center w-full h-[40rem] relative ">
        <Link href={"/upcoming_events"}>
          <Image
            src={"/event2.png"}
            alt="event"
            fill
            className="object-contain z-[2]"
          />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-butcherman text-7xl">My Latest Events</h1>
      </div>
    </section>
  );
};
export default Event;
