import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import ProfileHeader from "../components/profileHeader";
import ProfileTabs from "../components/profileTabs";
import Footer from "../components/footer";
import { getCurrentUser, getFollowers } from "../ApiController";

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState("");

  const getUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log("Usuário: ", user);
      setUsername(user.name);
      setLogin(user.login);
    } catch (error) {
      console.log(
        "Usuário não encontrado: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const findFollowers = async () => {
    try {
      const followers = await getFollowers();
      console.log(followers);
    } catch (error) {
      console.log(
        "Usuário não encontrado: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    getUser();
    findFollowers();
  }, []);

  return (
    <View style={styles.container}>
      <ProfileHeader navigation={navigation} />
      <Image
        source={require("../assets/imgs/user_background.png")}
        style={styles.profilePic}
      />
      <View style={styles.profileLinks}>
        <Image
          source={require("../assets/imgs/profile_pic.png")}
          style={styles.userPic}
        />
      </View>
      <View style={styles.userText}>
        <Text style={styles.textoBold}>{username}</Text>
        <Text style={styles.texto}>@{login}</Text>
        <Text style={[styles.texto, styles.description]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          vel.
        </Text>
      </View>
      <ProfileTabs />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}></View>
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
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
    bottom: 170,
  },
  header: {
    bottom: 80,
    fontFamily: "Kameron-SemiBold",
  },
  textoBold: {
    color: "#EEE",
    fontFamily: "Kameron-Bold",
    fontSize: 24,
  },
  texto: {
    color: "#A5A5A5",
    fontFamily: "Kameron-Regular",
    fontSize: 18,
  },
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#76ABAE",
    left: 20,
    top: 20,
  },
  profilePic: {
    width: "100%",
    height: 140,
  },
  userPic: {
    width: 130,
    height: 130,
    bottom: 70,
    marginLeft: 20,
  },
  profileLinks: {
    flexDirection: "row",
    height: 90,
  },
  link: {
    width: 45,
    height: 45,
    marginHorizontal: 5,
    left: 15,
    top: 20,
  },
  follow: {
    color: "#FFF",
    fontFamily: "Kameron-Bold",
    fontSize: 18,
  },
  userText: {
    bottom: 20,
    left: "7%",
  },
  description: {
    top: 10,
    color: "#EEE",
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});

export default Profile;
