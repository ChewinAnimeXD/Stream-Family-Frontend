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


  return (
    <div>
      <div>
        <div className="bg-cyan-900">
          <h3 >{platform.name}</h3>
        
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
