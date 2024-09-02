import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";
import Navbar from "../components/Navbar";

function UserPage() {
  const { getUsers, users } = useAuth();
  const [selectedRole, setSelectedRole] = useState("todos");

  useEffect(() => {
    getUsers();
  }, []);

  // Media query to detect mobile devices (can be customized)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <>
      <Navbar>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
            <p className="font-medium text-xl pt-4 text-white">
              LISTA DE USUARIOS
            </p>
          </div>
          <div className="flex flex-wrap items-center">
            {/* Lista desplegable para filtrar por Rol */}
            <label className="text-black mr-2 p-2" htmlFor="roleFilter">
              Filtrar por Rol:
            </label>
            <select
              className="text-black border rounded p-1"
              id="roleFilter"
              onChange={(e) => setSelectedRole(e.target.value)}
              value={selectedRole}
            >
              <option value="todos">Todos</option>
              <option value="admin">Admin</option>
              <option value="vendedor">Vendedor</option>
              {/* Agrega más opciones según tus roles */}
            </select>

            {/* Botón para agregar usuario */}
            <Link to="/register">
              <button className={`bg-blue-500 text-white rounded px-4 py-2 ml-2 hover:bg-blue-700 ${
                isMobile ? "w-full mt-2" : ""
              }`}>
                Agregar Usuario
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
          <UserCard users={users} roleFilter={selectedRole} />
        </div>
      </Navbar>
    </>
  );
}

export default UserPage;