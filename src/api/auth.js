import axios from "./axios";

// Registro de un nuevo usuario
export const registerRequest = async (user) => {
  try {
    const response = await axios.post(`/register`, user);
    return response;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Inicio de sesión
export const loginRequest = async (user) => {
  try {
    const response = await axios.post(`/login`, user);
    console.log("Respuesta completa del backend:", response); // Imprime la respuesta completa

    const token = response.data.token; // Obtén el token de la respuesta
    console.log("Token obtenido:", token); // Verifica si el token está definido

    // Configuración del encabezado Authorization de Axios para futuras solicitudes
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// Verificar token
export const verityTokenRequest = async () => {
  try {
    return await axios.get('/verify');
  } catch (error) {
    console.error("Error al verificar el token:", error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUserRequest = async (id) => {
  try {
    return await axios.delete(`/userPage/${id}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// Obtener todos los usuarios
export const getUsersRequest = async () => {
  try {
    return await axios.get("/userPage");
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUserRequest = async (id, user) => {
  try {
    return await axios.put(`/register/${id}`, user);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// Obtener un usuario por ID
export const getUserRequest = async (id) => {
  try {
    return await axios.get(`/register/${id}`);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};
