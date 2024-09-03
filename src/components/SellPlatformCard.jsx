import { useState } from "react";
import { GoPencil, GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { useSellPlatform } from "../context/SellPlatformContext";

function SellPlatformCard({ sellPlatforms, nameFilter, emailFilter }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [platformIdToDelete, setPlatformIdToDelete] = useState(null);
  const { deleteSellPlatform } = useSellPlatform(); // Asumiendo que hay una función de contexto para eliminar la plataforma

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Función para mostrar la confirmación de eliminación
  const handleDeleteConfirmation = (platformId) => {
    setPlatformIdToDelete(platformId);
    setShowConfirmation(true);
  };

  // Función para eliminar la plataforma
  const handleDeletePlatform = () => {
    if (platformIdToDelete) {
      deleteSellPlatform(platformIdToDelete); // Llama a la función de eliminación
      setShowConfirmation(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Plataforma</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Vendedor</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Vendida</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Fecha Creación</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Fecha de Venta</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Precio</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tipo</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Correo</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Contraseña</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Pantalla</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Pin</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {sellPlatforms &&
              Array.isArray(sellPlatforms) &&
              sellPlatforms
                .filter((sellPlatformData) => {
                  const sellPlatformName = sellPlatformData.name ? sellPlatformData.name.toLowerCase() : "";
                  const filterValue = nameFilter ? nameFilter.toLowerCase() : "";
                  const email = sellPlatformData.email ? sellPlatformData.email.toLowerCase() : ""; // Manejo seguro del email
                  const emailFilterValue = emailFilter ? emailFilter.toLowerCase() : "";

                  // Aplica ambos filtros: por nombre y por email
                  return (
                    (nameFilter === "todos" || sellPlatformName.includes(filterValue)) &&
                    email.includes(emailFilterValue)
                  );
                })
                .map((sellPlatformData) => (
                  <tr key={sellPlatformData._id} className="hover:bg-gray-50">
                    <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">{sellPlatformData.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{sellPlatformData.seller}</td>
                    <td className="px-6 py-4">{sellPlatformData.sell}</td>
                    <td className="px-6 py-4">{sellPlatformData.createDate.split('T')[0].split('-').reverse().join('/')}</td>
                    <td className="px-6 py-4">
  {sellPlatformData.buyDate.split('T')[0].split('-').reverse().join('/')}
</td>
                    <td className="px-6 py-4">{sellPlatformData.price}</td>
                    <td className="px-6 py-4">{sellPlatformData.type}</td>
                    <td className="px-6 py-4">{sellPlatformData.email}</td>
                    <td className="px-6 py-4">{sellPlatformData.password}</td>
                    <td className="px-6 py-4">{sellPlatformData.screen}</td>
                    <td className="px-6 py-4">{sellPlatformData.pin}</td>
                    <td className="px-6 py-4">
                      {/* Botón de eliminación */}
                      <GoTrash
                        className="text-red-500 text-xl cursor-pointer"
                        onClick={() => handleDeleteConfirmation(sellPlatformData._id)}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Confirmación de eliminación */}
      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icono de advertencia */}
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      ¿Estás seguro que deseas eliminar esta plataforma?
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleDeletePlatform}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellPlatformCard;
