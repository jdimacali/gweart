import { API_URL } from "@/lib/utils";
import axios from "axios";
import { Linktree } from "@/types";

const URL = `${API_URL}/api/beacon?populate=*`;

const getLinktree = async (): Promise<Linktree> => {
  const response = await axios.get(URL);
  return response.data.data.attributes;
};

export default getLinktree;
