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

interface Slides {
  // Add other attributes as needed
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

export const revalidate = 0;

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
        {loading && !slides && <Spin />}
        {!loading &&
          slides &&
          slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="h-full w-full flex justify-center items-center"
            >
              <Link href={slide.url ? slide.url : "/"}>
                <Image
                  src={`${slide.image.data.attributes.formats.small.url}`}
                  alt={`${slide.image.data.attributes.formats.small.url}`}
                  priority
                  height={300}
                  width={300}
                  quality={100}
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
