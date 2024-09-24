import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import ProfileHeader from "../components/profileHeader";
import ProfileTabs from "../components/profileTabs";
import Footer from "../components/footer";
import {
  getUser,
  followUser,
  unfollowUser,
  getFollowers,
} from "../ApiController";

const UserProfile = ({ route, navigation }) => {
  const { currentName, currentLogin } = useContext(AuthContext);
  const { user } = route.params;
  const [name, setName] = useState("");
  const [login, setLogin] = useState(user);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [followerLogins, setFollowerLogins] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const user = await getUser(login);
      setName(user.name);
    } catch (error) {
      console.log(
        "Usuário não encontrado: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const follow = async () => {
    try {
      await followUser(login);
      setIsFollowingUser(true);
    } catch (error) {
      console.log(
        "Erro ao seguir o usuário: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const unfollow = async () => {
    try {
      await unfollowUser(login);
      setIsFollowingUser(false);
    } catch (error) {
      console.log(
        "Erro ao deixar de seguir o usuário: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const findFollowers = async () => {
    try {
      const response = await getFollowers(login);
      setIsFollowingUser(
        response.some((item) => item.follower_login === currentLogin)
      );
      setFollowerLogins(response.map((item) => item.follower_login));
    } catch (error) {
      console.log(
        "Erro ao seguir o usuário: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
      await findFollowers();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#76ABAE" />
      </View>
    );
  }

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
        <TouchableOpacity>
          <Image
            source={require("../assets/imgs/more.png")}
            style={styles.link}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../assets/imgs/message.png")}
            style={styles.link}
          />
        </TouchableOpacity>
        {isFollowingUser ? (
          <TouchableOpacity
            style={styles.touchableUnfollow}
            onPress={() => unfollow()}
          >
            <Text style={styles.follow}>Unfollow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.touchable} onPress={() => follow()}>
            <Text style={styles.follow}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.userText}>
        <Text style={styles.textoBold}>{name}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222831",
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
  touchableUnfollow: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 50,
    borderRadius: 2,
    backgroundColor: "red",
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

export default UserProfile;
