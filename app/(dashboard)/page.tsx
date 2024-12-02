"use client";

import dynamic from "next/dynamic";
import SpooktacularGoodies from "./components/SpooktacularGoodies";
import FeaturedEvent from "./components/FeaturedEvent";
import Divider from "./components/Divider";

// Lazy load the SlideShow component
const SlideShow = dynamic(() => import("./components/Slideshow"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <SpooktacularGoodies />
      <Divider />
      <SlideShow />
      <Divider />
      <FeaturedEvent />
    </main>
  );
}
