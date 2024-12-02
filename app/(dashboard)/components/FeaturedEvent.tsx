"use client";

import { Events } from "@/app/(routes)/upcoming_events/page";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Spin from "@/components/Spin";
import { format } from "date-fns";
import { formatDateFromString } from "@/lib/utils";
import CountdownTimer from "@/app/(routes)/upcoming_events/components/CountdownTimer";
import CopyButton from "@/app/(routes)/upcoming_events/components/CopyButton";
import CalendarButton from "@/app/(routes)/upcoming_events/components/CalenderButton";
import ShareButton from "@/app/(routes)/upcoming_events/components/Sharebutton";
import {
  getEventStatus,
  EventStatusBadge,
} from "@/app/(routes)/upcoming_events/components/EventCard";

const FeaturedEvent = () => {
  const [event, setEvent] = useState<Events | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNextEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/events");
        const events: Events[] = response.data;

        const now = new Date();
        const sortedEvents = events.sort((a, b) => {
          const startA = new Date(a.attributes.start_date);
          const startB = new Date(b.attributes.start_date);
          return startA.getTime() - startB.getTime();
        });

        const currentOrNextEvent = sortedEvents.find((event) => {
          const startDate = new Date(event.attributes.start_date);
          const endDate = event.attributes.end_date
            ? new Date(event.attributes.end_date)
            : startDate;
          return now <= endDate;
        });

        setEvent(currentOrNextEvent);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    getNextEvent();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Spin />
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const eventStatus = getEventStatus(
    event.attributes.start_date,
    event.attributes.end_date
  );

  return (
    <section className="w-full bg-zinc-800/10 py-32 relative">
      {/* Spider Web Decorations */}
      <Image
        src="/web.png"
        width={900}
        height={900}
        alt="web"
        className="absolute top-0 max-md:w-[100%] max-md:object-contain max-md:left-0 md:-left-3 opacity-10 pointer-events-none"
        priority
      />
      <Image
        src="/web.png"
        width={900}
        height={900}
        alt="web"
        className="absolute bottom-0 right-0 max-md:w-[100%] max-md:object-contain opacity-10 rotate-180 pointer-events-none"
        priority
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-mania text-5xl md:text-6xl text-orange-300 mb-4">
            Featured Event
          </h2>
          <div className="h-1 w-24 bg-orange-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl group"
        >
          {/* Theater screen effect */}
          <div className="absolute inset-0 shadow-[0_0_100px_20px_rgba(255,255,255,0.15)] pointer-events-none z-20" />
          <div className="absolute -inset-[2px] bg-gradient-to-r from-white/5 via-white/10 to-white/5 z-10" />

          {/* Stage light effects */}
          <div
            className="absolute -top-[150px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] 
            bg-gradient-radial from-white/10 via-white/5 to-transparent rotate-180 opacity-50 z-10"
          />

          {eventStatus && <EventStatusBadge status={eventStatus} />}
          {!eventStatus && (
            <CountdownTimer startDate={event.attributes.start_date} />
          )}

          <div className="aspect-[21/9] relative">
            <Image
              src={event.attributes.image.data.attributes.url}
              alt={event.attributes.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-4xl font-creep text-orange-200 mb-4 group-hover:text-orange-300 transition-colors">
              {event.attributes.name}
            </h3>

            <div className="flex flex-col gap-4">
              <div className="text-sm font-sans tracking-wide text-gray-300">
                <span className="mr-2">
                  {
                    formatDateFromString(event.attributes.start_date)
                      .formattedDate
                  }
                </span>
                {event.attributes.end_date && (
                  <span>
                    -{" "}
                    {
                      formatDateFromString(event.attributes.end_date)
                        .formattedDate
                    }
                  </span>
                )}
              </div>

              <p className="text-sm font-sans text-gray-400 tracking-wide">
                {event.attributes.address}
              </p>

              <div className="flex items-center gap-4 mt-4">
                <motion.a
                  href={event.attributes.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-orange-600 hover:bg-orange-700 
                    rounded-full font-semibold transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>

                <div className="flex items-center gap-3">
                  <CopyButton address={event.attributes.address} />
                  <CalendarButton event={event} />
                  <ShareButton event={event} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
