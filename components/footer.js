import React, { useState, useContext } from "react";
("react");
import { AuthContext } from "../context/auth";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { logoutUser } from "../ApiController";

const Footer = ({ navigation, page }) => {
  const { logout } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(page);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      console.log("Logout bem-sucedido.");
      logout();
      navigation.popToTop();
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    }
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={() => {
          setSelectedTab("Home");
          navigation.navigate("Feed");
        }}
        style={styles.tab}
      >
        <Image
          source={
            selectedTab === "Home"
              ? require("../assets/imgs/home.png")
              : require("../assets/imgs/home_outline.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedTab("Search");
          navigation.navigate("Search");
        }}
        style={styles.tab}
      >
        <Image
          source={
            selectedTab === "Search"
              ? require("../assets/imgs/search.png")
              : require("../assets/imgs/search_outline.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
        style={styles.tab}
      >
        <Image
          source={
            selectedTab === "Logout"
              ? require("../assets/imgs/logout.png")
              : require("../assets/imgs/logout.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Footer;
