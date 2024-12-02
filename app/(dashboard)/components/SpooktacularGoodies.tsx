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
import HauntedHouse from "./HauntedHouse";

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
        "w-full relative bg-gradient-to-b from-violet-950/30 to-violet-900/40 ",
        !loading && data ? "h-full" : "h-[800px]"
      )}
    >
      {loading && !data && (
        <div className="flex justify-center w-full h-full items-center">
          <Spin />
        </div>
      )}
      {/* Content */}
      {!loading && data && (
        <div className="h-[90vh] relative">
          <HauntedHouse />
          <motion.div
            className="flex flex-col items-center justify-center w-full z-10 pt-16 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Add backdrop div */}
            <div className="absolute inset-0 backdrop-blur-[4px] bg-black/30 rounded-b-lg" />

            {/* Content with higher z-index */}
            <div className="relative z-20 flex flex-col items-center w-full">
              <div className="flex gap-4 justify-center">
                <h1 className="font-creep text-6xl md:text-7xl text-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  GWE_ART
                </h1>
                <Image
                  src="/icon/gwe.png"
                  width={70}
                  height={70}
                  alt="logo"
                  className="object-contain brightness-100 opacity-100"
                  priority
                />
              </div>

              <p className="text-lg md:text-xl text-gray-300 tracking-[0.2em] mt-1 font-mania">
                Girl Wonder Extraordinaire
              </p>
              <Title
                // title={data?.title}
                // subtitle={data?.subtitle}
                button={data?.button}
              />
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default SpooktacularGoodies;

{
  /* <div className="flex flex-col items-center">
          //  <div className="flex max-md:flex-col justify-center text-center items-center lg:py-[8rem] pt-12 gap-x-20">


            <Title
              title={data?.title}
              subtitle={data?.subtitle}
              button={data?.button}
            />
            //   </div>

          </div> */
}

{
  /* Spider Web Decoration */
}
// <Image
//   src="/web.png"
//   width={900}
//   height={900}
//   className="absolute top-0 -left-3 opacity-30"
//   priority
//   alt="web"
// />;
