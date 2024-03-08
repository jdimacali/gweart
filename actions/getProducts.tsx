import { API_URL } from "@/lib/utils";
import axios from "axios";

interface getProductProps {
  page?: number;
  categoryId?: string;
  name?: string;
}

const getProducts = async ({ page = 1, categoryId, name }: getProductProps) => {
  let filters = "";
  if (categoryId && name) {
    filters = `filters[name][$containsi]=${name}&filters[categories][id][$eq]=${categoryId}`;
  } else if (categoryId) {
    filters = `filters[categories][id][$eq]=${categoryId}`;
  } else if (name) {
    filters = `filters[name][$containsi]=${name}`;
  }

  const URL = `${API_URL}/api/products?${filters}&pagination[page]=${page}&pagination[pageSize]=9&populate[image][fields][0]=url&populate[categories][fields][]=id&populate[categories][fields][]=name`;

  try {
    const response = await axios.get(URL);
    return {
      response: response.data.data,
      metadata: response.data.meta.pagination,
    };
  } catch (error) {
    // Handle error
    console.error("Error fetching products:", error);
    return { response: [], metadata: {} };
  }
};

export default getProducts;
