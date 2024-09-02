
import axios from "./axios";

export const registerRequest = (platform) => axios.post(`/registerPlatforms`, platform);

export const deletePlatformRequest = async (id) => axios.delete(`/platforms/${id}`);

export const getPlatformsRequest = async () => axios.get("/platforms");

export const updatePlatformRequest = async (id, platform) => axios.put(`/registerPlatforms/${id}`, platform);

export const getPlatformRequest = async (id) => axios.get(`/registerPlatforms/${id}`);
