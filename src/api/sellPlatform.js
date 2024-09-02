
import axios from "./axios";

export const registerSellRequest = (sellPlatform) => axios.post(`/registerSellPlatforms`, sellPlatform);

export const getSellPlatformsRequest = async () => axios.get("/sellPlatforms");

export const deleteSellPlatformRequest = async (id) => axios.delete(`/sellPlatforms/${id}`);
