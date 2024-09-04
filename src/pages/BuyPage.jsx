import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlatform } from "../context/PlatformContext";
import Navbar from "../components/Navbar";
import BuyCard from "../components/BuyCard";

function BuyPage() {
  const { userId } = useParams();
  const { getPlatforms, platforms } = usePlatform();
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);

  useEffect(() => {
    getPlatforms(userId);
  }, [userId]);

  useEffect(() => {
    filterPlatforms();
  }, [selectedFilter, platforms]);

  const filterPlatforms = () => {
    if (selectedFilter === 'Todos') {
      setFilteredPlatforms(platforms);
    } else {
      const filtered = platforms.filter(platform => platform.name.includes(selectedFilter));
      setFilteredPlatforms(filtered);
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  // Obtener una lista única de nombres de plataformas
  const platformNames = ['Todos', ...new Set(platforms.map(p => p.name.split(' ')[0]))];

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border text-gray-800 border-gray-200 shadow-md m-5">
          <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-white">
              COMPRAR PLATAFORMAS
            </p>
          </div>
          
          <div className="p-4">
            <select 
              value={selectedFilter} 
              onChange={handleFilterChange}
              className="mb-4 p-2 border rounded"
            >
              {platformNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {filteredPlatforms.map((platform) => (
                <BuyCard platform={platform} key={platform._id} />
              ))}
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default BuyPage;