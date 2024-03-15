"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css/effect-fade";
import React from "react"; // No longer necessary in newer React versions
import { useLongPress } from "use-long-press";
interface DashboardImagesProps {
  images: {
    id: number;
    data: {
      attributes: {
        formats: {
          small: {
            url: string;
          };
        };
        url: string;
      };
    }[];
  };
}

const DashboardImages = ({ images }: DashboardImagesProps) => {
  const bind = useLongPress(() => {
    return false;
  });

  return (
    <div className="w-96 h-96 p-8 md:p-4 xl:p-0">
      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className="w-full h-full"
      >
        {images.data.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image.attributes.formats.small.url}
              width={700}
              height={700}
              priority
              alt="slide"
              sizes="(max-width: 320px) 280px,
         (max-width: 768px) 720px,
         (max-width: 1280px) 1200px,
         1400px"
              className="block object-contain w-full h-full pointer-events-none"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              {...bind()}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default DashboardImages;
