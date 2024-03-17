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
        `w-full  bg-violet-950  
      max-md:pt-20 gap-x-20 relative bg-gradient-to-br from-violet-900/40 from-15% to-violet-950 to-15%`,
        !loading && data ? "h-full" : "h-[800px]"
      )}
    >
      <DashboardGhost />
      <Image
        src="/web.png"
        width={900}
        height={900}
        className="absolute top-0 -left-3"
        priority
        alt="web"
      />
      {loading && !data && (
        <div className="flex justify-center w-full h-full items-center">
          <Spin />
        </div>
      )}
      {!loading && data && (
        <>
          <div className=" flex max-md:flex-col justify-center text-center items-center lg:py-[8rem] pt-4 gap-x-20">
            <Title
              title={data?.title}
              subtitle={data?.subtitle}
              button={data?.button}
            />
            <DashboardImages images={data?.imageUrls} />
          </div>
        </>
      )}
    </section>
  );
};
export default SpooktacularGoodies;
