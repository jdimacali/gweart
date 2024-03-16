import { API_URL } from "@/lib/utils";
import axios from "axios";

const getProduct = async (productId: string) => {
  const URL = `${API_URL}/api/products?[filters][id][$in]=${productId}&populate[image][fields][0]=url&populate[categories][populate]=point`;
  const response = await axios.get(URL);

  return response.data.data[0];
};

export default getProduct;
