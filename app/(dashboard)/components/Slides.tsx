import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import getSlides from "@/actions/getSlides";

interface Slides {
  // Add other attributes as needed
}

const Slides = async () => {
  const slides = await getSlides();
  return (
    <div className="h-full w-full flex justify-center items-center m-6 max-sm:pl-13 max-md:pl-30">
      <Swiper
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
        }}
        navigation={true}
        spaceBetween={-75}
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
        className="w-[1500px] max-sm:w-full h-full flex justify-center items-center"
        breakpoints={{
          100: {
            slidesPerView: 1,
          },
          900: { slidesPerView: 4 },
        }}
      >
        {slides &&
          slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="h-full w-full flex justify-center items-center place-self-center"
            >
              <Link href={slide.url ? slide.url : "/"}>
                <Image
                  src={`${slide.image.data.attributes.formats.small.url}`}
                  alt={`${slide.image.data.attributes.formats.small.url}`}
                  height={300}
                  width={300}
                  quality={90}
                  loading="lazy"
                  className="block object-contain shadow hover:scale-110 transition-all"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export default Slides;
