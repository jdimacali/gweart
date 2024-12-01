import { formatDateFromString } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { Events } from "../page";
import ShareButton from "./Sharebutton";
import CalendarButton from "./CalenderButton";
import CountdownTimer from "./CountdownTimer";
import CopyButton from "./CopyButton";

const getEventStatus = (startDate: string, endDate?: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : start;
  end.setDate(end.getDate() + 1);
  end.setHours(0, 0, 0, 0);
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (now >= start && now <= end) {
    return "happening";
  } else if (start.getTime() - now.getTime() <= oneWeek && now < start) {
    return "upcoming";
  }
  return null;
};

const EventStatusBadge = ({ status }: { status: string }) => {
  return (
    <div className="absolute top-4 right-4 z-30 rotate-12">
      {status === "happening" ? (
        <div className="bg-green-600/90 text-white px-4 py-1 rounded-full font-mania text-sm animate-pulse ">
          <span className="font-bold">Live Now!</span>
        </div>
      ) : (
        <div className="bg-yellow-500/90 text-black px-4 py-1 rounded-full text-sm">
          <span className="font-bold">Upcoming!</span>
        </div>
      )}
    </div>
  );
};

const EventCard = ({ event }: { event: Events }) => {
  const eventStatus = getEventStatus(
    event.attributes.start_date,
    event.attributes.end_date
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="group relative h-[20rem] w-full rounded-lg overflow-hidden shadow-xl shadow-purple-900/20"
    >
      {eventStatus && <EventStatusBadge status={eventStatus} />}
      {!eventStatus && (
        <CountdownTimer startDate={event.attributes.start_date} />
      )}

      <a href={event.attributes.url} target="_blank" rel="noopener noreferrer">
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/75 
          group-hover:from-black/0 group-hover:via-black/20 group-hover:to-black/60 
          transition-all duration-300 z-10"
        />
        <Image
          src={event.attributes.image.data.attributes.url}
          alt={event.attributes.name}
          fill
          quality={100}
          className="object-cover object-center transition-all duration-500 group-hover:scale-110"
        />

        <div className="flex-row absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20">
          <div className="flex flex-col h-full justify-end">
            <h1 className="text-2xl md:text-3xl font-creep text-purple-200 mb-3 group-hover:text-purple-300">
              {event.attributes.name}
            </h1>

            <div className="text-sm font-sans tracking-wide text-gray-300 group-hover:text-white transition-colors">
              <span className="mr-2">
                {
                  formatDateFromString(event.attributes.start_date)
                    .formattedDate
                }
              </span>
              {event.attributes?.end_date && (
                <span>
                  -{" "}
                  {
                    formatDateFromString(event.attributes.end_date)
                      .formattedDate
                  }
                </span>
              )}
            </div>

            <div className="flex items-center justify-between mt-2">
              <p className="text-sm font-sans text-gray-400 tracking-wide">
                {event.attributes.address}
              </p>
              <div className="lg:flex flex-col hidden lg:flex-row items-center gap-2 lg:gap-x-2">
                <CopyButton address={event.attributes.address} />
                <CalendarButton event={event} />
                <ShareButton event={event} />
              </div>
            </div>
          </div>
          <div className="lg:hidden items-center gap-2 lg:gap-x-2 mt-2">
            <CopyButton address={event.attributes.address} />
            <CalendarButton event={event} />
            <ShareButton event={event} />
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default EventCard;
