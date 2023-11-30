import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";

import "swiper/css/effect-fade";

const images = ["/mex/mex1.png", "/mex/mex3.png", "/mex/mex4.png"];

const DashboardImages = () => {
  return (
    <div className="h-full w-auto max-sm:w-full flex justify-center items-center m-6 max-sm:pl-13 max-md:pl-30">
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
        {images.map((slide) => (
          <SwiperSlide
            key={slide}
            className="h-[30rem] w-auto flex justify-center items-center"
          >
            <Image
              src={slide}
              fill
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
export default DashboardImages;
