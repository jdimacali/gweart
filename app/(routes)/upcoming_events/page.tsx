"use client";

import Spin from "@/components/Spin";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import Header from "./components/Header";
import Slime from "./components/Slime";
import EventCard from "./components/EventCard";

export interface Events {
  id: number;
  attributes: {
    url: string;
    name: string;
    address: string;
    start_date: string;
    end_date?: string;
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

export const revalidate = 0;

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
  const [events, setEvents] = useState<Events[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const getDashboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    getDashboard();
  }, []);

  return (
    <section className="min-h-screen w-full text-white bg-gradient-to-b from-zinc-900 via-purple-950/20 to-zinc-900 flex flex-col items-center justify-center pb-40 mt-0">
      <Slime>
        <Header />
      </Slime>
      <div className="w-full h-full pb-20 mt-40 md:mt-[15rem] relative px-4 md:px-8 lg:px-16">
        {loading ? (
          <div className="flex pt-80 items-center justify-center">
            <Spin />
          </div>
        ) : events && events.length > 0 ? (
          <div className="mt-[5rem] md:mt-[7rem] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 max-w-[2000px] mx-auto">
            {sortEventsByProximity(events).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex pt-80 items-center justify-center font-creep text-2xl text-red-500">
            No events lurking in the shadows... Check back soon!
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
