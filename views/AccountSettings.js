import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AccountSettings({ navigation }) {
  const [isUsernameVisible, setIsUsernameVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Alterar dados da conta</Text>
      <Text style={styles.username}>@user123</Text>

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
          />
          <Text style={styles.label}>Digite a senha novamente:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Confirmar senha"
            placeholderTextColor="#ccc"
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setIsEmailVisible(!isEmailVisible)}
      >
        <Text style={styles.sectionTitle}>Trocar Email</Text>
        <Ionicons
          name={isEmailVisible ? "chevron-up" : "chevron-down"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {isEmailVisible && (
        <View style={styles.sectionContent}>
          <Text style={styles.label}>Digite o Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Confirmar Alterações</Text>
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
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Kameron-Bold",
  },
});
