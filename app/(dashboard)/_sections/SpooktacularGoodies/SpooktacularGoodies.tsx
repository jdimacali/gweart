"use client";

import Title from "./components/Title";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Spin from "@/components/Spin";
import Image from "next/image";
import { DisplayText } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import HauntedHouse with no SSR to improve initial load
const HauntedHouse = dynamic(() => import("./components/HauntedHouse"), {
  ssr: false,
  loading: () => null,
});

interface Data {
  title: DisplayText;
  subtitle: DisplayText;
  imageUrls: string[];
  button: DisplayText;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const revalidate = 0;

// Color palette constants
const colors = {
  primary: {
    base: "rgb(147, 51, 234)", // Purple-600
    light: "rgb(168, 85, 247)", // Purple-500
    dark: "rgb(126, 34, 206)", // Purple-700
    glow: "rgba(147, 51, 234, 0.3)", // Purple glow
    intense: "rgba(168, 85, 247, 0.5)", // Intense purple glow
  },
  neutral: {
    white: "rgb(255, 255, 255)",
    glow: "rgba(255, 255, 255, 0.3)",
  },
  background: {
    primary: "rgba(88, 28, 135, 0.9)", // Purple-800
    secondary: "rgba(76, 29, 149, 0.6)", // Purple-900
    overlay: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    primary: "rgb(243, 232, 255)", // Purple-50
    secondary: "rgb(233, 213, 255)", // Purple-100
    dark: "rgb(192, 132, 252)", // Purple-400
  },
};

const SpooktacularGoodies = () => {
  const [data, setData] = useState<Data | undefined>();
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        // Add a minimum loading time to prevent flash
        const [response] = await Promise.all([
          axios.get("/api/dashboard"),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getDashboard();
  }, []);

  const handleModelLoad = () => {
    setModelLoaded(true);
  };

  return (
    <section
      className="w-full h-[90vh] relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${colors.background.primary}, ${colors.background.secondary})`,
      }}
    >
      <div className="relative h-full">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 30% 30%, ${colors.primary.glow}, transparent 60%)`,
              `radial-gradient(circle at 70% 70%, ${colors.primary.glow}, transparent 60%)`,
              `radial-gradient(circle at 30% 30%, ${colors.primary.glow}, transparent 60%)`,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Model loading state */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <HauntedHouse onLoad={handleModelLoad} hideSpinner />
          </Suspense>
          <AnimatePresence>
            {!modelLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backgroundColor: colors.background.overlay }}
                className="absolute inset-0 flex justify-center items-center backdrop-blur-sm"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Spin />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {data && !isLoading && (
            <motion.div
              className="flex flex-col items-center justify-center w-full z-30 pt-16 relative"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 backdrop-blur-[4px] rounded-b-lg"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              />

              <div className="relative z-20 flex flex-col items-center w-full px-4 max-w-4xl mx-auto">
                <motion.div
                  className="flex gap-4 justify-center"
                  variants={scaleIn}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.h1
                    className="font-creep text-6xl lg:text-7xl transition-all duration-300"
                    style={{
                      color: colors.text.primary,
                      textShadow: `
                        0 0 20px ${colors.primary.glow},
                        0 0 40px ${colors.primary.glow},
                        0 0 80px ${colors.primary.glow}
                      `,
                    }}
                    whileHover={{
                      color: colors.text.dark,
                      textShadow: `
                        0 0 20px ${colors.primary.intense},
                        0 0 40px ${colors.primary.intense},
                        0 0 80px ${colors.primary.intense}
                      `,
                    }}
                  >
                    GWE_ART
                  </motion.h1>
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 10,
                      filter:
                        "brightness(1.2) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="/icon/gwe.png"
                      width={70}
                      height={70}
                      alt="logo"
                      className="object-contain transition-all duration-300"
                      priority
                    />
                  </motion.div>
                </motion.div>

                <motion.p
                  className="text-lg md:text-xl tracking-[0.2em] mt-1 font-mania"
                  style={{ color: colors.text.secondary }}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Girl Wonder Extraordinaire
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-2"
                >
                  <Title button={data?.button} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Initial loading state */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ backgroundColor: colors.background.primary }}
              className="absolute inset-0 flex items-center justify-center z-50"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Spin />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SpooktacularGoodies;
