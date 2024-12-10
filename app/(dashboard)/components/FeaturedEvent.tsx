"use client";

import { Events } from "@/app/(routes)/upcoming_events/page";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Spin from "@/components/Spin";
import { formatDateFromString } from "@/lib/utils";
import CountdownTimer from "@/app/(routes)/upcoming_events/components/CountdownTimer";
import CopyButton from "@/components/CopyButton";
import CalendarButton from "@/components/CalenderButton";
import ShareButton from "@/components/ShareButton";
import {
  getEventStatus,
  EventStatusBadge,
} from "@/app/(routes)/upcoming_events/components/EventCard";
import { Calendar, MapPin, Clock } from "lucide-react";

const FeaturedEvent = () => {
  const [event, setEvent] = useState<Events | undefined>();
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // Fetch event logic with error handling and retry
  useEffect(() => {
    const getNextEvent = async () => {
      try {
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
        // Delay setting loading to false for smoother transition
        setTimeout(() => setLoading(false), 100);
      }
    };

    getNextEvent();
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Loading state with consistent height
  if (loading || !event) {
    return (
      <section className="w-full min-h-[800px] flex items-center justify-center bg-gradient-to-b from-zinc-950 via-orange-900/10 to-zinc-950">
        <Spin />
      </section>
    );
  }

  const eventStatus = getEventStatus(
    event.attributes.start_date,
    event.attributes.end_date
  );

  return (
    <section
      ref={sectionRef}
      className="w-full h-full flex items-center justify-center py-20 md:py-20 relative overflow-hidden bg-gradient-to-b from-zinc-950 via-orange-900/10 to-zinc-950"
    >
      {/* Background Elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <div className="absolute inset-0 bg-[url('/background/pumpkin.png')] bg-cover bg-fixed opacity-[0.03] mix-blend-color-burn" />
        <Image
          src="/web.png"
          width={1200}
          height={1200}
          alt="web"
          className="absolute top-[-10%] left-[-10%] opacity-[0.025] blur-[2px] object-contain"
          priority
        />
        <Image
          src="/web.png"
          width={1000}
          height={1000}
          alt="web"
          className="absolute bottom-[0%] right-[-5%] opacity-[0.025] rotate-180 blur-[2px] object-contain"
          priority
        />
      </motion.div>

      {/* Content Container */}
      <div className="w-full max-w-[92%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] mx-auto px-2 sm:px-4 relative z-10">
        {/* Title Section - Further reduced margins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <h2 className="font-creep text-3xl sm:text-4xl md:text-5xl text-orange-300 mb-3 md:mb-4 drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]">
              Featured Event
            </h2>
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] max-w-[350px] mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent"
          />
        </motion.div>

        {/* Event Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: imageLoaded ? 1 : 0,
            y: imageLoaded ? 0 : 30,
          }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group bg-black/40 backdrop-blur-sm "
        >
          {/* Glass Effect & Borders */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 opacity-50 z-1" />
          <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-orange-500/40 to-orange-700/20 z-1" />

          {/* Status Badges */}
          <div className="absolute top-4 left-4 z-30">
            {eventStatus && <EventStatusBadge status={eventStatus} />}
          </div>

          {/* Countdown Timer */}
          <div className="absolute top-4 right-4 z-30">
            {!eventStatus && (
              <CountdownTimer startDate={event.attributes.start_date} />
            )}
          </div>

          {/* Event Image - Keep existing aspect ratio */}
          <div className="aspect-[16/9] relative group">
            <Image
              src={event.attributes.image.data.attributes.url}
              alt={event.attributes.name}
              fill
              className="object-cover transition-all duration-700 group-hover:brightness-110"
              onLoad={handleImageLoad}
              priority
              sizes="(max-width: 768px) 92vw, (max-width: 1024px) 70vw, (max-width: 1280px) 50vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent overflow-hidden" />
          </div>

          {/* Event Details - Optimized padding and layout */}
          <div className="relative p-4 md:p-6">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-creep text-orange-200 mb-2 md:mb-3">
              {event.attributes.name}
            </h3>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2 md:space-y-3">
                {/* Date & Time */}
                <div className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                  <span>
                    {
                      formatDateFromString(event.attributes.start_date)
                        .formattedDate
                    }
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                  <span>
                    {event.attributes.address || "Location to be announced"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {event.attributes?.description ||
                    "More details coming soon..."}
                </p>

                {/* Action Buttons - Adjusted spacing */}
                <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-3">
                  <motion.a
                    href={event.attributes.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 md:px-6 py-1.5 md:py-2 bg-orange-600 hover:bg-orange-700 rounded-full 
                             font-semibold transition-all duration-300 text-white text-xs md:text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.a>
                  <div className="flex items-center gap-1 md:gap-2">
                    <CopyButton
                      address={event.attributes.address}
                      variant="orange"
                    />
                    <CalendarButton event={event} variant="orange" />
                    <ShareButton event={event} variant="orange" />
                  </div>
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
