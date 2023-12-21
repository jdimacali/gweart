"use client";

import Web from "./Web";
import Title from "./Title";
import DashboardImages from "./DashboardImages";
import DashboardGhost from "./DashboardGhost";
import { useEffect, useState } from "react";
import axios from "axios";
import Spin from "@/components/Spin";

interface Data {
  title: string;
  subtitle: string;
  imageUrls: string[];
  button: string;
}

export const revalidate = 100;

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
      className={`w-full h-full bg-violet-950  
      max-md:pt-20 gap-x-20 relative bg-gradient-to-br from-violet-900/40 from-15% to-violet-950 to-15%`}
    >
      <DashboardGhost />
      <div className="shadow-2xl shadow-black">
        <Web />
      </div>
      {loading && !data && <Spin />}
      {!loading && data && (
        <div className=" flex max-md:flex-col justify-center text-center items-center lg:py-[8rem] gap-x-20">
          <Title
            title={data?.title}
            subtitle={data?.subtitle}
            button={data?.button}
          />
          <DashboardImages images={data?.imageUrls} />
        </div>
      )}
    </section>
  );
};
export default SpooktacularGoodies;
