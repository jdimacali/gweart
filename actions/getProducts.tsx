import { API_URL } from "@/lib/utils";
import axios from "axios";

interface getProductProps {
  page?: number;
  categoryId?: string;
  name?: string;
}

const getProducts = async ({ page, categoryId, name }: getProductProps) => {
  if (categoryId) {
    const URL = `${API_URL}/api/products?pagination[page]=${
      page ? page : 1
    }&pagination[pageSize]=9&populate[image][fields][0]=url&populate[categories][fields][0]=id&populate[categories][fields][1]=name&filters[categories][id][$eq]=${categoryId}`;

    const response = await axios.get(URL);

    return {
      response: response.data.data,
      metadata: response.data.meta.pagination,
    };
  } else {
    const URL = `${API_URL}/api/products?pagination[page]=${
      page ? page : 1
    }&pagination[pageSize]=9&populate=*`;
    const response = await axios.get(URL);

    return {
      response: response.data.data,
      metadata: response.data.meta.pagination,
    };
  }
};

export default getProducts;
