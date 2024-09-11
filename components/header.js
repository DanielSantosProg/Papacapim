import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Header = ({ navigation }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
        <Image
          source={require("../assets/imgs/user_icon.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Text style={styles.headerText}>PAPACAPIM</Text>
      <TouchableOpacity onPress={toggleDropdown}>
        <Image
          source={require("../assets/imgs/menu_vertical.png")}
          style={styles.icon}
        />
      </TouchableOpacity>

      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            onPress={() => {
              setIsDropdownVisible(false);
              navigation.navigate("AccountSettings");
            }}
          >
            <Text style={styles.dropdownItem}>Configurações da conta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsDropdownVisible(false);
              // Logout
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.dropdownItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
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
  dropdownMenu: {
    position: "absolute",
    right: 0,
    top: 40,
    backgroundColor: "#2e3b47",
    padding: 10,
    zIndex: 1000,
  },
  dropdownItem: {
    color: "#ffffff",
    fontFamily: "Kameron-Regular",
    fontSize: 16,
    paddingVertical: 5,
    zIndex: 1000,
  },
});

export default Header;
