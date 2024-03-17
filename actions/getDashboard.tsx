import { API_URL } from "@/lib/utils";
import axios from "axios";
import { Dashboard } from "@/types";

const URL = `${API_URL}/api/dashboard?populate=Images&populate[0]=Title.Font&populate[1]=Subtitle.Font&populate[2]=Button_Text.Font`;

const getDashboard = async (): Promise<Dashboard> => {
  const response = await axios.get(URL);
  return response.data.data.attributes;
};

export default getDashboard;
