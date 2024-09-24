import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const User = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log("Post User: ", props.login);
            props.navigation.navigate("UserProfile", { user: props.login });
          }}
        >
          <Image
            source={require("../assets/imgs/user_icon.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{props.username}</Text>
      </View>
      <Text style={styles.texto}>@{props.login}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#31363F",
    borderBottomWidth: 0.8,
    borderBottomColor: "#76ABAE",
  },
  texto: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: "#EEE",
    fontFamily: "Kameron-Regular",
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userName: {
    paddingHorizontal: 15,
    color: "#EEE",
    fontFamily: "Kameron-Bold",
    fontSize: 20,
  },
});

export default User;
