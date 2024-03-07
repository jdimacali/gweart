import { API_URL } from "@/lib/utils";
import axios from "axios";

const URL = `${API_URL}/api/Categories?populate=*`;

const getCategories = async () => {
  const response = await axios.get(URL);

  return response.data.data;
};

export default getCategories;
