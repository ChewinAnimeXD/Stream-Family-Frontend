import React, { useState } from "react";
import { usePlatform } from "../context/PlatformContext";
import { useAuth } from "../context/AuthContext";
import { registerSellRequest } from "../api/sellPlatform";

function BuyCard({ platform }) {
  const { updatePlatform } = usePlatform();
  const { user, updateUser } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationBalance, setShowConfirmationBalance] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

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
      await updatePlatform(platform._id, { ...platform, sell: "si" });
      const newBalance = user.balance - platform.price;
      await updateUser(user.id, { balance: newBalance });

      const sellRequestData = {
        name: platform.name,
        seller: user.username,
        sell: "si",
        createDate: platform.createDate,
        buyDate: new Date().toISOString().split("T")[0],
        price: platform.price,
        type: platform.type,
        email: platform.email,
        password: platform.password,
        screen: platform.screen,
        pin: platform.pin,
      };

      const response = await registerSellRequest(sellRequestData);

      if (response.status === 200) {
        console.log("Plataforma comprada exitosamente");
        setShowConfirmation(false);
        setShowSuccessCard(true);
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
    <div>
      <div>
        <div>
          <h3>{platform.name}</h3>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={platform.name}
            />
          )}
          <p>
            <strong>Precio:</strong> {platform.price}
          </p>
          <p>
            <strong>Tipo de cuenta:</strong> {platform.type}
          </p>
        </div>
      </div>
      <div>
        <div>
          <div>
            <dt>Comprar plataforma</dt>
            <dd>
            </dd>
          </div>
        </div>
      </div>

      {showConfirmationBalance && (
        <div>
          <div>
            <div>
              <div></div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <h3>
                      No tienes saldo suficiente para comprar esta plataforma,
                      comunícate con tu proveedor.
                    </h3>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => setShowConfirmationBalance(false)}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div>
          <div>
            <div>
              <div></div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <h3>
                      Estás a punto de comprar esta plataforma:
                    </h3>
                    <p>
                      <strong>Nombre:</strong> {platform.name}
                      <br />
                      <strong>Precio:</strong> {platform.price}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={handleBuy}
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessCard && (
        <div>
          <div>
            <div>
              <div></div>
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <h3>
                      ¡Compra exitosa!
                    </h3>
                    <p>
                      La compra de la plataforma{" "}
                      <strong>{platform.name}</strong> se ha realizado
                      exitosamente.
                    </p>
                    <p>
                      <strong>Plataforma:</strong> {platform.name} 🩵
                    </p>
                    <p>
                      <strong>📤Correo:</strong> {platform.email}
                    </p>
                    <p>
                      <strong>🔑Contraseña: </strong>
                      {platform.password}
                    </p>
                    {platform.type === "pantalla" && (
                      <p>
                        <strong>🏷️Perfil: </strong> {platform.screen}
                        <br />
                        <strong>🏷️Pin:</strong> {platform.pin} <br />
                        <br />
                        <strong>
                          Recuerda estas comprando 1 PANTALLA QUE SIRVE SOLO
                          PARA UN DISPOSITIVO{" "}
                        </strong>
                        <br />
                        <br />⚠️ <strong>NO </strong>modificar perfiles
                        diferentes al asignado. ⚠️
                      </p>
                    )}
                    <p>
                      ⚠️ Por favor NO Cambiar clave, NO agregar números de
                      teléfono, y NO usar en más de 1 dispositivo a la vez O
                      SERA PERDIDA DE GARANTIA. ⚠️
                    </p>
                    <br />
                    <p>
                      <strong>MUCHAS GRACIAS POR TU COMPRA!🎬</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setShowSuccessCard(false);
                    window.location.reload();
                  }}
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
