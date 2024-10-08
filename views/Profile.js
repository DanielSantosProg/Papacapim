import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth";
import ProfileHeader from "../components/profileHeader";
import ProfileTabs from "../components/profileTabs";
import Footer from "../components/footer";
import Post from "../components/post";
import { getCurrentUser, getUserPosts } from "../ApiController";

const Profile = ({ navigation }) => {
  const { currentName, currentLogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const findPosts = async () => {
    try {
      setErrorMessage(""); // Limpa mensagem de erro antes de cada busca

      const response = await getUserPosts(currentLogin);

      // Se a resposta for uma lista vazia ou um objeto indefinido
      if (!response || (Array.isArray(response) && response.length === 0)) {
        setErrorMessage("Posts não encontrados.");
        setPosts([]); // Limpa a lista de posts
      } else {
        // Garante que o resultado é um array
        const postsArray = Array.isArray(response) ? response : [response];
        setPosts(postsArray);
      }
    } catch (error) {
      // Se a API retornar um 404, exibe uma mensagem de posts não encontrados
      if (error.response && error.response.status === 404) {
        setErrorMessage("Posts não encontrados.");
      } else {
        // Exibe outras mensagens de erro genérico
        setErrorMessage(
          error.response ? error.response.data : "Erro ao buscar posts."
        );
      }
      setPosts([]); // Limpa a lista de posts no caso de erro
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await findPosts();
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
      </View>
      <View style={styles.userText}>
        <Text style={styles.textoBold}>{currentName}</Text>
        <Text style={styles.texto}>@{currentLogin}</Text>
        <Text style={[styles.texto, styles.description]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          vel.
        </Text>
      </View>
      <ProfileTabs />
      {errorMessage ? (
        <View style={styles.sectionContent}>
          <Text style={styles.texto}>{errorMessage}</Text>
        </View>
      ) : null}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {posts.length > 0
          ? posts.map((post, index) => (
              <Post
                post={post}
                key={index}
                id={post.id}
                user={post.user_login}
                navigation={navigation}
                message={post.message}
              />
            ))
          : null}
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
