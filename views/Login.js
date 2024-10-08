import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");

  const useLogin = async () => {
    try {
      if (userLogin !== "" && password !== "") {
        const userData = {
          login: userLogin,
          password: password,
        };

        const response = await login(userData);

        if (response) {
          console.log("Login feito com sucesso:", response);
          navigation.navigate("Feed");
        }
      } else {
        console.log("Verifique que os campos estão preenchidos corretamente.");
        Alert.alert("Verifique que os campos estão preenchidos corretamente.");
      }
    } catch (error) {
      Alert.alert(
        "Falha no login",
        "Login ou senha inválidos. Tente novamente."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textoBold, styles.logo]}>PAPACAPIM</Text>
      <Text style={[styles.texto, styles.header]}>Entre no Papacapim</Text>
      <View style={styles.inputs}>
        <Text style={styles.texto}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o seu Login"
          placeholderTextColor="gray"
          value={userLogin}
          onChangeText={setUserLogin}
        />
        <Text style={styles.texto}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Digite a sua senha"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.touchable, styles.loginBut]}
          onPress={useLogin}
        >
          <Text style={styles.textoBold}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchable, styles.forgotPassword]}>
          <Text style={[styles.textoBold, styles.forgotText]}>
            Esqueceu a Senha?
          </Text>
        </TouchableOpacity>
        <View style={styles.noAccount}>
          <Text style={styles.textoBottom}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={[styles.textoBottom, styles.textoSpan]}>
              {" "}
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831",
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
  textoBottom: {
    color: "#EEE",
    fontFamily: "Kameron-Regular",
    fontSize: 16,
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
    color: "#FFF",
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
  touchable: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 50,
  },
  buttons: {
    top: 25,
  },
  loginBut: {
    backgroundColor: "#76ABAE",
    borderRadius: 30,
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
    flexDirection: "row",
    alignItems: "center",
    top: 15,
    justifyContent: "center",
  },
});

export default Login;
