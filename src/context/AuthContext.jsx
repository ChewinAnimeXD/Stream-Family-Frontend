import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import {
  registerRequest,
  loginRequest,
  verityTokenRequest,
  deleteUserRequest,
  getUsersRequest,
  updateUserRequest,
  getUserRequest
} from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debería estar dentro del proveedor");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await getUsersRequest();
      setUsers(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status === 204) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const res = await updateUserRequest(id, userData);
      if (res.data) {
        setUsers(users.map(user => user._id === id ? res.data : user));
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const signup = async (user) => {
    try {
      await registerRequest(user);
    } catch (error) {
      setErrors(error.response ? error.response.data : ["Error desconocido"]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.data && res.data.token) {
        Cookies.set("token", res.data.token, {
          expires: 1,
          sameSite: "None",
          secure: true
        });
        setIsAuthenticated(true);
        setUser(res.data);
      } else {
        setErrors(["Validando credenciales, intenta de nuevo"]);
      }
    } catch (error) {
      setErrors(error.response ? error.response.data : ["Error desconocido"]);
    }
  };

  const signout = async () => {
    try {
      await axios.post(`/logout`);
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("token");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verityTokenRequest();
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signup, signin, signout, getUsers, getUser, deleteUser, updateUser, users }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
