import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignUp = ({ navigation }) => {
  const months = [
    { title: "Jan" },
    { title: "Fev" },
    { title: "Mar" },
    { title: "Abr" },
    { title: "Mai" },
    { title: "Jun" },
    { title: "Jul" },
    { title: "Ago" },
    { title: "Set" },
    { title: "Out" },
    { title: "Nov" },
    { title: "Dez" },
  ];
  const days = [];
  for (let i = 1; i <= 30; i++) {
    days.push({ day: i });
  }
  const years = [];
  for (let i = 1920; i <= 2024; i++) {
    years.push({ year: i });
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.textoBold, styles.logo]}>PAPACAPIM</Text>
      <Text style={[styles.texto, styles.header]}>Crie sua conta</Text>
      <View style={styles.inputs}>
        <Text style={styles.texto}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do usuário"
          placeholderTextColor="gray"
        />
        <Text style={styles.texto}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o email"
          placeholderTextColor="gray"
        />
        <Text style={styles.texto}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Digite a sua senha"
          placeholderTextColor="gray"
        />
        <Text style={styles.texto}>Confirme a senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Digite novamente a senha"
          placeholderTextColor="gray"
        />
        <Text style={styles.texto}>Data de nascimento</Text>
      </View>
      <View style={styles.dateInputs}>
        <SelectDropdown
          data={months}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || "Mês"}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <SelectDropdown
          data={days}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.day) || "Dia"}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#EEE" }),
                }}
              >
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.day}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <SelectDropdown
          data={years}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.year) || "Ano"}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.year}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.touchable, styles.signupBut]}>
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
