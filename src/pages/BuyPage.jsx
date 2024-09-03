import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlatform } from "../context/PlatformContext";
import Navbar from "../components/Navbar";
import BuyCard from "../components/BuyCard";

function BuyPage() {
  const { userId } = useParams();
  const { getPlatforms, platforms } = usePlatform();
  const [selectedFilter, setSelectedFilter] = useState('Todos'); // Estado para el filtro

  useEffect(() => {
    getPlatforms(userId); 
  }, [userId]); 

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-white">
              COMPRAR PLATAFORMAS
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 p-4">
          {platforms.map((platform) => (
              <BuyCard platform={platform} key={platform._id} />
            ))}
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default BuyPage;
