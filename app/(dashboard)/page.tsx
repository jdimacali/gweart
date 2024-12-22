"use client";

import dynamic from "next/dynamic";
import SpooktacularGoodies from "./_sections/SpooktacularGoodies/SpooktacularGoodies";
import FeaturedEvent from "./_sections/FeaturedEvent/FeaturedEvent";
import Divider from "./components/Divider";
import AboutMe from "./_sections/AboutMe/AboutMe";

// Lazy load the SlideShow component
const Originals = dynamic(() => import("./_sections/Originals/Originals"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <SpooktacularGoodies />
      <Divider />
      <Originals />
      <Divider />
      <AboutMe />
      <Divider />
      <FeaturedEvent />
    </main>
  );
}
