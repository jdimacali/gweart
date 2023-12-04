"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LinktreeLink from "./components/LinktreeLink";
import axios from "axios";
import { useState, useEffect } from "react";
import Spin from "@/components/Spin";

interface SocialLink {
  id: number;
  attributes: {
    name: string;
    url: string;
    // Add other attributes as needed
  };
}

const Page = () => {
  const [socials, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const social = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ data: SocialLink[] }>(
          "/api/linktree"
        );
        setSocialLinks(response.data.data);
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
      <div className="bg-[url('../public/background/bg3.png')] w-full h-full bg-cover bg-clip-padding bg-fixed bg-blend-overlay bg-gray-950  bg-opacity-50 pb-[20rem]">
        <div className="flex flex-col justify-center items-center w-full">
          <Avatar className="mt-10 h-[65px] w-[65px]">
            <AvatarImage src="./icon/gweart.jpg" />
            <AvatarFallback className="text-white"> Gwe </AvatarFallback>
          </Avatar>
          <h1 className="text-white font-semibold text-3xl">GweArt</h1>
        </div>
        <div className="flex flex-col items-center text-center justify-center text-black gap-y-10 mt-8">
          {loading ? (
            <Spin />
          ) : (
            socials.map((social) => (
              <LinktreeLink key={social.id} social={social} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
export default Page;
