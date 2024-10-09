import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const ReplyBox = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            if (props.user === "currentLogin") {
              props.navigation.navigate("Profile");
            } else {
              props.navigation.navigate("UserProfile", { user: props.user });
            }
          }}
        >
          <Image
            source={require("../assets/imgs/user_icon.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{props.user}</Text>
      </View>

      <Text style={styles.texto}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#31363F",
    borderBottomWidth: 0.8,
    borderBottomColor: "#76ABAE",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  texto: {
    color: "#fff",
  },
});

export default ReplyBox;
