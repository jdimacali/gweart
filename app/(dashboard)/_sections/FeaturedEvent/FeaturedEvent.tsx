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
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import axios from "axios";

// Helper function to format price
const formatPrice = (price: number | null) => {
  if (!price) return "Free Entry";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

// Helper function to convert to title case
const toTitleCase = (str: string | number | null) => {
  if (!str) return "";
  return String(str)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Helper function to convert military time to AM/PM
const formatTime = (time: string | number | null) => {
  if (!time) return "";
  const timeStr = String(time);
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

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

  // Format times
  const startTime = event?.attributes?.start_time
    ? formatTime(event.attributes.start_time)
    : null;
  const endTime = event?.attributes?.end_time
    ? formatTime(event.attributes.end_time)
    : null;

  return (
    <section
      ref={sectionRef}
      className="w-full flex items-center justify-center pt-12 pb-12 sm:py-20 md:py-24 
                 relative overflow-hidden bg-gradient-to-b from-zinc-950 via-orange-900/20 to-zinc-950"
    >
      {/* Content Container */}
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Title Section - reduce spacing on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <motion.div className="flex flex-col items-center gap-2 sm:gap-3">
            <span className="text-orange-500/80 uppercase tracking-[0.2em] text-sm sm:text-base font-medium">
              Don&apos;t miss out
            </span>
            <h2
              className="font-creep text-3xl sm:text-4xl md:text-5xl  text-orange-300 
                           drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]"
            >
              Featured Event
            </h2>
          </motion.div>
        </motion.div>

        {/* Event Card - reduce padding and spacing on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: imageLoaded ? 1 : 0, y: imageLoaded ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 
                     bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl 
                     p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden"
        >
          {/* Left Column - Image */}
          <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden group 
                aspect-[16/9] sm:aspect-[16/12] md:aspect-[7/8] 
                max-h-[250px] sm:max-h-none"
          >
            <Image
              src={event.attributes.image.data.attributes.url}
              alt={event.attributes.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
              onLoad={handleImageLoad}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

            {/* Status Badges - adjust positioning */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-30">
              {eventStatus && <EventStatusBadge status={eventStatus} />}
            </div>

            {/* Countdown Timer - adjust positioning */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-30">
              <CountdownTimer startDate={event.attributes.start_date} />
            </div>
          </div>

          {/* Right Column - Event Details */}
          <div className="flex flex-col justify-between h-full space-y-3 sm:space-y-4 md:space-y-6">
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-creep text-orange-200">
                {event.attributes.name}
              </h3>

              {/* Date & Time with enhanced styling */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
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
                      {startTime
                        ? `${startTime}${endTime ? ` - ${endTime}` : ""}`
                        : "Time TBA"}
                    </p>
                  </div>
                </div>

                {/* Location with map link */}
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="font-medium text-base">
                      {event.attributes.venue
                        ? toTitleCase(event.attributes.venue)
                        : "Venue TBA"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {event.attributes.address
                        ? toTitleCase(event.attributes.address)
                        : "Address TBA"}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base line-clamp-3">
                  {event.attributes?.short_description ||
                    event.attributes?.description ||
                    "More details coming soon..."}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <div className="bg-orange-900/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                  <p className="text-orange-300 font-medium mb-0.5 sm:mb-1 text-sm sm:text-base">
                    Price
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {formatPrice(event.attributes.price)}
                  </p>
                </div>
                <div className="bg-orange-900/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4">
                  <p className="text-orange-300 font-medium mb-0.5 sm:mb-1 text-sm sm:text-base">
                    Category
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {event.attributes.category
                      ? toTitleCase(event.attributes.category)
                      : "Special Event"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
              <motion.a
                href={event.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-3 sm:px-4 md:px-6 py-2 bg-orange-600 
                         hover:bg-orange-700 rounded-full text-sm sm:text-base font-semibold 
                         transition-all duration-300 text-white 
                         flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See More
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.a>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center">
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
