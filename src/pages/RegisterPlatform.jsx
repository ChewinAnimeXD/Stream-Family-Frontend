import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { usePlatform } from "../context/PlatformContext";

function RegisterPlatform() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    signup,
    registerPlatform,
    getPlatform,
    updatePlatform,
    errors: registerErrors,
  } = usePlatform();
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((values) => {
    console.log(values.pin);

    const dataValid = {
      name: values.name,
      sell: values.sell || "no",
      createDate: values.createDate || new Date().toISOString().split("T")[0],
      price: parseFloat(values.price),
      type: values.type,
      email: values.email,
      password: values.password,
      screen: values.screen,
      pin: values.pin,
    };

    if (params.id) {
      updatePlatform(params.id, dataValid);
    } else {
      registerPlatform(dataValid);
      console.log(dataValid);
    }

    navigate("/platforms");
  });

  useEffect(() => {
    async function loadPlatform() {
      if (params.id) {
        const platform = await getPlatform(params.id);
        console.log(platform);
        setValue("name", platform.name);
        setValue("sell", platform.sell || "no");
        setValue(
          "createDate",
          platform.createDate || new Date().toISOString().split("T")[0]
        );
        setValue("price", platform.price);
        setValue("type", platform.type);
        setValue("email", platform.email);
        setValue("password", platform.password);
        setValue("screen", platform.screen);
        setValue("pin", platform.pin);
      } else {
        setValue("sell", "no");
        setValue("createDate", new Date().toISOString().split("T")[0]);
      }
    }
    loadPlatform();
  }, [params.id, getPlatform, setValue]);

  return (
    <Navbar>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
          <p className="font-medium text-xl pt-4 text-white">
            AGREGAR PLATAFORMA
          </p>
        </div>
        <div className="flex ls:h-[calc(70vh-100px)] items-center justify-center">
          <div className="bg-white max-w-4xl w-full p-10 rounded-md border border-x-white">
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="col-span-1">
                <label className="block mb-2">Nombre</label>
                <select
                  id="name"
                  name="name"
                  {...register("name", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                >
                  <option value="Netflix original">Netflix original</option>
                  <option value="Netflix genérico">Netflix genérico</option>
                  <option value="Netflix original pantalla">
                    Netflix original pantalla
                  </option>
                  <option value="Netflix genérico pantalla">
                    Netflix genérico pantalla
                  </option>
                  <option value="MAX (HBO)">MAX (HBO)</option>
                  <option value="Crunchyroll">Crunchyroll</option>
                  <option value="Paramount">Paramount</option>
                  <option value="PLEX">PLEX</option>
                  <option value="VIX">VIX</option>
                  <option value="CANVA 1 mes">CANVA 1 mes</option>
                  <option value="Prime Video">Prime Video</option>
                  <option value="YouTube Premium 1 mes">
                    YouTube Premium 1 mes
                  </option>
                  <option value="YouTube Premium 3 mes">
                    YouTube Premium 3 mes
                  </option>
                  <option value="IPTV">IPTV</option>
                  <option value="Spotify 1 mes">Spotify 1 mes</option>
                  <option value="Spotify 3 mes">Spotify 3 mes</option>
                  <option value="Disney premium">Disney premium</option>
                  <option value="Disney estándar">Disney estándar</option>
                  <option value="DIRECTV con win">DIRECTV con win</option>
                  <option value="DIRECTV basic">DIRECTV basic</option>
                  <option value="Apple TV">Apple TV</option>
                </select>
                {errors.name && (
                  <p className="text-red-500">El nombre es requerido</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block mb-2">Precio</label>
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                  placeholder="Precio de la plataforma"
                />
                {errors.price && (
                  <p className="text-red-500">El precio es requerido</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block mb-2">Tipo</label>
                <select
                  id="type"
                  name="type"
                  {...register("type", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                >
                  <option value="completa">Completa</option>
                  <option value="pantalla">Pantalla</option>
                </select>
                {errors.type && (
                  <p className="text-red-500">El tipo es requerido</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block mb-2">Correo</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                  placeholder="Correo"
                />
                {errors.email && (
                  <p className="text-red-500">El correo es requerido</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block mb-2">Contraseña</label>
                <input
                  type="text"
                  {...register("password", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                  placeholder="Contraseña"
                />
                {errors.password && (
                  <p className="text-red-500">La contraseña es requerida</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block mb-2">Pantalla</label>
                <input
                  type="text"
                  {...register("screen", { required: false })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                  placeholder="Pantalla"
                />
              </div>

              <div className="col-span-1">
                <label className="block mb-2">PIN</label>
                <input
                  type="text"
                  {...register("pin", { required: false })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                  placeholder="PIN"
                />
              </div>

              <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white px-3 py-2 rounded-md"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default RegisterPlatform;
