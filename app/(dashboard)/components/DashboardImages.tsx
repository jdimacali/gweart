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
    <div className="h-full w-auto max-sm:w-full flex justify-center items-center m-6 ">
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
        className="w-[25vw] max-sm:w-full h-full flex justify-center items-center"
      >
        {images.data.map((image, index) => (
          <SwiperSlide
            key={index}
            className="h-[30rem] w-auto flex justify-center items-center"
          >
            <Image
              src={image.attributes.url}
              fill
              priority
              quality={95}
              alt="slide"
              sizes="(max-width: 320px) 280px,
         (max-width: 768px) 720px,
         (max-width: 1280px) 1200px,
         1400px"
              className="block object-contain w-full h-auto pointer-events-none"
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
