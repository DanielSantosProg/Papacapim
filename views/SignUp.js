import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useState } from "react";
import { createUser } from "../ApiController";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  const signUp = async () => {
    try {
      if (
        name !== "" &&
        password !== "" &&
        confirm !== "" &&
        email !== "" &&
        password === confirm
      ) {
        const userData = {
          login: email,
          name: name,
          password: password,
          confirmPassword: confirm,
        };

        const response = await createUser(userData);
        console.log("Usuário criado com sucesso:", response);
        Alert.alert("Usuário criado com sucesso:", response);
        navigation.navigate("Login");
      } else {
        console.log("Preencha todos os campos e verifique as senhas.");
        Alert.alert("Preencha todos os campos e verifique as senhas.");
      }
    } catch (error) {
      console.log("Erro no cadastro:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textoBold, styles.logo]}>PAPACAPIM</Text>
      <Text style={[styles.texto, styles.header]}>Crie sua conta</Text>
      <View style={styles.inputs}>
        <Text style={styles.texto}>Nome de Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do usuário"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.texto}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
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
        <Text style={styles.texto}>Confirme a senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Digite novamente a senha"
          placeholderTextColor="gray"
          value={confirm}
          onChangeText={setConfirm}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.touchable, styles.signupBut]}
          onPress={signUp}
        >
          <Text style={styles.textoBold}>Criar conta</Text>
        </TouchableOpacity>
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
  textoSpan: {
    color: "#76ABAE",
  },
  logo: {
    bottom: 70,
  },
  header: {
    bottom: 40,
    fontFamily: "Kameron-SemiBold",
    fontSize: 24,
  },
  input: {
    marginTop: 5,
    color: "#FFF",
    marginBottom: 15,
    borderColor: "#FFF",
    borderWidth: 0.3,
    borderRadius: 4,
    width: 300,
    height: 50,
    backgroundColor: "#31363F",
  },
  inputs: {
    bottom: 10,
  },
  dateInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 50,
    top: 20,
  },
  buttons: {
    top: 25,
  },
  signupBut: {
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
    top: 15,
    fontSize: 16,
    alignSelf: "center",
  },
  dropdownButtonStyle: {
    width: 100,
    height: 50,
    marginHorizontal: 2,
    backgroundColor: "#31363F",
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#EEE",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default SignUp;
