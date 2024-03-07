import { API_URL } from "@/lib/utils";
import axios from "axios";

const URL = `${API_URL}/api/dashboard?populate=*`;

const getProduct = async () => {
    const response = await axios.get(URL);

    return response.data.data.attributes;

};

export default getProduct;
