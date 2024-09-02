import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verityTokenRequest, deleteUserRequest, getUsersRequest, updateUserRequest, getUserRequest } from "../api/auth";
import Cookies from "js-cookie";

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
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status === 204) setUsers(users.filter((user) => user._id !== id)); 
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      if (res.data && res.data.token) { 
        Cookies.set("token", res.data.token, { 
          expires: 1,
          sameSite: "None", // Asegura que la cookie se envíe entre diferentes dominios/subdominios.
          secure: true // Asegura que la cookie solo se envíe a través de HTTPS.
        });
        setIsAuthenticated(true);
        setUser(res.data);
      } else {
        console.error("Validando Credenciales, Intenta de nuevo");
        setErrors(["Validando Credenciales, Intenta de nuevo"]);
      }
    } catch (error) {
      setErrors([error.response?.data?.message || "Error desconocido"]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = async (id, user) => {
    try {
      await updateUserRequest(id, user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const res = await verityTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(res.data);
        }
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        getUsers,
        getUser,
        deleteUser,
        updateUser,
        loading,
        user,
        isAuthenticated,
        errors,
        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
