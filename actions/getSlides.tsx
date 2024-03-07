import { API_URL } from "@/lib/utils";
import { Slide } from "@/types";
import axios from "axios";

const URL = `${API_URL}/api/slideshow?populate[slides][populate]=*`;

const getSlides = async (): Promise<Slide[]> => {
  const response = await axios.get(URL);

  return response.data.data.attributes.slides;
};

export default getSlides;
