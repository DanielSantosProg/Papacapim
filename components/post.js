import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { likePost, getLikes, dislikePost, deletePost } from "../ApiController"; // Assumindo que deletePost é importado
import { AuthContext } from "../context/auth";

const Post = (props) => {
  const { currentLogin } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentUserPost = currentLogin === props.user;

  const handleLike = async () => {
    setLoading(true);

    const previousIsLiked = isLiked;
    const previousNumberOfLikes = numberOfLikes;

    if (!isLiked) {
      setIsLiked(true);
      setNumberOfLikes((prev) => prev + 1);
    } else {
      setIsLiked(false);
      setNumberOfLikes((prev) => prev - 1);
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
      setIsLiked(previousIsLiked);
      setNumberOfLikes(previousNumberOfLikes);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(props.id);
      props.onDeletePost(props.id); // Função passada via props para remover o post da lista
    } catch (error) {
      console.log(
        "Erro ao deletar o post: ",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getPostLikes = async () => {
    try {
      const response = await getLikes(props.id);
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
            if (props.user === currentLogin) {
              props.navigation.navigate("Profile");
            } else {
              props.navigation.navigate("UserProfile", { user: props.user });
            }
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
            <ActivityIndicator size="small" color="#76ABAE" />
          ) : (
            <Image
              source={
                isLiked
                  ? require("../assets/imgs/like.png")
                  : require("../assets/imgs/like_outline.png")
              }
              style={styles.likeIcon}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.likeText}>{numberOfLikes}</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/imgs/replies.png")}
            style={styles.icons}
          />
        </TouchableOpacity>

        {currentUserPost && (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Image
              source={require("../assets/imgs/delete.png")}
              style={styles.icons}
            />
          </TouchableOpacity>
        )}
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
  deleteText: {
    paddingHorizontal: 10,
    color: "red",
    fontFamily: "Kameron-Regular",
    fontSize: 16,
  },
  likeText: {
    paddingHorizontal: 8,
    color: "#EEE",
    fontFamily: "Kameron-Regular",
    fontSize: 18,
  },
  likeIcon: {
    width: 25,
    height: 25,
  },
  icons: {
    width: 25,
    height: 25,
    marginHorizontal: 7,
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
  deleteButton: {
    marginLeft: 10,
    flexDirection: "row",
  },
});

export default Post;
