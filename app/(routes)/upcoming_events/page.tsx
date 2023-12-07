"use client";

import Spin from "@/components/Spin";
import { API_URL, formatDateFromString } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { easeIn, motion } from "framer-motion";

interface Events {
  id: number;
  attributes: {
    url: string;
    name: string;
    address: string;
    start_date: string;
    end_date: string;
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

const Page = () => {
  const [events, setEvents] = useState<Events[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    <section className="h-full w-full bg-zinc-200 text-black dark:text-white dark:bg-gray-800 flex flex-col items-center justify-center">
      <div className="w-full h-full bg-cover pb-20 sm:pb-40 z-[1]">
        <div className="flex flex-col items-center justify-center w-full my-5 gap-y-2 pb-2 sm:my-10 sm:gap-y-4 sm:pb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-shadow-black">
            Upcoming Events
          </h1>
          <h1 className="text-lg sm:text-2xl font-bold opacity-80 text-center">
            You can find me at these events!
          </h1>
        </div>
        {loading && !events && <Spin />}
        {!loading && events && (
          <div className="h-full w-full mb-20 grid sm:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-3 max-sm:gap-y-[10rem] max-lg:gap-y-[10rem] lg:gap-y-[10rem] items-center justify-items-center">
            {events.map((event) => (
              <div key={event.id} className="h-[25rem] w-[35rem]">
                <Link target="_blank" href={event.attributes.url}>
                  <div className="w-full h-full relative overflow-hidden">
                    <Image
                      src={`${API_URL}${event.attributes.image.data.attributes.url}`}
                      alt={`${API_URL}${event.attributes.name}`}
                      fill
                      quality={100}
                      className="object-cover object-top rounded-t-xl hover:scale-110 transition-all duration-500 ease-in-out transform"
                    />
                  </div>
                  <div className="flex flex-col h-auto w-full gap-y-1 p-2 sm:p-4 ">
                    <h1 className="text-3xl font-[600] opacity-90 mt-2">
                      {event.attributes.name}
                    </h1>
                    <div className="md:text-lg sm:text-md font-semibold text-gray-500">
                      <span className="mr-2">
                        {formatDateFromString(event.attributes.start_date)}
                      </span>
                      -
                      <span className="ml-2">
                        {formatDateFromString(event.attributes.end_date)}
                      </span>
                    </div>
                    <h1 className=" md:text-lg sm:text-md  font-semibold opacity-60">
                      {event.attributes.address}
                    </h1>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
