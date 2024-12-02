"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Spin from "@/components/Spin";
import clsx from "clsx";
import LinktreeLink from "./components/LinktreeLink";
import { DisplayText } from "@/types";
import { getFonts } from "@/lib/utils";

interface SocialLink {
  Title: DisplayText;
  Subtitle: DisplayText;
  Links: { id: number; name: string; url: string; icon?: string }[];
}

const Page = () => {
  const [socials, setSocialLinks] = useState<SocialLink>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const social = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/linktree");
        setSocialLinks(response.data.attributes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    social();
  }, []);

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-zinc-950 to-zinc-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/background/bg3.png')] bg-cover bg-fixed opacity-50 blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 to-purple-950/20 brightness-200" />

      {/* Animated background effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-1/2 w-[500px] h-[500px] bg-lime-800/10 rounded-full blur-3xl "
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        className="absolute bottom-1/4 -right-1/2 w-[500px] h-[500px] bg-lime-800/10 rounded-full blur-3xl"
      />

      <div className="container max-w-2xl mx-auto px-4 py-20 relative">
        {/* Profile section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar
              className="mx-auto h-24 w-24 border-4 border-lime-500/70 
                             shadow-[0_0_25px_rgba(136, 209, 27, 0.3)] transition-shadow duration-300
                             hover:shadow-[0_0_35px_rgba(132,204,22,0.5)]"
            >
              <AvatarImage
                src="./icon/gwe.png"
                className="pointer-events-none"
                onContextMenu={(e) => e.preventDefault()}
              />
              <AvatarFallback>GWE_ART</AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.h1
            className={clsx(
              "font-creep text-4xl text-lime-300 mt-6 drop-shadow-[0_0_8px_rgba(132,204,22,0.4)]",
              socials?.Title.Font.options &&
                getFonts(socials?.Title.Font.options)
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {socials?.Title.text}
          </motion.h1>

          <motion.p
            className={clsx(
              "text-gray-400 mt-2 font-medium tracking-wide",
              socials?.Subtitle.Font.options &&
                getFonts(socials?.Subtitle.Font.options)
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {socials?.Subtitle.text}
          </motion.p>
        </motion.div>

        {/* Links section with staggered animation */}
        <motion.div
          className="space-y-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6,
              },
            },
          }}
        >
          {loading ? (
            <Spin />
          ) : !socials ? (
            <div className="text-gray-400 text-center">No links available</div>
          ) : (
            socials.Links.map((social) => (
              <motion.div
                key={social.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <LinktreeLink
                  name={social.name}
                  url={social.url}
                  icon={social.icon}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
