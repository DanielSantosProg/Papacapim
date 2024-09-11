import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/header";
import Tabs from "../components/tabs";
import Footer from "../components/footer";
import Post from "../components/post";

const Feed = ({ navigation }) => {
  const posts = [
    {
      user: "randomUser1",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod accumsan sem, sit amet viverra nisi facilisis ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      user: "randomUser2",
      message:
        "Pellentesque in sodales dui. Aliquam euismod elit sed urna viverra, ut tincidunt nunc pharetra.",
    },
    {
      user: "randomUser3",
      message:
        "Quisque ex libero, dictum et dui eu, tempor sagittis nunc. Quisque scelerisque id mi eget porta.",
    },
    {
      user: "randomUser4",
      message:
        "Nunc posuere a lacus in varius. Phasellus dignissim dapibus nisl vel sodales.",
    },
    {
      user: "randomUser5",
      message:
        "Etiam eu cursus tellus. Nulla gravida velit sit amet leo congue, in lacinia mi sollicitudin.",
    },
  ];
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Tabs />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {posts.map((post, index) => (
          <Post key={index} user={post.user} message={post.message} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate("Post")}
      >
        <Text style={[styles.texto, styles.buttonText]}>+</Text>
      </TouchableOpacity>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
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
  input: {
    marginTop: 5,
    marginBottom: 15,
    borderColor: "#FFF",
    borderWidth: 0.3,
    borderRadius: 4,
    width: 300,
    height: 50,
    backgroundColor: "#31363F",
  },
  inputs: {
    bottom: 30,
  },
  postButton: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#76ABAE",
    borderRadius: 30,
    position: "absolute",
    right: 40,
    bottom: 80,
  },
  buttonText: {
    fontSize: 32,
    fontFamily: "Kameron-Bold",
  },
  buttons: {
    top: 25,
  },
  forgotPassword: {
    borderColor: "#EEE",
    borderWidth: 0.3,
    borderRadius: 30,
  },
  forgotText: {
    fontSize: 20,
  },
  noAccount: {
    top: 15,
    fontSize: 16,
    alignSelf: "center",
  },
});

export default Feed;
