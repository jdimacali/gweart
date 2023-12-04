"use client";

import Spin from "@/components/Spin";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Events {
  id: number;
  attributes: {
    url: string;
    // Add other attributes as needed
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
    <section className="h-full w-full bg-gray-800 flex flex-col items-center">
      <div className="w-full h-full bg-cover pb-40">
        <div className="flex flex-col items-center justify-center w-full my-10 gap-y-4 pb-4">
          <h1
            className="text-7xl font-bold text-white text-center"
            style={{ textShadow: "3px 3px  #a5a4a4" }}
          >
            Upcoming Events
          </h1>
          <h1 className="text-3xl font-bold opacity-80 text-white text-center">
            You can find me at these events!
          </h1>
        </div>{" "}
        {loading && !events && <Spin />}
        {!loading && events && (
          <div className="flex flex-wrap mt-10 items-center justify-center gap-10 mx-16">
            {events.map((event) => (
              <Link
                target="_blank"
                key={event.attributes.url}
                href={event.attributes.url}
                className="relative max-sm:h-[30rem] h-[40rem] max-sm:w-[30rem] w-[40rem] "
              >
                <Image
                  src={`${API_URL}${event.attributes.image.data.attributes.url}`}
                  alt={`${API_URL}${event.attributes.image.data.attributes.url}`}
                  fill
                  className="object-contain hover:scale-110 transition-transform animate-in"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
