import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://api.papacapim.just.pro.br:8000",
  timeout: 5000,
});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("sessionToken");
    return token;
  } catch (error) {
    console.error("Erro ao obter o token:", error);
    return null;
  }
};

const requestUsingToken = async (url, method = "get", data = null) => {
  try {
    const token = await getToken();
    const config = {
      method,
      url: `https://api.papacapim.just.pro.br:8000${url}`,
      headers: {},
    };

    // Adiciona o token ao cabeçalho, se disponível
    if (token) {
      config.headers["x-session-token"] = token;
      console.log("Token enviado:", token); // Confirma o envio do token
    }

    // Se for uma requisição POST ou PUT, inclui os dados
    if (data && (method === "post" || method === "put")) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await api.post("/users", { user: userData });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário: ", error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const response = await requestUsingToken("/users", "get");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    const response = await requestUsingToken("sessions", "post", userData);

    const { id, token, user_login } = response.data;

    await AsyncStorage.setItem("sessionId", id.toString());
    await AsyncStorage.setItem("sessionToken", token);
    await AsyncStorage.setItem("user_login", user_login);

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login: ", error);
    throw error;
  }
};

module.exports = {
  getToken,
  requestUsingToken,
  createUser,
  getUsers,
  loginUser,
};
