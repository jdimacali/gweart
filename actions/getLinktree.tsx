import { API_URL } from "@/lib/utils";
import axios from "axios";
import { Linktree } from "@/types";

const URL = `${API_URL}/api/Beacon?populate=Links&populate[0]=Title.Font&populate[1]=Subtitle.Font`;

const getLinktree = async (): Promise<Linktree> => {
  const response = await axios.get(URL);
  return response.data.data.attributes;
};

export default getLinktree;
