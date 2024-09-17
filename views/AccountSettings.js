import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getCurrentUser,
  changeUserSettings,
  deleteUser,
} from "../ApiController";

export default function AccountSettings(props) {
  const [newUsername, setNewUsername] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [newLogin, setNewLogin] = useState(null);
  const [login, setLogin] = useState("");

  const [isUsernameVisible, setIsUsernameVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginVisible, setisLoginVisible] = useState(false);

  const getUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log("Usuário: ", user);
      setLogin(user.login);
      setUsername(user.name);
    } catch (error) {
      console.log(
        "Usuário não encontrado: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const changeUserDetails = async () => {
    try {
      const userData = {};

      if (newUsername) {
        userData.name = newUsername;
      } else {
        userData.name = username; // mantém o valor atual se o nome de usuário não for alterado
      }

      if (newLogin) {
        userData.login = newLogin;
      } else {
        userData.login = login; // mantém o valor atual se o login não for alterado
      }

      if (password !== "" && confirm !== "") {
        if (password === confirm) {
          userData.password = password;
          userData.password_confirmation = confirm;
        } else {
          console.log("Erro: Verifique se as senhas estão corretas.");
          Alert.alert("Erro", "Verifique se as senhas estão corretas.");
          return; // Sai da função se as senhas não forem iguais
        }
      }

      if (Object.keys(userData).length > 0) {
        const response = await changeUserSettings(userData);
        console.log("Usuário alterado com sucesso: ", JSON.stringify(response));
        Alert.alert("Usuário alterado com sucesso");
      } else {
        console.log("Nenhuma alteração detectada");
        Alert.alert("Erro", "Nenhuma alteração foi detectada.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Erro ao alterar dados: ", error.response.data.message);
        Alert.alert("Erro: ", error.response.data.message);
      } else {
        console.log("Erro ao alterar dados: ", error.message);
        Alert.alert("Erro: ", error.message);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Alterar dados da conta</Text>
      <Text style={styles.username}>@{login}</Text>

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setIsUsernameVisible(!isUsernameVisible)}
      >
        <Text style={styles.sectionTitle}>Trocar Nome de Usuário</Text>
        <Ionicons
          name={isUsernameVisible ? "chevron-up" : "chevron-down"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {isUsernameVisible && (
        <View style={styles.sectionContent}>
          <Text style={styles.label}>Digite o nome desejado:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Text style={styles.sectionTitle}>Trocar Senha</Text>
        <Ionicons
          name={isPasswordVisible ? "chevron-up" : "chevron-down"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {isPasswordVisible && (
        <View style={styles.sectionContent}>
          <Text style={styles.label}>Digite a nova senha:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Nova senha"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.label}>Digite a senha novamente:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Confirmar senha"
            placeholderTextColor="#ccc"
            value={confirm}
            onChangeText={setConfirm}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setisLoginVisible(!isLoginVisible)}
      >
        <Text style={styles.sectionTitle}>Trocar Login de usuário</Text>
        <Ionicons
          name={isLoginVisible ? "chevron-up" : "chevron-down"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {isLoginVisible && (
        <View style={styles.sectionContent}>
          <Text style={styles.label}>Digite o novo Login:</Text>
          <TextInput
            style={styles.input}
            placeholder="Login"
            placeholderTextColor="#ccc"
            value={login}
            onChangeText={setLogin}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          changeUserDetails();

          Alert.alert("Faça login novamente.");
          props.navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Confirmar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => {
          deleteUser();
          props.navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Deletar Usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1f2b36",
  },
  header: {
    fontFamily: "Kameron-Regular",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
  },
  username: {
    fontFamily: "Kameron-Regular",
    fontSize: 18,
    color: "#ccc",
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#EEE",
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Kameron-Regular",
    fontSize: 20,
    color: "white",
  },
  sectionContent: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: "Kameron-Regular",
    color: "#ccc",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#2e3b47",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    fontSize: 16,
    fontFamily: "Kameron-Regular",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#53a393",
    paddingVertical: 15,
    marginVertical: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Kameron-Bold",
  },
  buttonDelete: {
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
