import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../ApiController";

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
      console.log("Usuário: ", currentUserLogin);
      console.log("Login: ", currentUserName);
    } catch (error) {
      console.log(
        "Usuário não encontrado: ",
        error.response ? error.response.data : error.message
      );
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
      value={{ currentName: currentUserName, currentLogin: currentUserLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
