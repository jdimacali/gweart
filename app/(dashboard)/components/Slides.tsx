import { Swiper, SwiperSlide } from "swiper/react";

import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import Image from "next/image";

const slides = [
  "/slideshow/slide1.jpg",
  "/slideshow/slide2.jpg",
  "/slideshow/slide3.jpg",
  "/slideshow/slide4.jpg",
  "/slideshow/slide1.jpg",
  "/slideshow/slide2.jpg",
  "/slideshow/slide3.jpg",
  "/slideshow/slide4.jpg",
];

const Slides = () => {
  return (
    <div className="h-full w-full flex justify-center items-center m-6 max-sm:pl-13 max-md:pl-30">
      <Swiper
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
        }}
        navigation={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        coverflowEffect={{
          rotate: 20,
          stretch: 10,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        effect="coverflow"
        className="w-[1500px] max-sm:w-full h-full flex justify-center items-center"
        breakpoints={{
          650: {
            slidesPerView: 1,
          },
          800: { slidesPerView: 4 },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="h-full w-full flex justify-center items-center"
          >
            <Image
              src={slide}
              height={400}
              width={400}
              quality={100}
              alt="slide"
              className="block object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Slides;
