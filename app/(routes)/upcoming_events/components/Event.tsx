import { API_URL, formatDateFromString } from "@/lib/utils";
import { Event as EventType } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface EventProps {
  event: EventType;
}

const Event = ({ event }: EventProps) => {
  return (
    <div className="h-[15rem] w-[22.5rem] md:h-[20rem] md:w-[30rem] rounded-b m-4">
      <a href={event.attributes.url} target="_blank" rel="noopener noreferrer">
        <div className="w-full h-full relative overflow-hidden shadow-lg">
          <Image
            src={event.attributes.image.data.attributes.formats.large.url}
            alt={`${API_URL}${event.attributes.name}`}
            fill
            priority
            quality={100}
            className="object-cover object-top rounded-t-xl hover:scale-110 transition-all duration-500 ease-in-out transform"
          />
        </div>
        <div className="shadow-2xl flex flex-col h-auto w-full gap-y-1 p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter bg-opacity-10 border border-gray-600 backdrop-blur-3xl">
          <h1 className="text-xl md:text-2xl font-[600] opacity-90 mt-2 ">
            {event.attributes.name}
          </h1>
          <div className="text-md font-semibold text-gray-300">
            <span className="mr-2">
              {formatDateFromString(event.attributes.start_date)}
            </span>
            {event.attributes?.end_date && (
              <span>- {formatDateFromString(event.attributes?.end_date)}</span>
            )}
          </div>
          <h1 className="text-sm opacity-60">{event.attributes.address}</h1>
          <div className="hidden sm:block">
            <ArrowUpRight
              height={60}
              width={60}
              className="absolute bottom-0 right-0 p-4"
            />
          </div>
        </div>
      </a>
    </div>
  );
};
export default Event;
