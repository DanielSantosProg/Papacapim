import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/header";
import Tabs from "../components/tabs";
import Footer from "../components/footer";
import Post from "../components/post";
import { useEffect, useState } from "react";
import { getPosts } from "../ApiController";

const Feed = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getAllPosts = async () => {
    try {
      setErrorMessage(""); // Limpa mensagem de erro antes de cada busca
      const response = await getPosts();

      // Se a resposta for uma lista vazia ou um objeto indefinido
      if (!response || (Array.isArray(response) && response.length === 0)) {
        setErrorMessage("Posts não encontrados.");
        setPosts([]); // Limpa a lista de usuários
      } else {
        // Garante que o resultado é um array
        const postsArray = Array.isArray(response) ? response : [response];
        setPosts(postsArray);
      }
    } catch (error) {
      // Se a API retornar um 404, exibe uma mensagem de usuário não encontrado
      if (error.response && error.response.status === 404) {
        setErrorMessage("Posts não encontrados.");
      } else {
        // Exibe outras mensagens de erro genérico
        setErrorMessage(
          error.response ? error.response.data : "Erro ao buscar posts."
        );
      }
      setPosts([]); // Limpa a lista de usuários no caso de erro
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Tabs />
      {errorMessage ? (
        <View style={styles.sectionContent}>
          <Text style={styles.texto}>{errorMessage}</Text>
        </View>
      ) : null}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {posts.length > 0
          ? posts.map((post, index) => (
              <Post
                post={post}
                key={index}
                id={post.id}
                user={post.user_login}
                navigation={navigation}
                message={post.message}
              />
            ))
          : null}
      </ScrollView>
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate("Post")}
      >
        <Text style={[styles.texto, styles.buttonText]}>+</Text>
      </TouchableOpacity>
      <Footer navigation={navigation} page="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  textoBold: {
    color: "#EEE",
    fontFamily: "Kameron-Bold",
    fontSize: 24,
  },
  texto: {
    color: "#EEE",
    fontFamily: "Kameron-Regular",
    fontSize: 20,
  },
  textoSpan: {
    color: "#76ABAE",
  },
  logo: {
    bottom: 170,
  },
  header: {
    bottom: 80,
    fontFamily: "Kameron-SemiBold",
  },
  input: {
    marginTop: 5,
    marginBottom: 15,
    borderColor: "#FFF",
    borderWidth: 0.3,
    borderRadius: 4,
    width: 300,
    height: 50,
    backgroundColor: "#31363F",
  },
  inputs: {
    bottom: 30,
  },
  postButton: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#76ABAE",
    borderRadius: 30,
    position: "absolute",
    right: 40,
    bottom: 80,
  },
  buttonText: {
    fontSize: 32,
    fontFamily: "Kameron-Bold",
  },
  buttons: {
    top: 25,
  },
  forgotPassword: {
    borderColor: "#EEE",
    borderWidth: 0.3,
    borderRadius: 30,
  },
  forgotText: {
    fontSize: 20,
  },
  noAccount: {
    top: 15,
    fontSize: 16,
    alignSelf: "center",
  },
});

export default Feed;
