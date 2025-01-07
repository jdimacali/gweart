"use client";

import Spin from "@/components/Spin";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import Slime from "./components/Slime";
import EventCard from "./components/EventCard";

export interface Events {
  id: number;
  attributes: {
    description?: string;
    url: string;
    name: string;
    address: string;
    start_date: string;
    start_time: number; // Added start_time
    end_time: number;
    end_date?: string;
    price: number; // Added price
    venue: string; // Added venue
    category: string; // Added category
    short_description: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}

export const revalidate = 100;

const sortEventsByProximity = (events: Events[]) => {
  const now = new Date();

  return events.sort((a, b) => {
    const startA = new Date(a.attributes.start_date);
    const startB = new Date(b.attributes.start_date);
    const endA = a.attributes.end_date
      ? new Date(a.attributes.end_date)
      : startA;
    const endB = b.attributes.end_date
      ? new Date(b.attributes.end_date)
      : startB;

    // Check if events are currently happening
    const aIsHappening = now >= startA && now <= endA;
    const bIsHappening = now >= startB && now <= endB;

    if (aIsHappening && !bIsHappening) return -1;
    if (!aIsHappening && bIsHappening) return 1;
    if (aIsHappening && bIsHappening) {
      // If both are happening, sort by end date
      return endA.getTime() - endB.getTime();
    }

    // If neither is happening, sort by start date
    return startA.getTime() - startB.getTime();
  });
};

const Page = () => {
  const [events, setEvents] = useState<Events[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const getDashboard = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setEvents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    getDashboard();
  }, []);

  return (
    <section className="min-h-screen w-full text-white bg-gradient-to-b from-zinc-950 via-amber-100/10 to-zinc-950 flex flex-col items-center justify-center pb-32 mt-0">
      <Slime />
      <div className="w-full h-full mt-60 lg:mt-[20rem] relative px-4 md:px-8 lg:px-16">
        {loading ? (
          <div className="flex pt-80 items-center justify-center">
            <Spin />
          </div>
        ) : events?.length ? (
          <div className="mt-[5rem] md:mt-[7rem] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 max-w-[2000px] mx-auto">
            {sortEventsByProximity(events).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex pt-80 items-center justify-center font-creep text-2xl text-red-500 text-center">
            No events lurking in the shadows... Check back soon!
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
