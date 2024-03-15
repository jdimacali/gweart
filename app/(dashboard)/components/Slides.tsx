import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

import Image from "next/image";
import Link from "next/link";
import { Slide } from "@/types";

interface SlidesProps {
  slides: Slide[];
}

const Slides = ({ slides }: SlidesProps) => {
  return (
    <div className="py-10 flex h-full w-[80%] items-center justify-center">
      <Swiper
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
        }}
        navigation={true}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        effect="coverflow"
        breakpoints={{
          100: {
            slidesPerView: 1,
          },
          700: { slidesPerView: 2 },
          1000: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        }}
        className="w-[100vw] flex items-center justify-center place-content-center "
      >
        {slides &&
          slides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="place-content-center w-full h-full"
            >
              <Link href={slide.url ? slide.url : "/"}>
                <Image
                  src={slide.image.data.attributes.formats.small.url}
                  alt={slide.image.data.attributes.formats.small.url}
                  height={300}
                  width={300}
                  loading="lazy"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                  className="w-full h-full flex items-center justify-center aspect-square object-contain cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out "
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slides;
