import { API_URL } from "@/lib/utils";
import axios from "axios";

interface getProductProps {
  page?: number;
  categoryId?: string;
  name?: string;
}

const getProducts = async ({ page = 1, categoryId, name }: getProductProps) => {
  const URL = `${API_URL}/api/products?${
    name && `filters[name][$containsi]=${name}`
  }&${
    categoryId && `filters[categories][id][$eq]=${categoryId}`
  }&pagination[page]=${page}&pagination[pageSize]=9&populate[image][fields][0]=url&populate[categories][fields][]=id&populate[categories][fields][]=name&populate[categories][populate][0]=parcel`;

  try {
    const response = await axios.get(URL);
    return {
      response: response.data.data,
      metadata: response.data.meta,
    };
  } catch (error) {
    // Handle error
    console.error("Error fetching products:", error);
    return { response: [], metadata: {} };
  }
};

export default getProducts;
