import React, { useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { IoWarningOutline } from "react-icons/io5";
import { usePlatform } from "../context/PlatformContext";
import { useAuth } from "../context/AuthContext";
import { registerSellRequest } from "../api/sellPlatform";


function BuyCard({ platform }) {
  const { updatePlatform } = usePlatform();
  const { user, updateUser } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationBalance, setShowConfirmationBalance] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false); // Nuevo estado para la tarjeta de éxito

  const netflix = "https://i.postimg.cc/pLRHJ7yg/netflix.webp";
  const canva = "https://i.postimg.cc/j2fbMYHr/canva.png";
  const apple = "https://i.postimg.cc/NFm317ts/apple.webp";
  const crunchyroll = "https://i.postimg.cc/1t2S03NH/crunchyroll.webp";
  const directv = "https://i.postimg.cc/QtHsWTVC/directv.png";
  const disney = "https://i.postimg.cc/xdj9n72K/disney.webp";
  const iptv = "https://i.postimg.cc/SQYkSCwt/iptv.jpg";
  const max = "https://i.postimg.cc/MKywRxZ7/max.jpg";
  const paramount = "https://i.postimg.cc/4NCZmnG4/paramount.webp";
  const plex = "https://i.postimg.cc/W3BRFYQY/plex.png";
  const spotify = "https://i.postimg.cc/CKKpWqG7/spotify.jpg";
  const vix = "https://i.postimg.cc/y8jzQPZW/vix.webp";
  const youtube = "https://i.postimg.cc/d1kP0cST/youtube.jpg";
  const primeVideo = "https://i.postimg.cc/8CngDzwS/prime-Video.jpg";

  const handleConfirmation = () => {
    if (user.balance < platform.price) {
      setShowConfirmationBalance(true);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleBuy = async () => {
    try {
      // Actualizar el estado de la plataforma
      await updatePlatform(platform._id, { ...platform, sell: "si" });

      // Actualizar el balance del usuario
      const newBalance = user.balance - platform.price;
      await updateUser(user.id, { balance: newBalance });

      // Datos a enviar en la solicitud
      const sellRequestData = {
        name: platform.name,
        seller: user.username,
        sell: "si", // El valor actualizado de sell
        createDate: platform.createDate,
        buyDate: new Date().toISOString().split("T")[0], // Fecha de compra actual
        price: platform.price,
        type: platform.type,
        email: platform.email,
        password: platform.password,
        screen: platform.screen,
        pin: platform.pin,
      };

      // Luego, registra la venta
      const response = await registerSellRequest(sellRequestData);

      if (response.status === 200) {
        console.log("Plataforma comprada exitosamente");
        setShowConfirmation(false); // Cierra el modal de confirmación
        setShowSuccessCard(true); // Muestra la tarjeta de éxito
      } else {
        console.error("Error al comprar la plataforma");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  if (platform.sell === "si") {
    return null;
  }

  // Determina qué imagen mostrar
  let imageSrc;
  switch (platform.name) {
    case "Netflix":
    case "Netflix original":
    case "Netflix genérico":
    case "Netflix original pantalla":
    case "Netflix genérico pantalla":
      imageSrc = netflix;
      break;
    case "MAX (HBO)":
      imageSrc = max;
      break;
    case "Crunchyroll":
      imageSrc = crunchyroll;
      break;
    case "Paramount":
      imageSrc = paramount;
      break;
    case "PLEX":
      imageSrc = plex;
      break;
    case "VIX":
      imageSrc = vix;
      break;
    case "CANVA 1 mes":
      imageSrc = canva;
      break;
    case "YouTube Premium 1 mes":
    case "YouTube Premium 3 mes":
      imageSrc = youtube;
      break;
    case "IPTV":
      imageSrc = iptv;
      break;
    case "Spotify 1 mes":
    case "Spotify 3 mes":
      imageSrc = spotify;
      break;
    case "Disney premium":
    case "Disney estándar":
      imageSrc = disney;
      break;
    case "DIRECTV con win":
    case "DIRECTV basic":
      imageSrc = directv;
      break;
    case "Apple TV":
      imageSrc = apple;
      break;
    case "Prime Video":
      imageSrc = primeVideo;
      break;
    default:
      imageSrc = null;
  }


  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <div className="overflow-x-auto">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {platform.name}
          </h3>
          <br />
          {imageSrc && (
            <img
              src={imageSrc}
              className="w-full h-auto rounded-lg shadow-md"
              alt={platform.name}
            />
          )}
          <br />
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            <strong>Precio:</strong> {platform.price}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            <strong>Tipo de cuenta:</strong> {platform.type}
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
                Comprar plataforma
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                <div className="flex justify-end gap-4">
                  <GiShoppingCart
                    className="text-green-500 text-4xl cursor-pointer"
                    onClick={handleConfirmation}
                  />
                </div>
              </dd>
            </div>
          </dl>
        </div>

      {showConfirmationBalance && (
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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <IoWarningOutline className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      No tienes saldo suficiente para comprar esta plataforma,
                      comunícate con tu proveedor.
                    </h3>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setShowConfirmationBalance(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <GiShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Estás a punto de comprar esta plataforma:
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      <strong>Nombre:</strong> {platform.name}
                      <br />
                      <strong>Precio:</strong> {platform.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleBuy}
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  type="button"
                  className="mt-3 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessCard && (
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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <GiShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      ¡Compra exitosa!
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      La compra de la plataforma{" "}
                      <strong>{platform.name}</strong> se ha realizado
                      exitosamente.
                    </p>
                    <br></br>
                    <p className="mt-2 text-sm text-gray-500">
                      <strong>Plataforma:</strong> {platform.name} 🩵
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      <strong>📤Correo:</strong> {platform.email}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      <strong>🔑Contraseña: </strong>
                      {platform.password}
                    </p>
                    {platform.type == "pantalla" && (
                      <p className="mt-2 text-sm text-gray-500">
                        <strong>🏷️Perfil: </strong> {platform.screen}
                        <br></br>
                        <strong>🏷️Pin:</strong> {platform.pin} <br></br>
                        <br></br>
                        <strong>
                          Recuerda estas comprando 1 PANTALLA QUE SIRVE SOLO
                          PARA UN DISPOSITIVO{" "}
                        </strong>
                        <br></br>
                        <br></br>⚠️ <strong>NO </strong>modificar perfiles
                        diferentes al asignado. ⚠️
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      ⚠️ Por favor NO Cambiar clave, NO agregar números de
                      teléfono, y NO usar en más de 1 dispositivo a la vez O
                      SERA PERDIDA DE GARANTIA. ⚠️
                    </p>{" "}
                    <br></br>
                    <p className="mt-2 text-sm text-gray-500">
                      <strong>MUCHAS GRACIAS POR TU COMPRA!🎬</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    setShowSuccessCard(false);
                    window.location.reload();
                  }}
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyCard;
