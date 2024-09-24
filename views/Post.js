import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import Footer from "../components/footer";
import ProfileHeader from "../components/profileHeader";

const Post = ({ navigation }) => {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <ProfileHeader navigation={navigation} />

      <View style={styles.postContainer}>
        <Image
          source={require("../assets/imgs/profile_pic.png")}
          style={styles.userPic}
        />
        <TextInput
          style={styles.input}
          placeholder="O que está acontecendo?"
          placeholderTextColor="#ccc"
          multiline
          numberOfLines={4}
          onChangeText={setText}
          value={text}
        />
      </View>

      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate("Feed")}
      >
        <Text style={styles.postButtonText}>Postar</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Footer navigation={navigation} page="" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginTop: 20,
    flexGrow: 1,
  },
  userPic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    top: 40,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    color: "white",
    fontSize: 18,
    maxHeight: 150,
    paddingVertical: 10,
  },
  postButton: {
    backgroundColor: "#76ABAE",
    borderRadius: 20,
    alignSelf: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  postButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Post;
