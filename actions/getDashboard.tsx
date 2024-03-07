import { API_URL } from "@/lib/utils";
import axios from "axios";
import { Dashboard } from "@/types";

const URL = `${API_URL}/api/dashboard?populate=*`;

const getDashboard = async (): Promise<Dashboard> => {
  const response = await axios.get(URL);
  return response.data.data.attributes;
};

export default getDashboard;
