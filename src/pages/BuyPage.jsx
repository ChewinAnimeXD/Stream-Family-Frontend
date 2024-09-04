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

  // Agrupar plataformas por tipo
  const groupPlatformsByType = (platforms) => {
    return platforms.reduce((acc, platform) => {
      const platformType = platform.name.split(" ")[0];
      if (!acc[platformType]) acc[platformType] = [];
      acc[platformType].push(platform);
      return acc;
    }, {});
  };

  // Aplicar el filtro de plataforma seleccionada y agruparlas
  const groupedPlatforms = groupPlatformsByType(platforms);

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-white">
              COMPRAR PLATAFORMAS
            </p>
          </div>

          {/* Renderizar filtro de selección */}
          <div>
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

          {/* Renderizar plataformas agrupadas */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
            {selectedFilter === "Todos"
              ? Object.keys(groupedPlatforms).map((type) => (
                  <div key={type}>
                    <h2 className="text-lg font-bold mt-4">{type}</h2>
                    {groupedPlatforms[type].map((platform) => (
                      <BuyCard platform={platform} key={platform._id} />
                    ))}
                  </div>
                ))
              : groupedPlatforms[selectedFilter] &&
                groupedPlatforms[selectedFilter].map((platform) => (
                  <BuyCard platform={platform} key={platform._id} />
                ))}
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default BuyPage;
