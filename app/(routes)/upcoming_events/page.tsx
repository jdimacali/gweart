import Spin from "@/components/Spin";
import { API_URL, formatDateFromString } from "@/lib/utils";
import Image from "next/image";
import Header from "./components/Header";
import { ArrowUpRight } from "lucide-react";
import Slime from "./components/Slime";
import getEvents from "@/actions/getEvents";
import { Event as EventType } from "@/types";
import Event from "./components/Event";

const Page = async () => {
  const events = await getEvents();

  return (
    <section className="h-full w-full text-white bg-zinc-800 flex flex-col items-center justify-center pb-40 mt-0">
      <Slime>
        <Header />
      </Slime>
      <div className="w-full h-full pb-20 mt-40 md:mt-[15rem]">
        {events.length > 0 && (
          <div className="mt-[5rem] md:mt-[7rem] h-full w-full mb-20 grid sm:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 max-sm:gap-y-[12rem] md:gap-y-[10rem] items-center justify-center justify-items-center">
            {events
              .sort((a, b) => {
                let da = new Date(a.attributes.start_date).getTime(); // Convert to milliseconds
                let db = new Date(b.attributes.start_date).getTime(); // Convert to milliseconds
                return da - db; // Compare numerically
              })
              .map((event) => (
                <Event key={event.id} event={event} />
              ))}
          </div>
        )}
        {events.length === 0 && (
          <div className="flex pt-80 items-center justify-center">
            There are no events at this time. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
