"use client";

import dynamic from "next/dynamic";
import SpooktacularGoodies from "./components/SpooktacularGoodies";
import AboutMe from "./components/AboutMe";

// Lazy load the SlideShow component
const SlideShow = dynamic(() => import("./components/Slideshow"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <SpooktacularGoodies />
      <SlideShow />
      <AboutMe />
    </main>
  );
}
