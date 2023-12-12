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
      className={`w-full h-[900px] bg-[#F6F1EE] dark:bg-violet-950  flex max-md:flex-col justify-center text-center items-center 
      max-md:pt-20 gap-x-20 relative bg-gradient-to-br dark:from-violet-900/40 from-[#a8704b] from-15% dark:to-violet-950 to-[#ED7D31] to-15%`}
    >
      <DashboardGhost />
      <div className="shadow-2xl shadow-black">
        <Web />
      </div>
      {loading && !data && <Spin />}
      {!loading && data && (
        <>
          <Title
            title={data?.title}
            subtitle={data?.subtitle}
            button={data?.button}
          />
          <DashboardImages images={data?.imageUrls} />
        </>
      )}
    </section>
  );
};
export default SpooktacularGoodies;
