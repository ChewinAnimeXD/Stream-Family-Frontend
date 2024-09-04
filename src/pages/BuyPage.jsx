import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlatform } from "../context/PlatformContext";
import Navbar from "../components/Navbar";
import BuyCard from "../components/BuyCard";

function BuyPage() {
  const { userId } = useParams();
  const { getPlatforms, platforms } = usePlatform();
  const [selectedFilter, setSelectedFilter] = useState("Todos"); // Estado para el filtro

  useEffect(() => {
    getPlatforms(userId);
  }, [userId, getPlatforms]); // Añade getPlatforms como dependencia del useEffect

  // Filtra las plataformas según el filtro seleccionado
  const filterPlatformsByType = (platforms, type) => {
    if (type === "Todos") return platforms;

    return platforms.filter((platform) => {
      // Tomar solo la primera palabra del nombre de la plataforma
      const platformType = platform.name.split(" ")[0];
      return platformType === type;
    });
  };

  // Aplicar filtro a las plataformas
  const filteredPlatforms = filterPlatformsByType(platforms, selectedFilter);

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-white">
              COMPRAR PLATAFORMAS
            </p>
          </div>

          {/* Renderizar plataformas filtradas */}
          <div className="">
            {/* Agrega el filtro de selección */}
            <label className="text-black mr-2 p-2" htmlFor="nameFilter">
              Filtrar por plataforma:
            </label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="mt-4 text-gray-800 border rounded p-1"
            >
              <option value="Todos">Todos</option>
              <option value="Netflix">Netflix</option>
              <option value="MAX">MAX (HBO)</option>
              <option value="Crunchyroll">Crunchyroll</option>
              <option value="Paramount">Paramount</option>
              <option value="PLEX">PLEX</option>
              <option value="VIX">VIX</option>
              <option value="CANVA">CANVA</option>
              <option value="YouTube">YouTube</option>
              <option value="IPTV">IPTV</option>
              <option value="Spotify">Spotify</option>
              <option value="Disney">Disney</option>
              <option value="DIRECTV">DIRECTV</option>
              <option value="Apple">Apple TV</option>
              <option value="Prime">Prime Video</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 p-4 ">
            {filteredPlatforms.map((platform) => (
              <BuyCard platform={platform} key={platform._id} />
            ))}
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default BuyPage;
