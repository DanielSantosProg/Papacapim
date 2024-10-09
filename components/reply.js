import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import ReplyBox from "./replyBox";

const Reply = ({ isVisible, onClose, onReply, replies }) => {
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText(""); // Limpa a área de texto após enviar
    }
  };

  const renderReplyItem = ({ item }) => (
    <ReplyBox
      user={item.user_login} // Passando o user_login da resposta
      message={item.message} // A mensagem da resposta
    />
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.replyContainer}>
          {/* Renderizar as respostas */}
          <FlatList
            data={replies}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderReplyItem}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>Sem respostas ainda.</Text>
            )}
            style={styles.replyList}
          />

          {/* Área de texto para adicionar nova resposta */}
          <TextInput
            style={styles.textInput}
            placeholder="Escreva sua resposta..."
            value={replyText}
            onChangeText={setReplyText}
            multiline
            numberOfLines={4}
          />
          <Button title="Responder" onPress={handleReply} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Fundo escuro semi-transparente
  },
  replyContainer: {
    width: "100%",
    backgroundColor: "#31363F",
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "#76ABAE",
  },
  textInput: {
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  replyList: {
    maxHeight: 200, // Limitar altura da lista de respostas
    marginBottom: 10,
  },
  replyItem: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  replyText: {
    color: "red",
  },
  emptyText: {
    color: "#ccc",
    fontStyle: "italic",
  },
});

export default Reply;
