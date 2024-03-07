import { API_URL } from "@/lib/utils";
import axios from "axios";
import { Event } from "@/types";

const URL = `${API_URL}/api/events?populate=image`;

const getEvents = async (): Promise<Event[]> => {
  const response = await axios.get(URL);

  return response.data.data;
};

export default getEvents;
