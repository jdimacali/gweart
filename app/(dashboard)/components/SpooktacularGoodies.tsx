import Title from "./Title";
import DashboardImages from "./DashboardImages";
import DashboardGhost from "./DashboardGhost";
import Image from "next/image";
import clsx from "clsx";
import { Dashboard } from "@/types";

interface SpooktacularGoodiesProps {
  dashboard: Dashboard;
}

const SpooktacularGoodies = ({ dashboard }: SpooktacularGoodiesProps) => {
  return (
    <section
      className={clsx(
        `relative w-full h-full bg-violet-950  bg-gradient-to-br from-violet-900/40 from-15% to-violet-950 to-15% xl:py-20 pt-20 md:pt-10`
      )}
    >
      <DashboardGhost />
      <Image
        src="/assets/web.png"
        width={800}
        height={800}
        priority
        className="w-auto lg:w-[50rem] xl:w-[60rem] h-auto absolute top-0 -left-3 blur-[4px] lg:blur-0"
        alt="web"
      />
      {dashboard && (
        <div className=" w-full h-full flex flex-col md:flex-row justify-center items-center text-center md:pl-20 xl:pl-0 md:py-[4rem] lg:py-[8rem] pt-4 gap-y-10 md:gap-x-4 lg:gap-x-10 xl:gap-x-40 pb-10">
          <Title
            title={dashboard.Title}
            subtitle={dashboard.Subtitle}
            button={dashboard.Button_Text}
          />
          <DashboardImages images={dashboard.Images} />
        </div>
      )}
    </section>
  );
};

export default SpooktacularGoodies;
