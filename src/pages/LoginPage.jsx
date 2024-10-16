import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../index.css";
import logo from "../assets/banner.png"; // Asegúrate de que la ruta de la imagen sea correcta

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Estado para gestionar la carga
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true); // Iniciar carga
    await signin(data); // Esperar a que se complete la función signin
    setLoading(false); // Finalizar carga
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/homePage");
  }, [isAuthenticated]);

  return (
    <div className="register flex flex-col min-h-screen rounded-lg md:p-8">
      <div className="mb-5 ml-28 mt-10">
        <img src={logo} alt="Imagen desde Google Drive" className="w-28 mr-4" />
      </div>
      <div className="ml-8">
        <h1 className="text-gray-100 text-3xl font-medium tracking-widest">
          STREAM.FAMILY
        </h1>
      </div>
      <div className="p-8">
        <h3 className="text-gray-500 uppercase text-sm font-bold mb-2">
          Ingresa a la plataforma
        </h3>
        <h1 className="text-6xl text-white font-medium mb-2">
          Inicia sesión<span className="text-cyan-500">.</span>
        </h1>
        <form onSubmit={onSubmit} className="mt-8">
          <div className="max-w-lg mb-4">
            {signinErrors.map((error, i) => (
              <div
                className="bg-red-500 p-2 text-white text-center my-2"
                key={i}
              >
                {error}
              </div>
            ))}
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Correo"
            />
            {errors.email && (
              <p className="text-red-500">El correo es requerido </p>
            )}
          </div>

          <div className="max-w-lg mb-4">
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Contraseña"
            />
            {errors.password && (
              <p className="text-red-500">La contraseña es requerida </p>
            )}
          </div>
          <div className="max-w-lg flex justify-center md:justify-end mb-6"></div>
          <div className="max-w-lg">
            <button
              type="submit"
              className={`bg-cyan-600 text-white w-full py-3 px-4 rounded-full transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-700'}`}
              disabled={loading} // Deshabilitar el botón mientras se carga
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0a12 12 0 00-12 12h4z"
                    ></path>
                  </svg>
                  Cargando...
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
