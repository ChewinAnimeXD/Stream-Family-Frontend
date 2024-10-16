import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSellPlatform } from "../context/SellPlatformContext";
import SellPlatformCard from "../components/SellPlatformCard";
import { useAuth } from "../context/AuthContext";

function SellPlatformPage() {
  const { getSellPlatforms, sellPlatforms } = useSellPlatform();
  const { user } = useAuth();
  const [emailFilter, setEmailFilter] = useState("");
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const platformsPerPage = 20;

  useEffect(() => {
    getSellPlatforms();
  }, []);

  // Función para eliminar duplicados
  const removeDuplicates = (platforms) => {
    const uniquePlatforms = platforms.filter((platform, index, self) => 
      index === self.findIndex((p) => (
        p.platform === platform.platform && // Compara plataforma
        p.type === platform.type &&         // Compara tipo
        p.email === platform.email &&       // Compara correo
        p.password === platform.password && // Compara contraseña
        p.screen === platform.screen &&     // Compara pantalla
        p.pin === platform.pin               // Compara pin
      ))
    );
    return uniquePlatforms;
  };

  useEffect(() => {
    let platforms = sellPlatforms || [];

    if (user && user.role === "vendedor") {
      platforms = platforms.filter(platform => platform.seller === user.username);
    }

    platforms = platforms.filter(platform =>
      platform.email && platform.email.toLowerCase().includes(emailFilter.toLowerCase())
    );

    // Ordenar las plataformas por fecha de venta en orden descendente
    platforms.sort((a, b) => new Date(b.buyDate) - new Date(a.buyDate));

    // Eliminar duplicados antes de actualizar el estado
    platforms = removeDuplicates(platforms);

    setFilteredPlatforms(platforms);
  }, [sellPlatforms, emailFilter, user]);

  const indexOfLastPlatform = currentPage * platformsPerPage;
  const indexOfFirstPlatform = indexOfLastPlatform - platformsPerPage;
  const currentPlatforms = filteredPlatforms.slice(indexOfFirstPlatform, indexOfLastPlatform);

  const totalPages = Math.ceil(filteredPlatforms.length / platformsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-white">
              LISTA DE PLATAFORMAS VENDIDAS
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Filtrar por email"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              className="border border-gray-300 text-gray-800 rounded px-4 py-2 mr-2"
            />

            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-700"
            >
              Actualizar
            </button>
          </div>
          <SellPlatformCard sellPlatforms={currentPlatforms} />

          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-white'} text-gray-900`}
            >
              &#171; Primera
            </button>

            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-white'} text-gray-900`}
            >
              &#5176;
            </button>

            <span className="font-semibold text-gray-900 text-lg">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'} text-gray-900`}
            >
              &#5171;
            </button>

            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'} text-gray-900`}
            >
              Última &#187;
            </button>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default SellPlatformPage;
