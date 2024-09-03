// SellPlatformPage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSellPlatform } from "../context/SellPlatformContext";
import SellPlatformCard from "../components/SellPlatformCard";
import { useAuth } from "../context/AuthContext"; // Importa el hook useAuth

function SellPlatformPage() {
  const { getSellPlatforms, sellPlatforms } = useSellPlatform();
  const { user } = useAuth(); // Obtén el usuario autenticado
  const [emailFilter, setEmailFilter] = useState("");
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);

  useEffect(() => {
    getSellPlatforms();
  }, []);

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

    setFilteredPlatforms(platforms);
  }, [sellPlatforms, emailFilter, user]);

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
            {/* input para filtrar por email */}
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
          {/* Pasa el filtro y la lista de plataformas al componente SellPlatformCard */}
          <SellPlatformCard sellPlatforms={filteredPlatforms} />
        </div>
      </Navbar>
    </>
  );
}

export default SellPlatformPage;
