"use client";

import { Events } from "@/app/(routes)/upcoming_events/page";
import { motion } from "framer-motion";
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
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import axios from "axios";

const FeaturedEvent = () => {
  const [event, setEvent] = useState<Events | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Fetch event logic with error handling
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
        setHasError(true);
      } finally {
        setTimeout(() => setLoading(false), 100);
      }
    };

    getNextEvent();
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Loading state
  if (loading) {
    return (
      <section className="w-full min-h-[800px] flex items-center justify-center bg-gradient-to-b from-zinc-950 via-orange-900/20 to-zinc-950">
        <Spin />
      </section>
    );
  }

  // No events or error state
  if (!event || hasError) {
    return (
      <section className="w-full min-h-[800px] flex items-center justify-center bg-gradient-to-b from-zinc-950 via-orange-900/20 to-zinc-950">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div className="flex flex-col items-center gap-6">
              <span className="text-orange-500/80 uppercase tracking-[0.2em] text-sm font-medium">
                Stay Tuned
              </span>
              <h2 className="font-creep text-4xl sm:text-5xl md:text-6xl text-orange-300 drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]">
                No Events Yet
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                {hasError
                  ? "Oops! Something went wrong while fetching events. Please try again later."
                  : "No upcoming events at the moment. Check back soon for exciting new events!"}
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-[2px] max-w-[350px] mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
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
      className="w-full h-fit max-h-screen flex items-center justify-center py-20 relative overflow-hidden bg-gradient-to-b from-zinc-950 via-orange-900/20 to-zinc-950"
    >
      {/* Original Background Elements */}
      <motion.div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <Image
          src="/assets/web.png"
          width={1200}
          height={1200}
          alt="web"
          className="absolute top-[-10%] left-[-10%] opacity-[0.045] blur-[1px] object-contain"
          priority
        />
        <Image
          src="/assets/web.png"
          width={1000}
          height={1000}
          alt="web"
          className="absolute bottom-[0%] right-[-5%] opacity-[0.025] rotate-180 blur-[1px] object-contain"
          priority
        />
      </motion.div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div className="flex flex-col items-center gap-3">
            <span className="text-orange-500/80 uppercase tracking-[0.2em] text-base font-medium">
              Don&apos;t miss out
            </span>
            <h2 className="font-creep text-4xl sm:text-5xl md:text-6xl text-orange-300 drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]">
              Featured Event
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] max-w-[350px] mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Event Card with Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-black/40 backdrop-blur-sm rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          {/* Left Column - Image */}
          <div className="relative rounded-2xl overflow-hidden group aspect-[4/3] md:aspect-[7/8]">
            <Image
              src={event.attributes.image.data.attributes.url}
              alt={event.attributes.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              onLoad={handleImageLoad}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

            {/* Status Badges */}
            <div className="absolute top-4 right-4 z-30">
              {eventStatus && <EventStatusBadge status={eventStatus} />}
            </div>

            {/* Countdown Timer */}
            <div className="absolute top-4 left-4 z-30">
              <CountdownTimer startDate={event.attributes.start_date} />
            </div>
          </div>

          {/* Right Column - Event Details */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-creep text-orange-200">
                {event.attributes.name}
              </h3>

              {/* Date & Time with enhanced styling */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="font-medium text-base">
                      {
                        formatDateFromString(event.attributes.start_date)
                          .formattedDate
                      }
                    </p>
                    <p className="text-sm text-gray-400">
                      {event.attributes.start_time || "Time TBA"}
                    </p>
                  </div>
                </div>

                {/* Location with map link */}
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="font-medium text-base">
                      {event.attributes.venue || "Venue TBA"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {event.attributes.address || "Address TBA"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-base line-clamp-3">
                  {event.attributes?.description ||
                    "More details coming soon..."}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-900/20 rounded-xl p-4">
                  <p className="text-orange-300 font-medium mb-1">Price</p>
                  <p className="text-gray-300">
                    {event.attributes.price || "Free Entry"}
                  </p>
                </div>
                <div className="bg-orange-900/20 rounded-xl p-4">
                  <p className="text-orange-300 font-medium mb-1">Category</p>
                  <p className="text-gray-300">
                    {event.attributes.category || "Special Event"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.a
                href={event.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 rounded-full 
                         font-semibold transition-all duration-300 text-white flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See More
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <div className="flex items-center gap-3">
                <CopyButton
                  address={event.attributes.address}
                  variant="orange"
                />
                <CalendarButton event={event} variant="orange" />
                <ShareButton event={event} variant="orange" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEvent;
