"use client";

import Web from "./Web";
import Title from "./Title";
import DashboardImages from "./DashboardImages";
import DashboardGhost from "./DashboardGhost";

const SpooktacularGoodies = () => {
  return (
    <section
      className={
        "w-full h-full pb-40 pt-[6em] bg-violet-950 flex max-sm:flex-col justify-center text-center items-center gap-x-20 relative bg-gradient-to-br from-violet-900/40 from-15% to-violet-950 to-15% "
      }
    >
      <DashboardGhost />
      <Web />
      <Title />
      <DashboardImages />
    </section>
  );
};
export default SpooktacularGoodies;
