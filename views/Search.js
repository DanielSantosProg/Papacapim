import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import User from "../components/user";
import { searchUser } from "../ApiController";

const Search = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const searchUsers = async () => {
    try {
      setErrorMessage(""); // Limpa mensagem de erro antes de cada busca
      const response = await searchUser(searchedUser);

      // Se a resposta for uma lista vazia ou um objeto indefinido
      if (!response || (Array.isArray(response) && response.length === 0)) {
        setErrorMessage("Usuário não encontrado.");
        setUsers([]); // Limpa a lista de usuários
      } else {
        // Garante que o resultado é um array
        const users = Array.isArray(response) ? response : [response];
        setUsers(users);
      }
    } catch (error) {
      // Se a API retornar um 404, exibe uma mensagem de usuário não encontrado
      if (error.response && error.response.status === 404) {
        setErrorMessage("Usuário não encontrado.");
      } else {
        // Exibe outras mensagens de erro genérico
        setErrorMessage(
          error.response ? error.response.data : "Erro ao buscar usuários."
        );
      }
      setUsers([]); // Limpa a lista de usuários no caso de erro
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.sectionContent}>
        <Text style={styles.label}>Digite o nome desejado:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          placeholderTextColor="#ccc"
          value={searchedUser}
          onChangeText={setSearchedUser}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchUsers}>
          <Text style={styles.searchButtonText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <View style={styles.sectionContent}>
          <Text style={styles.texto}>{errorMessage}</Text>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {users.length > 0
          ? users.map((user, index) => (
              <User
                key={index}
                username={user.name}
                login={user.login}
                navigation={navigation}
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
      <Footer navigation={navigation} page="Search" />
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
});

export default Search;
