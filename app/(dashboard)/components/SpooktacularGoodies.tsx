"use client";

import Title from "./Title";
import { useEffect, useState } from "react";
import axios from "axios";
import Spin from "@/components/Spin";
import Image from "next/image";

import { DisplayText } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
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
  const [loading, setLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };
    getDashboard();
  }, []);

  const handleModelLoad = () => {
    setModelLoaded(true);
    setLoading(false);
  };

  return (
    <section className="w-full h-[90vh] relative bg-gradient-to-b from-violet-900/90 via-violet-900/60 to-violet-950/60">
      <AnimatePresence>
        {(loading || !modelLoaded) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
            className="absolute inset-0 flex justify-center items-center bg-gradient-to-b from-violet-900/90 via-violet-900/60 to-violet-950/60 z-50"
          >
            <Spin />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-full">
        <HauntedHouse onLoad={handleModelLoad} hideSpinner />

        <AnimatePresence>
          {!loading && data && modelLoaded && (
            <motion.div
              className="flex flex-col items-center justify-center w-full z-10 pt-16 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="absolute inset-0 backdrop-blur-[4px] bg-black/30 rounded-b-lg" />

              <div className="relative z-20 flex flex-col items-center w-full">
                <motion.div
                  className="flex gap-4 justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
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
                </motion.div>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 tracking-[0.2em] mt-1 font-mania"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Girl Wonder Extraordinaire
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Title button={data?.button} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SpooktacularGoodies;
