import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ProfileHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require("../assets/imgs/arrow_left.png")}
          style={styles.goBack}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headerUsername}>User123</Text>
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
