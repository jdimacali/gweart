import dynamic from "next/dynamic";

import SpooktacularGoodies from "./components/SpooktacularGoodies";
const AboutMe = dynamic(() => import("./components/AboutMe"));
const SlideShow = dynamic(() => import("./components/Slideshow"));
import getSlides from "@/actions/getSlides";
import getDashboard from "@/actions/getDashboard";

const Home = async () => {
  const slides = await getSlides();
  const dashboard = await getDashboard();

  return (
    <main>
      <SpooktacularGoodies dashboard={dashboard} />
      <SlideShow slides={slides} />
      <AboutMe />
    </main>
  );
};

export default Home;
