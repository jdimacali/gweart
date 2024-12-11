"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Spin from "@/components/Spin";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  url: string;
  image: {
    data: {
      id: number;
      attributes: {
        formats: {
          small: {
            url: string;
          };
        };
      };
    };
  };
}

interface SlidesProps {
  onLoad?: () => void;
  hideSpinner?: boolean;
}

const Slides = ({ onLoad, hideSpinner }: SlidesProps) => {
  useEffect(() => {
    // Call onLoad when the slideshow is ready
    onLoad?.();
  }, [onLoad]);
  const [slides, setSlides] = useState<Slide[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("/api/slides");
        setSlides(response.data.attributes.slides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  if (loading && !hideSpinner) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full overflow-visible"
    >
      <Swiper
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        spaceBetween={20}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-[110vw] -ml-[5vw] [&_.swiper-pagination-bullet]:bg-red-500 
                  [&_.swiper-pagination-bullet-active]:bg-red-300
                  [&_.swiper-button-next]:text-red-300 
                  [&_.swiper-button-prev]:text-red-300"
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4.5 },
        }}
      >
        <AnimatePresence>
          {slides?.map((slide, index) => (
            <SwiperSlide key={index} className="lg:py-8">
              <Link
                href={slide.url || "/"}
                className="block relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="relative aspect-square p-3 w-[92%] md:w-[90%] lg:w-full lg:h-full mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-red-900/30 to-black/40 "
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg bg-zinc-900/80">
                    <Image
                      src={slide.image.data.attributes.formats.small.url}
                      alt={`Slide ${index + 1}`}
                      fill
                      priority
                      quality={100}
                      className="object-cover transition-all duration-500 
                               group-hover:scale-105 group-hover:brightness-110"
                      onContextMenu={(e) => e.preventDefault()}
                      sizes="(max-width: 320px) 240px,
                             (max-width: 640px) 280px,
                             (max-width: 1024px) 260px,
                             260px"
                    />
                    {/* Spooky overlay effect on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        background:
                          "linear-gradient(to top, rgba(185, 28, 28, 0.3), transparent)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10"
                    />
                  </div>
                  {/* Glowing border effect */}
                  <div
                    className="absolute inset-0 rounded-xl ring-2 ring-red-500/20 
                              group-hover:ring-red-400/60 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]
                              transition-all duration-300"
                  />
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </AnimatePresence>
      </Swiper>
    </motion.div>
  );
};

export default Slides;
