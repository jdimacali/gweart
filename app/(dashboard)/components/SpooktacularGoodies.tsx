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
      className={
        "w-full h-[900px]  bg-violet-950 flex max-sm:flex-col justify-center text-center items-center max-sm:pt-20 gap-x-20 relative bg-gradient-to-br from-violet-900/40 from-15% to-violet-950 to-15% "
      }
    >
      <DashboardGhost />
      <Web />
      {loading && !data && <Spin />}
      {!loading && data && (
        <>
          <Title title={data?.title} subtitle={data?.subtitle} />
          <DashboardImages images={data?.imageUrls} />
        </>
      )}
    </section>
  );
};
export default SpooktacularGoodies;