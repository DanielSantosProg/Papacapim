import React from "react";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getCurrentUser } from "../ApiController";

const ProfileHeader = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const getUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log("Usuário: ", user);
      setUsername(user.name);
    } catch (error) {
      console.log(
        "Usuário não encontrado: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require("../assets/imgs/arrow_left.png")}
          style={styles.goBack}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headerUsername}>{username}</Text>
        <Text style={styles.headerText}>0 posts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  textContainer: {
    flexDirection: "column",
  },
  goBack: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 40,
  },
  headerText: {
    fontFamily: "Kameron-Regular",
    color: "#A5A5A5",
  },
  headerUsername: {
    color: "#EEE",
    fontSize: 18,
    fontFamily: "Kameron-Bold",
  },
});

export default ProfileHeader;
