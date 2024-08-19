import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
        <Image
          source={require("../assets/imgs/user_icon.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Text style={styles.headerText}>PAPACAPIM</Text>
      <TouchableOpacity onPress={() => navigation.navigate("AccountSettings")}>
        <Image
          source={require("../assets/imgs/menu_vertical.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: "#EEE",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Kameron-Bold",
    color: "#ffffff",
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default Header;
