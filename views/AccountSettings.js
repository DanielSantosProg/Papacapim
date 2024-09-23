import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
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
import { changeUserSettings, deleteUser } from "../ApiController";
import { logoutUser } from "../ApiController";

export default function AccountSettings(props) {
  const { currentName, currentLogin, logout } = useContext(AuthContext);

  // Inicializa os novos valores de nome e login com os valores do contexto
  const [newUsername, setNewUsername] = useState(currentName);
  const [newLogin, setNewLogin] = useState(currentLogin);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [isUsernameVisible, setIsUsernameVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginVisible, setisLoginVisible] = useState(false);

  const changeUserDetails = async () => {
    try {
      const userData = {};

      if (newUsername) {
        userData.name = newUsername;
      }

      if (newLogin) {
        userData.login = newLogin;
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

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log("Logout bem-sucedido.");
      logout();
      props.navigation.popToTop();
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Alterar dados da conta</Text>
      <Text style={styles.username}>@{newLogin}</Text>

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
            value={newUsername} // Usa o novo nome
            onChangeText={setNewUsername} // Atualiza o novo nome
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
            value={newLogin} // Usa o novo login
            onChangeText={setNewLogin} // Atualiza o novo login
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          changeUserDetails();
          handleLogout();
        }}
      >
        <Text style={styles.buttonText}>Confirmar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonDelete}
        onPress={() => {
          deleteUser();
          handleLogout();
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
