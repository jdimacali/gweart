import { formatDateFromString } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { Events } from "../page";
import ShareButton from "@/components/ShareButton";
import CalendarButton from "@/components/CalenderButton";
import CountdownTimer from "./CountdownTimer";
import CopyButton from "../../../../components/CopyButton";
import { Link } from "lucide-react"; // Importing the Lucide icon

export const getEventStatus = (startDate: string, endDate?: string) => {
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

export const EventStatusBadge = ({ status }: { status: string }) => {
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
  // bg - black / 40;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-lg overflow-hidden shadow-sm shadow-amber-100/10 bg-black/40 backdrop-blur-sm rounded-t-xl"
    >
      {/* Image Container with Status Badges */}
      <div className="relative aspect-[16/9]">
        {eventStatus && <EventStatusBadge status={eventStatus} />}
        {!eventStatus && (
          <CountdownTimer startDate={event.attributes.start_date} />
        )}

        <Image
          src={event.attributes.image.data.attributes.url}
          alt={event.attributes.name}
          fill
          quality={100}
          className="object-cover object-center transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-creep text-amber-100 group-hover:text-amber-200">
          {event.attributes.name}
        </h1>

        {/* Date and Location */}
        <div className="space-y-2">
          <div className="text-sm font-sans tracking-wide text-gray-300">
            <span className="mr-2">
              {formatDateFromString(event.attributes.start_date).formattedDate}
            </span>
            {event.attributes?.end_date && (
              <span>
                -{" "}
                {formatDateFromString(event.attributes.end_date).formattedDate}
              </span>
            )}
          </div>
          <p className="text-sm font-sans text-gray-400 tracking-wide">
            {event.attributes.address}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {event.attributes.description || "More details coming soon..."}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <motion.a
            href={event.attributes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-600/20 hover:bg-amber-600/40 
                     rounded-full border border-amber-500/30 
                     transition-all duration-300
                     hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More <Link className="inline-block ml-2" size="18" />{" "}
            {/* Using Lucide icon */}
          </motion.a>
          <div className="flex items-center gap-2">
            <CopyButton address={event.attributes.address} variant="amber" />
            <CalendarButton event={event} variant="amber" />
            <ShareButton event={event} variant="amber" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
