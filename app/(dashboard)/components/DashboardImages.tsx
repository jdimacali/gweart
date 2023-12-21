import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css/effect-fade";

interface DashboardImagesProps {
  images: string[];
}

const DashboardImages = ({ images }: DashboardImagesProps) => {
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
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="h-[30rem] w-auto flex justify-center items-center"
          >
            <div className="w-full h-full bg-transparent z-2"></div>
            <Image
              src={image}
              fill
              quality={100}
              alt="slide"
              sizes="100vh"
              className="block object-contain w-full h-auto pointer-events-none"
              onContextMenu={(e) => {
                e.preventDefault();
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default DashboardImages;
