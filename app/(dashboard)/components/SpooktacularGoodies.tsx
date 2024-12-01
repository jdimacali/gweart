"use client";

import Title from "./Title";
import DashboardImages from "./DashboardImages";
import DashboardGhost from "./DashboardGhost";
import { useEffect, useState } from "react";
import axios from "axios";
import Spin from "@/components/Spin";
import Image from "next/image";
import clsx from "clsx";
import { DisplayText } from "@/types";
import { motion } from "framer-motion";

interface Data {
  title: DisplayText;
  subtitle: DisplayText;
  imageUrls: string[];
  button: DisplayText;
}

export const revalidate = 0;

const SpooktacularGoodies = () => {
  const [data, setData] = useState<Data | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    getDashboard();
  }, []);

  return (
    <section
      className={clsx(
        "w-full relative bg-gradient-to-b from-violet-800/40 to-violet-800/60",
        !loading && data ? "h-full" : "h-[800px]"
      )}
    >
      <DashboardGhost />

      {/* Spider Web Decoration */}
      <Image
        src="/web.png"
        width={900}
        height={900}
        className="absolute top-0 -left-3 opacity-30"
        priority
        alt="web"
      />

      {/* Loading State */}
      {loading && !data && (
        <div className="flex justify-center w-full h-full items-center">
          <Spin />
        </div>
      )}

      {/* Content */}
      {!loading && data && (
        <div className="flex max-md:flex-col justify-center text-center items-center lg:py-[8rem] pt-12 gap-x-20">
          <div className="flex flex-col items-center">
            {/* GWEART Header */}
            <motion.div
              className="mb-12 flex flex-col items-center gap-x-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-x-3">
                <h1 className="font-creep text-6xl md:text-7xl text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  GWEART
                </h1>
                <Image
                  src="/icon/gwe.png"
                  width={40}
                  height={40}
                  alt="logo"
                  className="object-contain brightness-0 opacity-70"
                  priority
                />
              </div>
              <p className="text-lg md:text-xl text-gray-300 tracking-[0.2em] mt-1 font-semibold">
                Girl Wonder Extraordinaire
              </p>
            </motion.div>

            <Title
              title={data?.title}
              subtitle={data?.subtitle}
              button={data?.button}
            />
          </div>
          <DashboardImages images={data?.imageUrls} />
        </div>
      )}
    </section>
  );
};

export default SpooktacularGoodies;
