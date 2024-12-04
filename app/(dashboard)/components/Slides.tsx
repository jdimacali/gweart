"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
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

const Slides = () => {
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

  if (loading) {
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
      className="w-[85%] sm:w-full max-w-[1600px] px-4 mt-4"
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
        spaceBetween={40}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
          bulletClass: "swiper-pagination-bullet",
        }}
        coverflowEffect={{
          rotate: 25,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        effect="coverflow"
        className="w-full [&_.swiper-pagination-bullet]:bg-purple-500 
                  [&_.swiper-pagination-bullet-active]:bg-purple-300
                  [&_.swiper-button-next]:text-purple-300 
                  [&_.swiper-button-prev]:text-purple-300"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        <AnimatePresence>
          {slides?.map((slide, index) => (
            <SwiperSlide key={index} className="py-12">
              <Link
                href={slide.url || "/"}
                className="block relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 to-black/40 p-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <Image
                      src={slide.image.data.attributes.formats.small.url}
                      alt={`Slide ${index + 1}`}
                      fill
                      priority
                      quality={100}
                      className="object-cover transition-all duration-500 
                               group-hover:scale-110 group-hover:brightness-110"
                      onContextMenu={(e) => e.preventDefault()}
                      sizes="(max-width: 320px) 280px,
                             (max-width: 640px) 400px,
                             (max-width: 1024px) 300px,
                             250px"
                    />
                    {/* Spooky overlay effect on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        background:
                          "linear-gradient(to top, rgba(88, 28, 135, 0.3), transparent)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10"
                    />
                  </div>
                  {/* Glowing border effect */}
                  <div
                    className="absolute inset-0 rounded-xl ring-2 ring-purple-500/20 
                                group-hover:ring-purple-400/60 group-hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]
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
