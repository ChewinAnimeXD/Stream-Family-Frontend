import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, deletePlatformRequest, getPlatformsRequest, updatePlatformRequest, getPlatformRequest } from "../api/platform";

export const PlatformContext = createContext();

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  
  if (!context) {
    throw new Error("usePlatform debería estar dentro del proveedor");
  }
  return context;
};

export const PlatformProvider = ({ children }) => {
  const [platforms, setPlatforms] = useState([]);
  const [errors, setErrors] = useState([]);

  const getPlatforms = async () => {
    try {
      const res = await getPlatformsRequest();
      setPlatforms(res.data);
    } catch (error) {
      console.error("Error al obtener plataformas:", error);
    }
  };

  const getPlatform = async (id) => {
    try {
      const res = await getPlatformRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlatform = async (id) => {
    try {
      const res = await deletePlatformRequest(id);
      if (res.status === 204) setPlatforms(platforms.filter((platform) => platform._id !== id)); 
    } catch (error) {
      console.log(error);
    }
  };


  const registerPlatform = async (platform) => {
    try {
      const res = await registerRequest(platform);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const updatePlatform = async (id, platform) => {
    try {
      await updatePlatformRequest(id, platform);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PlatformContext.Provider
      value={{
        platforms,
        getPlatforms,
        deletePlatform,
        registerPlatform,
        getPlatform,
        updatePlatform,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}
