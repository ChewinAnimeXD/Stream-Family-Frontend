
import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => {
  return axios.post(`/login`, user).then((response) => {
    console.log("Respuesta completa del backend:", response); // Imprime la respuesta completa
    const token = response.data.token; // Intento de acceder al token
    console.log("aca esta el token", token); // Verifica si el token está definido
    axios.defaults.headers.common["autentification"] = token; // Configuración de headers de Axios

    return response;
  });
};

//export const loginRequest = (user) => axios.post(`/login`, user);

export const verityTokenRequest = () => axios.get('/verify');

export const deleteUserRequest = async (id) => axios.delete(`/userPage/${id}`);

export const getUsersRequest = async () => axios.get("/userPage");

export const updateUserRequest = async (id, user) => axios.put(`/register/${id}`, user);

export const getUserRequest = async (id) => axios.get(`/register/${id}`);
