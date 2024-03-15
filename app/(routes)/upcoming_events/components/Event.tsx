import { API_URL, formatDateFromString } from "@/lib/utils";
import { Event as EventType } from "@/types";
import { ArrowUpRight, Calendar, MapPinIcon, PinIcon } from "lucide-react";
import Image from "next/image";

interface EventProps {
  event: EventType;
}

const Event = ({ event }: EventProps) => {
  return (
    <div className="w-[22rem] xl:w-[30rem] h-full">
      <a href={event.attributes.url} target="_blank" rel="noopener noreferrer">
        <div className="w-full relative overflow-hidden shadow-lg aspect-video">
          <Image
            src={event.attributes.image.data.attributes.formats.large.url}
            alt={`${API_URL}${event.attributes.name}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
            className="object-cover object-top rounded-t-xl hover:scale-110 transition-all duration-500 ease-in-out transform"
          />
        </div>
        <div className="shadow-2xl rounded-b-lg flex flex-col h-auto w-full gap-y-2 p-4 bg-zinc-700/10 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl border border-zinc-800/20 ">
          <div className="flex text-xs md:text-md xl:text-base gap-x-2 items-center">
            <Calendar size={20} />
            <div className="flex opacity-70">
              <span>
                {formatDateFromString(event.attributes.start_date).monthName}
              </span>
              <span className="ml-1">
                {formatDateFromString(event.attributes.start_date).formattedDay}
              </span>
              {event.attributes?.end_date && (
                <>
                  <span className="mx-2">-</span>
                  <span>
                    {formatDateFromString(event.attributes?.end_date).monthName}
                  </span>
                  <span className="mx-1">
                    {
                      formatDateFromString(event.attributes?.end_date)
                        .formattedDay
                    }
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-x-2 items-center ">
            <MapPinIcon size={20} />
            <h1 className="text-xs md:text-md xl:text-base opacity-70">
              {event.attributes.address}
            </h1>
          </div>

          <h1 className="h-full w-[90%] text-md md:text-xl lg:text-2xl font-[600] opacity-90 mt-2">
            {event.attributes.name}
          </h1>
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
