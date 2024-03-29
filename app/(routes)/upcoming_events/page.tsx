"use client";

import Spin from "@/components/Spin";
import { API_URL, formatDateFromString } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import Header from "./components/Header";
import { ArrowUpRight } from "lucide-react";
import Slime from "./components/Slime";

interface Events {
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
    <section className="h-full w-full text-white bg-zinc-800 flex flex-col items-center justify-center pb-40 mt-0">
      <Slime>
        <Header />
      </Slime>
      <div className="w-full h-full pb-20 mt-40 md:mt-[15rem]">
        {loading ? (
          <div className="flex pt-80 items-center justify-center">
            <Spin />
          </div>
        ) : events && events.length > 0 ? (
          <div className="mt-[5rem] md:mt-[7rem] h-full w-full mb-20 grid sm:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 max-sm:gap-y-[12rem] md:gap-y-[10rem] items-center justify-center justify-items-center">
            {events
              .sort((a, b) => {
                let da = new Date(a.attributes.start_date).getTime(); // Convert to milliseconds
                let db = new Date(b.attributes.start_date).getTime(); // Convert to milliseconds
                return da - db; // Compare numerically
              })
              .map((event) => (
                <div
                  key={event.id}
                  className="h-[15rem] w-[22.5rem] md:h-[20rem] md:w-[30rem] rounded-b m-4"
                >
                  <a
                    href={event.attributes.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-full h-full relative overflow-hidden shadow-lg">
                      <Image
                        src={event.attributes.image.data.attributes.url}
                        alt={`${API_URL}${event.attributes.name}`}
                        fill
                        quality={100}
                        className="object-cover object-top rounded-t-xl hover:scale-110 transition-all duration-500 ease-in-out transform"
                      />
                    </div>
                    <div className="shadow-2xl flex flex-col h-auto w-full gap-y-1 p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-600">
                      <h1 className="text-xl md:text-2xl font-[600] opacity-90 mt-2 ">
                        {event.attributes.name}
                      </h1>
                      <div className="text-md font-semibold text-gray-300">
                        <span className="mr-2">
                          {
                            formatDateFromString(event.attributes.start_date)
                              .formattedDate
                          }
                        </span>
                        {event.attributes?.end_date && (
                          <span>
                            -{"  "}
                            <span className="ml-1">
                              {
                                formatDateFromString(event.attributes?.end_date)
                                  .formattedDate
                              }
                            </span>
                          </span>
                        )}
                      </div>
                      <h1 className="text-sm opacity-60">
                        {event.attributes.address}
                      </h1>
                      <div className="hidden sm:block">
                        <ArrowUpRight
                          height={60}
                          width={60}
                          className="absolute bottom-0 right-0 p-4"
                        />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex pt-80 items-center justify-center">
            There are no events at this time. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
