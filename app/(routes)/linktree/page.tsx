"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useState, useEffect } from "react";
import Spin from "@/components/Spin";
import clsx from "clsx";
import LinktreeLink from "./components/LinktreeLink";

interface SocialLink {
  Title: string;
  Subtitle: string;
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
    <section className="h-full w-full flex flex-col items-center pb-">
      <div
        className={clsx(
          "bg-[url('../public/background/bg3.png')] w-full h-full bg-cover bg-clip-padding bg-fixed bg-blend-overlay bg-gray-950 bg-opacity-10 dark:bg-opacity-50 pb-[20rem]"
        )}
      >
        <div className="flex flex-col justify-center items-center w-full">
          <Avatar className="mt-10 h-[65px] w-[65px]">
            <AvatarImage src="./icon/gweart.jpg" />
            {socials?.Title}
            <AvatarFallback>GweArt</AvatarFallback>
          </Avatar>
          <h1 className="text-white font-semibold text-3xl">GweArt</h1>
          <h1 className="text-white font-semibold text-xl opacity-60">
            {socials?.Subtitle}
          </h1>
        </div>
        <div className="flex flex-col items-center text-center justify-center text-black gap-y-10 mt-8">
          {loading ? (
            <Spin />
          ) : !socials ? (
            <div> There are no links currently </div>
          ) : (
            socials.Links.map((social) => (
              <LinktreeLink
                key={social.id}
                name={social.name}
                url={social.url}
                icon={social.icon}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
export default Page;
