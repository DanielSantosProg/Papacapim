import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textoBold, styles.logo]}>PAPACAPIM</Text>
      <Text style={[styles.texto, styles.header]}>Entre no Papacapim</Text>
      <View style={styles.inputs}>
        <Text style={styles.texto}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do usuário"
          placeholderTextColor="gray"
        />
        <Text style={styles.texto}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Digite a sua senha"
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.touchable, styles.loginBut]}>
          <Text style={styles.textoBold}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.touchable, styles.forgotPassword]}>
          <Text style={[styles.textoBold, styles.forgotText]}>
            Esqueceu a Senha?
          </Text>
        </TouchableOpacity>
        <Text style={[styles.texto, styles.noAccount]}>
          Não tem uma conta?
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.textoSpan}>Cadastre-se</Text>
          </TouchableOpacity>
        </Text>
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
    top: 15,
    fontSize: 16,
    alignSelf: "center",
  },
});

export default Login;
