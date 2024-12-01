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
import { motion } from "framer-motion";

interface Slides {
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
  const [slides, setSlides] = useState<Slides[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/slides");
        setSlides(response.data.attributes.slides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      } finally {
        setLoading(false);
      }
    };
    getDashboard();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-[1600px] px-4"
    >
      <Swiper
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        effect="coverflow"
        className="w-full"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {loading && !slides && (
          <div className="flex justify-center items-center min-h-[400px]">
            <Spin />
          </div>
        )}

        {!loading &&
          slides?.map((slide, index) => (
            <SwiperSlide key={index} className="py-12">
              <Link href={slide.url || "/"} className="block relative group">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-purple-900/20 p-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.image.data.attributes.formats.small.url}
                      alt={`Slide ${index + 1}`}
                      fill
                      priority
                      quality={100}
                      className="object-cover rounded-lg 
                               transform transition-all duration-300 
                               group-hover:scale-105 group-hover:brightness-110"
                      onContextMenu={(e) => e.preventDefault()}
                      sizes="(max-width: 320px) 280px,
                             (max-width: 640px) 400px,
                             (max-width: 1024px) 300px,
                             250px"
                    />
                  </div>
                  <div
                    className="absolute inset-0 rounded-xl ring-1 ring-purple-500/20 
                                group-hover:ring-purple-500/40 transition-all duration-300"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </motion.div>
  );
};

export default Slides;
