import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser, loginUser } from "../ApiController";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [currentUserLogin, setCurrentUserLogin] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const getLoggedUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log("Usuário: ", user);
      setCurrentUserLogin(user.login);
      setCurrentUserName(user.name);
    } catch (error) {
      console.log(
        "Usuário não encontrado: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const logout = () => {
    setCurrentUserLogin("");
    setCurrentUserName("");
  };

  const login = async (userData) => {
    try {
      await loginUser(userData); // Chama a função de login do controller
      await getLoggedUser(); // Atualiza o contexto quando houver novo login
    } catch (error) {
      console.log("Erro ao fazer login:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLoggedUser();
    };

    fetchData();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentName: currentUserName,
        currentLogin: currentUserLogin,
        setCurrentUserLogin,
        setCurrentUserName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
