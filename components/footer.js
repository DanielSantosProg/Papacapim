// components/Footer.js
import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

const Footer = () => {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={() => setSelectedTab("Home")}
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
        onPress={() => setSelectedTab("Search")}
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
        onPress={() => setSelectedTab("Notifications")}
        style={styles.tab}
      >
        <Image
          source={
            selectedTab === "Notifications"
              ? require("../assets/imgs/notification.png")
              : require("../assets/imgs/notification_outline.png")
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
