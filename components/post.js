import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { likePost, getLikes, dislikePost } from "../ApiController";
import { AuthContext } from "../context/auth";

const Post = (props) => {
  const { currentLogin } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    // atualiza a UI antes da resposta da API
    setLoading(true);

    const previousIsLiked = isLiked;
    const previousNumberOfLikes = numberOfLikes;

    if (!isLiked) {
      setIsLiked(true);
      setNumberOfLikes((prev) => prev + 1); // Incrementa imediatamente
    } else {
      setIsLiked(false);
      setNumberOfLikes((prev) => prev - 1); // Decrementa imediatamente
    }

    try {
      if (!previousIsLiked) {
        await likePost(props.id);
      } else {
        await dislikePost(props.id);
      }
    } catch (error) {
      console.log(
        "Erro ao curtir/descurtir o post: ",
        error.response ? error.response.data : error.message
      );
      // Reverte o estado se houver erro
      setIsLiked(previousIsLiked);
      setNumberOfLikes(previousNumberOfLikes);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar curtidas do post na api
  const getPostLikes = async () => {
    try {
      const response = await getLikes(props.id);
      console.log(response);
      setNumberOfLikes(response.length);
      const likedByCurrentUser = response.some(
        (like) => like.user_login === currentLogin
      );
      setIsLiked(likedByCurrentUser);
    } catch (error) {
      console.log(
        "Erro ao buscar as curtidas: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    getPostLikes();
  }, [isLiked]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log("Post User: ", props.user);
            props.navigation.navigate("UserProfile", { user: props.user });
          }}
        >
          <Image
            source={require("../assets/imgs/user_icon.png")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{props.user}</Text>
      </View>
      <Text style={styles.texto}>{props.message}</Text>
      <View style={styles.postFooter}>
        <TouchableOpacity onPress={handleLike} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#76ABAE" /> // Indica o carregamento se estiver carregando
          ) : (
            <Image
              source={
                isLiked
                  ? require("../assets/imgs/like.png") // Imagem para post curtido
                  : require("../assets/imgs/like_outline.png") // Imagem para post não curtido
              }
              style={styles.likeImage}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.likeText}>{numberOfLikes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#31363F",
    borderBottomWidth: 0.8,
    borderBottomColor: "#76ABAE",
  },
  texto: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: "#EEE",
    fontFamily: "Kameron-Regular",
    fontSize: 18,
  },
  likeText: {
    paddingHorizontal: 8,
    color: "#EEE",
    fontFamily: "Kameron-Regular",
    fontSize: 18,
  },
  likeImage: {
    width: 30,
    height: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userName: {
    paddingHorizontal: 15,
    color: "#EEE",
    fontFamily: "Kameron-Bold",
    fontSize: 20,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});

export default Post;
