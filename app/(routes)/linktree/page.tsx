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
    <section className="min-h-screen w-full bg-gradient-to-b from-zinc-950 to-purple-950/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/background/bg3.png')] bg-cover bg-fixed opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 to-purple-950/50" />

      {/* Purple glow effects */}
      <div className="absolute top-1/4 -left-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container max-w-2xl mx-auto px-4 py-20 relative">
        {/* Profile section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Avatar className="mx-auto h-24 w-24 border-4 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <AvatarImage
              src="./icon/gwe.png"
              className="pointer-events-none"
              onContextMenu={(e) => e.preventDefault()}
            />
            <AvatarFallback>GWE</AvatarFallback>
          </Avatar>

          <motion.h1
            className={clsx(
              "font-creep text-4xl text-purple-300 mt-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]",
              socials?.Title.Font.options &&
                getFonts(socials?.Title.Font.options)
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {socials?.Title.text}
          </motion.h1>

          <motion.p
            className={clsx(
              "text-gray-400 mt-2 font-medium tracking-wide",
              socials?.Subtitle.Font.options &&
                getFonts(socials?.Subtitle.Font.options)
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {socials?.Subtitle.text}
          </motion.p>
        </motion.div>

        {/* Links section */}
        <div className="space-y-4 relative z-10">
          {loading ? (
            <Spin />
          ) : !socials ? (
            <div className="text-gray-400 text-center">No links available</div>
          ) : (
            socials.Links.map((social, i) => (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                <LinktreeLink
                  name={social.name}
                  url={social.url}
                  icon={social.icon}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
