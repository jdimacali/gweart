"use client";

import dynamic from "next/dynamic";
import SpooktacularGoodies from "./components/SpooktacularGoodies";
import FeaturedEvent from "./components/FeaturedEvent";
import Divider from "./components/Divider";
import AboutMe from "./components/AboutMe";

// Lazy load the SlideShow component
const Originals = dynamic(() => import("./components/Originals"), {
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
