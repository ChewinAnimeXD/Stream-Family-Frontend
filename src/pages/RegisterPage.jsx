import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    signup,
    getUser,
    updateUser,
    errors: registerErrors,
  } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);

  const onSubmit = handleSubmit((values) => {
    const updatedBalance = balance + parseFloat(values.balance || 0);

    const dataValid = {
      username: values.username,
      email: values.email,
      password: values.password, // Solo actualiza si se ha ingresado una nueva contraseña
      role: values.role,
      balance: updatedBalance,
    };

    if (params.id) {
      updateUser(params.id, dataValid);
    } else {
      signup(dataValid);
    }

    navigate("/userPage");
  });

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id);
        console.log(user);
        setValue("username", user.username);
        setValue("email", user.email);
        setValue("role", user.role);
        setValue("balance", user.balance);
        setBalance(user.balance); // Actualiza el estado local del balance
      }
    }
    loadUser();
  }, [params.id, getUser, setValue]);

  return (
    <Navbar>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <div className="bg-[#1E1F24] p-4 rounded-md shadow-md mb-5">
          <p className="font-medium text-xl pt-4 text-white">
            REGISTRO DE USUARIO
          </p>
        </div>
        <div className="flex ls:h-[calc(70vh-100px)] items-center justify-center">
          <div className="bg-white max-w-4xl w-full p-10 rounded-md border border-white">
            {registerErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white" key={i}>
                {error}
              </div>
            ))}
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block mb-2">Nombre de Usuario</label>
                <input
                  type="text"
                  {...register("username", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                  placeholder="Nombre de usuario"
                />
                {errors.username && (
                  <p className="text-red-500">El nombre de usuario es requerido</p>
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
                  type="password"
                  {...register("password")}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                  placeholder="Contraseña"
                />
                {errors.password && (
                  <p className="text-red-500">La contraseña es requerida</p>
                )}
              </div>

              <div className="col-span-1">
                <p className="text-gray-600 mb-2">Saldo Actual: {balance}</p>
                <input
                  type="number"
                  {...register("balance", { required: false })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                  placeholder="Saldo"
                />
              </div>

              <div className="col-span-1">
                <label className="block mb-2">Rol</label>
                <select
                  {...register("role", { required: true })}
                  className="w-full bg-white text-gray-600 px-4 py-2 rounded-md border border-gray-400"
                >
                  <option value="" disabled hidden>
                    Selecciona un rol
                  </option>
                  <option value="admin">Administrador</option>
                  <option value="vendedor">Vendedor</option>
                </select>
                {errors.role && (
                  <p className="text-red-500">El rol es requerido</p>
                )}
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

export default RegisterPage;
