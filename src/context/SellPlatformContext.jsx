import { createContext, useState, useContext, useEffect } from "react";
import {  getSellPlatformsRequest, registerSellRequest, deleteSellPlatformRequest } from "../api/sellPlatform";

export const SellPlatformContext = createContext();

export const useSellPlatform = () => {
  const context = useContext(SellPlatformContext);
  
  if (!context) {
    throw new Error("useSellPlatform debería estar dentro del proveedor");
  }
  return context;
};

export const SellPlatformProvider = ({ children }) => {
  const [sellPlatforms, setSellPlatforms] = useState([]);
  const [errors, setErrors] = useState([]);

  const getSellPlatforms = async () => {
    try {
      const res = await getSellPlatformsRequest();
      setSellPlatforms(res.data);
    } catch (error) {
      console.error("Error al obtener plataformas:", error);
    }
  };

  const deleteSellPlatform = async (id) => {
    try {
      const res = await deleteSellPlatformRequest(id);
      if (res.status === 204) setSellPlatforms(sellPlatforms.filter((sellPlatform) => sellPlatform._id !== id)); 
    } catch (error) {
      console.log(error);
    }
  };

  const registerSellPlatform = async (sellPlatform) => {
    try {
      const res = await registerSellRequest(sellPlatform);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SellPlatformContext.Provider
      value={{
        sellPlatforms,
        getSellPlatforms,
        registerSellPlatform,
        deleteSellPlatform,
      }}
    >
      {children}
    </SellPlatformContext.Provider>
  );
}
