import { formatDateFromString } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { Events } from "../page";
import ShareButton from "@/components/ShareButton";
import CalendarButton from "@/components/CalenderButton";
import CountdownTimer from "./CountdownTimer";
import CopyButton from "../../../../components/CopyButton";
import { Link, MapPin, Calendar } from "lucide-react";
import { isWithinInterval, parseISO, addDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const getEventStatus = (startDate: string, endDate?: string) => {
  const timeZone = "America/Los_Angeles";
  const now = toZonedTime(new Date(), timeZone);
  const start = toZonedTime(parseISO(startDate), timeZone);
  const end = endDate ? toZonedTime(parseISO(endDate), timeZone) : start;
  const sevenDaysFromNow = addDays(now, 7);

  // Check if event is happening now
  if (isWithinInterval(now, { start, end })) {
    return "happening";
  }

  // Check if event starts within the next 7 days
  if (start > now && start <= sevenDaysFromNow) {
    return "upcoming";
  }

  return null;
};

export const EventStatusBadge = ({ status }: { status: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-xl text-base font-mono
                 shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-white/10"
    >
      {status === "happening" ? (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-medium text-green-400">Live Now</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="font-medium text-yellow-400">Upcoming</span>
        </div>
      )}
    </motion.div>
  );
};

// Helper function to convert to title case
const toTitleCase = (str: string | number | null) => {
  if (!str) return "";
  return String(str)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const EventCard = ({ event }: { event: Events }) => {
  const eventStatus = getEventStatus(
    event.attributes.start_date,
    event.attributes.end_date
  );

  const hasLocation = event.attributes.address || event.attributes.venue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-lg overflow-hidden shadow-sm shadow-amber-100/10 bg-black/40 backdrop-blur-sm rounded-t-xl"
    >
      {/* Image Container with Status Badges */}
      <div className="relative aspect-[16/9]">
        {eventStatus && (
          <div className="absolute top-4 right-4 z-30">
            <EventStatusBadge status={eventStatus} />
          </div>
        )}
        <div className="absolute top-4 left-4 z-30">
          <CountdownTimer startDate={event.attributes.start_date} />
        </div>

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
        <h1 className="text-2xl md:text-3xl font-creep text-amber-100 group-hover:text-amber-200">
          {event.attributes.name}
        </h1>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-sans tracking-wide text-gray-300">
            <Calendar className="w-4 h-4 text-amber-500/70" />
            <div>
              <span>
                {
                  formatDateFromString(event.attributes.start_date)
                    .formattedDate
                }
              </span>
              {event.attributes?.end_date &&
                event.attributes.end_date !== event.attributes.start_date && (
                  <span>
                    {" - "}
                    {
                      formatDateFromString(event.attributes.end_date)
                        .formattedDate
                    }
                  </span>
                )}
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm font-sans text-gray-400 tracking-wide">
            <MapPin className="w-4 h-4 text-amber-500/70 mt-0.5" />
            <div>
              {event.attributes.address ? (
                <div className="text-gray-400">
                  {toTitleCase(event.attributes.address)}
                </div>
              ) : (
                <div className="text-gray-500 italic">Location TBA</div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
          {event.attributes.description}
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
            Learn More <Link className="inline-block ml-2" size="18" />
          </motion.a>
          <div className="flex items-center gap-2">
            {hasLocation && (
              <CopyButton
                address={event.attributes.address || ""}
                variant="amber"
              />
            )}
            <CalendarButton event={event} variant="amber" />
            <ShareButton event={event} variant="amber" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
