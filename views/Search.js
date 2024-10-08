import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import User from "../components/user";
import Post from "../components/post";
import { searchUser, searchPost } from "../ApiController";

const Search = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState("User");

  const search = async () => {
    try {
      setErrorMessage(""); // Limpa mensagem de erro antes de cada busca
      let response;

      if (searchType === "User") {
        response = await searchUser(searchedUser);
      } else {
        response = await searchPost(message);
      }

      // Se a resposta for uma lista vazia ou um objeto indefinido
      if (!response || (Array.isArray(response) && response.length === 0)) {
        setErrorMessage(
          searchType === "User"
            ? "Usuário não encontrado."
            : "Post não encontrado."
        );
        setUsers([]);
        setPosts([]);
      } else {
        // Garante que o resultado é um array
        if (searchType === "User") {
          const users = Array.isArray(response) ? response : [response];
          setUsers(users);
          setPosts([]);
        } else {
          const posts = Array.isArray(response) ? response : [response];
          setPosts(posts);
          setUsers([]);
        }
      }
    } catch (error) {
      // Se a API retornar um 404, exibe uma mensagem de usuário não encontrado
      if (error.response && error.response.status === 404) {
        setErrorMessage(
          searchType === "User"
            ? "Usuário não encontrado."
            : "Post não encontrado."
        );
      } else {
        setErrorMessage(
          error.response ? error.response.data : "Erro ao buscar."
        );
      }
      setUsers([]); // Limpa a lista no caso de erro
      setPosts([]); // Limpa a lista no caso de erro
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await search();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#76ABAE" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.sectionContent}>
        <Text style={styles.label}>Selecione o tipo de busca:</Text>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setSearchType("User")}
          >
            <Text style={styles.radioButtonText}>
              {searchType === "User" ? "●" : "○"} Usuário
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setSearchType("Post")}
          >
            <Text style={styles.radioButtonText}>
              {searchType === "Post" ? "●" : "○"} Post
            </Text>
          </TouchableOpacity>
        </View>

        {searchType === "User" ? (
          <>
            <Text style={styles.label}>Digite o nome desejado:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              placeholderTextColor="#ccc"
              value={searchedUser}
              onChangeText={setSearchedUser}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Digite o conteúdo do post:</Text>
            <TextInput
              style={styles.input}
              placeholder="Conteúdo do post"
              placeholderTextColor="#ccc"
              value={message}
              onChangeText={setMessage}
            />
          </>
        )}

        <TouchableOpacity style={styles.searchButton} onPress={search}>
          <Text style={styles.searchButtonText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#76ABAE" />
        </View>
      ) : errorMessage ? (
        <View style={styles.sectionContent}>
          <Text style={styles.texto}>{errorMessage}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {searchType === "User" && users.length > 0
            ? users.map((user, index) => (
                <User
                  key={index}
                  username={user.name}
                  login={user.login}
                  navigation={navigation}
                />
              ))
            : null}

          {searchType === "Post" && posts.length > 0
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
      )}

      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate("Post")}
      >
        <Text style={[styles.texto, styles.buttonText]}>+</Text>
      </TouchableOpacity>
      <Footer navigation={navigation} page="Search" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#FFF",
    width: 300,
    height: 50,
    backgroundColor: "#31363F",
  },
  searchButton: {
    backgroundColor: "#76ABAE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Kameron-Bold",
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
  sectionContent: {
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "Kameron-Regular",
    color: "#ccc",
    marginBottom: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  radioButton: {
    marginHorizontal: 10,
  },
  radioButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default Search;
