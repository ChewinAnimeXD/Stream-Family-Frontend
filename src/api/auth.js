import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => {
  return axios.post(`/login`, user).then((response) => {
    //console.log("Respuesta completa del backend:", response); // Imprime la respuesta completa
    const token = response.data.token; // Obtén el token de la respuesta
    //console.log("Token:", token);
    // No es necesario configurar el token en los headers aquí, ya que se maneja con cookies

    return response;
  });
};

export const verityTokenRequest = () => axios.get('/verify');

export const deleteUserRequest = async (id) => axios.delete(`/userPage/${id}`);

export const getUsersRequest = async () => axios.get("/userPage");

export const updateUserRequest = async (id, user) => axios.put(`/register/${id}`, user);

export const getUserRequest = async (id) => axios.get(`/register/${id}`);