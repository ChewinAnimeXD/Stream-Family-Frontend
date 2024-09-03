import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePlatform } from "../context/PlatformContext";
import Navbar from "../components/Navbar";
import PlatformCard from "../components/PlatformCard";

function PlatformPage() {
  const { getPlatforms, platforms } = usePlatform();
  const [selectedRole, setSelectedRole] = useState("todos");

  useEffect(() => {
    getPlatforms();
  }, []);

  // Media query to detect mobile devices (can be customized)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-white">
              LISTA DE PLATAFORMAS
            </p>
          </div>
          <div className="flex flex-wrap items-center">
            {/* Lista desplegable para filtrar por Rol */}
            <label className="text-black mr-2 p-2" htmlFor="nameFilter">
              Filtrar por plataforma:
            </label>
            <select
              className="text-black border rounded p-1"
              id="nameFilter"
              onChange={(e) => setSelectedRole(e.target.value)}
              value={selectedRole}
            >
              <option value="todos">Todos</option>
              <option value="Netflix">Netflix</option>
              <option value="Crunchyroll">Crunchyroll</option>
              <option value="Paramount">Paramount</option>
              <option value="PLEX">PLEX</option>
              <option value="Max">Max</option>
              <option value="VIX">VIX</option>
              <option value="Canva">Canva</option>
              <option value="YouTube">YouTube</option>
              <option value="IPTV">IPTV</option>
              <option value="Spotify">Spotify</option>
              <option value="Disney+">Disney</option>
              <option value="DIRECTV">DIRECTV</option>
              <option value="AppleTV ">AppleTV </option>
              {/* Agrega más opciones según tus roles */}
            </select>

            {/* Botón para agregar usuario */}
            <Link to="/registerPlatforms">
              <button className={`bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-700 ${
                isMobile ? "w-full mt-2" : ""
              }`}>
                Agregar Plataforma
              </button>
            </Link>

            <button
              onClick={() => window.location.reload()}
              className={`bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-700 ${
                isMobile ? "w-full mt-2" : ""
              }`}
            >
              Actualizar
            </button>
          </div>
          {/* Pasa el filtro y la lista de usuarios al componente UserCard */}
          <PlatformCard platforms={platforms} nameFilter={selectedRole} />
        </div>
      </Navbar>
    </>
  );
}

export default PlatformPage;