import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://api.papacapim.just.pro.br",
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
      url: `https://api.papacapim.just.pro.br${url}`,
      headers: {},
      validateStatus: (status) => {
        return status >= 200 && status < 300; // Considere status 200-299 como sucesso
      },
    };

    if (token) {
      config.headers["x-session-token"] = token;
    }

    if (data && (method === "post" || method === "put" || method === "patch")) {
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
    console.error(
      "Erro ao criar usuário: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    const userLogin = await AsyncStorage.getItem("user_login");

    if (!userLogin) {
      throw new Error("Login de usuário não encontrado no AsyncStorage.");
    }

    const user = await requestUsingToken(`/users/${userLogin}`);

    return user;
  } catch (error) {
    console.error(
      "Erro ao buscar o usuário:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const changeUserSettings = async (userData) => {
  try {
    const user = await requestUsingToken(`/users/1`, "patch", {
      user: userData,
    });
    return user;
  } catch (error) {
    console.error(
      "Erro ao buscar esse usuário:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const deleteUser = async () => {
  try {
    const deletedUser = await requestUsingToken(`/users/1`, "delete");
    return deletedUser;
  } catch (error) {
    console.error(
      "Erro ao deletar o usuário:",
      error.response ? error.response.data : error.message
    );
  }
};

const getAllUsers = async () => {
  try {
    const response = await requestUsingToken("/users");
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar usuários:",
      error.response ? error.response.data : error.message
    );
  }
};

const getUser = async (login) => {
  try {
    const response = await requestUsingToken(`/users/${login}`);
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar usuários:",
      error.response ? error.response.data : error.message
    );
  }
};

const searchUser = async (user) => {
  try {
    const response = await requestUsingToken(`/users/${user}`);
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar usuários:",
      error.response ? error.response.data : error.message
    );
  }
};

const searchPost = async (message) => {
  try {
    const response = await requestUsingToken(`/posts?search=${message}`);
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar post:",
      error.response ? error.response.data : error.message
    );
  }
};

const deletePost = async (id) => {
  try {
    const response = await requestUsingToken(`/posts/${id}`, "delete");
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar post:",
      error.response ? error.response.data : error.message
    );
  }
};

const replyPost = async (id, replyText) => {
  try {
    const response = await requestUsingToken(`/posts/${id}/replies`, "post", {
      reply: {
        message: replyText,
      },
    });
    return response;
  } catch (error) {
    console.error(
      "Erro ao responder ao post:",
      error.response ? error.response.data : error.message
    );
  }
};


const getPosts = async () => {
  try {
    const response = await requestUsingToken("/posts");
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar posts:",
      error.response ? error.response.data : error.message
    );
  }
};

const getReplies = async (id) => {
  try {
    const response = await requestUsingToken(`/posts/${id}/replies`);
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar respostas do post:",
      error.response ? error.response.data : error.message
    );
  }
};

const getFollowedPosts = async () => {
  try {
    const response = await requestUsingToken("/posts/1");
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar posts:",
      error.response ? error.response.data : error.message
    );
  }
};

const getUserPosts = async (login) => {
  try {
    const response = await requestUsingToken(`/users/${login}/posts`);
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar posts:",
      error.response ? error.response.data : error.message
    );
  }
};

const getPost = async (id) => {
  try {
    const response = await requestUsingToken(`/posts/${id}`);
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar o post:",
      error.response ? error.response.data : error.message
    );
  }
};

const loginUser = async (userData) => {
  try {
    const response = await api.post("/sessions", userData);

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

const logoutUser = async () => {
  try {
    const sessionId = await AsyncStorage.getItem("sessionId");
    if (!sessionId) throw new Error("ID de sessão não encontrado.");

    const response = await requestUsingToken(
      `/sessions/${sessionId}`,
      "delete"
    );
    await AsyncStorage.removeItem("sessionId");
    await AsyncStorage.removeItem("sessionToken");
    await AsyncStorage.removeItem("user_login");
    return response;
  } catch (error) {
    console.error("Erro ao fazer logout: ", error);
    throw error;
  }
};

const followUser = async (login) => {
  try {
    const response = await requestUsingToken(
      `/users/${login}/followers`,
      "post"
    );
    return response;
  } catch (error) {
    console.error(
      "Erro ao seguir o usuário:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const unfollowUser = async (login) => {
  try {
    const response = await requestUsingToken(
      `/users/${login}/followers/1`,
      "delete"
    );
    return response;
  } catch (error) {
    console.error(
      "Erro ao deixar de seguir o usuário:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getFollowers = async (login) => {
  try {
    const response = await requestUsingToken(`/users/${login}/followers`);
    return response;
  } catch (error) {
    console.error(
      "Erro ao buscar os seguidores desse usuário:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const likePost = async (id) => {
  try {
    const response = await requestUsingToken(`/posts/${id}/likes`, "post");
    return response;
  } catch (error) {
    console.error(
      "Erro ao curtir o post:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const dislikePost = async (id) => {
  try {
    const response = await requestUsingToken(`/posts/${id}/likes/1`, "delete");
    return response;
  } catch (error) {
    console.error(
      "Erro ao descurtir o post:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getLikes = async (id) => {
  try {
    const response = await requestUsingToken(`/posts/${id}/likes`);
    return response;
  } catch (error) {
    console.error(
      "Erro ao procurar curtidas:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const newPost = async (post) => {
  try {
    const response = await requestUsingToken(`/posts`, "post", post);
    return response;
  } catch (error) {
    console.error(
      "Erro ao criar o post:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

module.exports = {
  getToken,
  requestUsingToken,
  createUser,
  loginUser,
  getAllUsers,
  getCurrentUser,
  changeUserSettings,
  deleteUser,
  searchUser,
  searchPost,
  deletePost,
  replyPost,
  getPosts,
  getFollowedPosts,
  getUserPosts,
  getPost,
  getReplies,
  getUser,
  followUser,
  getFollowers,
  unfollowUser,
  logoutUser,
  likePost,
  getLikes,
  dislikePost,
  newPost,
};
