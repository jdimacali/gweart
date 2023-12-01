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
import { API_URL } from "@/lib/utils";

interface Events {
  id: number;
  attributes: {
    // Add other attributes as needed
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
}

const Slides = () => {
  const [slides, setSlides] = useState<Events[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/slides");
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    getDashboard();
  }, []);

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
        {loading && !slides && <Spin />}
        {!loading &&
          slides &&
          slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="h-full w-full flex justify-center items-center"
            >
              <Image
                src={`${API_URL}${slide.attributes.image.data.attributes.url}`}
                alt={`${API_URL}${slide.attributes.image.data.attributes.url}`}
                height={400}
                width={400}
                quality={100}
                className="block object-contain"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export default Slides;