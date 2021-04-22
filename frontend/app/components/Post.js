import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Alert } from "react-native";
import { io } from "socket.io-client";
import { AntDesign } from "@expo/vector-icons";

import AppButton from "../components/AppButton";
import connection from "../config/connection";
import { TextInput } from "react-native-gesture-handler";
import colors from "../config/colors";
import AppText from "./AppText";
import generalConfig from "../config/general";

function Post({ stockId }) {
  const [post, setPost] = useState("");
  const [socket, setSocket] = useState({});
  const [canPost, setCanPost] = useState(true);

  useEffect(() => {
    const socket = io.connect(connection.backendIp);
    setSocket(socket);
  }, []);
  // TODO: disconnect component un-mount

  // bull/bear button on press
  const postOnPress = (post, setPost, sentiment) => {
    socket.emit("tweet:" + stockId, {
      message: post,
      user: "andy", // TODO: change the user once the user pages are set up
      sentiment: sentiment,
    });

    if (canPost) {
      const url =
        connection.backendIp +
        "/api/sentiment/id/" +
        stockId +
        "/sentiment/" +
        sentiment;
      fetch(url, { method: "PUT" });
      // limit frequent post
      setCanPost(false);
      setTimeout(() => setCanPost(true), generalConfig.postInterval);
    } else {
      Alert.alert(
        "Chill out, my friend!",
        "You had a post within the last 10 seconds. Your new post won't count into the sentiment index.",
        [{ text: "Okie dokie" }],
        { cancelable: false }
      );
    }

    setPost("");
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <View>
            <AntDesign name="user" size={35} color={colors.white} />
          </View>
          <AppText style={{ fontSize: 12 }}>Andy</AppText>
        </View>
      </View>
      <View style={styles.postContainer}>
        <TextInput
          placeholder="Post your opinion with BULL/BEAR"
          placeholderTextColor={colors.gray}
          style={styles.postTextInput}
          value={post}
          onChangeText={(text) => {
            setPost(text);
          }}
        />

        <View style={styles.buttonsContainer}>
          <AppButton
            color="primary"
            title="BULL"
            width="16%"
            fontSize={12}
            padding={6}
            onPress={() => postOnPress(post, setPost, "BULL")}
          />
          <AppButton
            color="secondary"
            title="BEAR"
            width="16%"
            fontSize={12}
            padding={6}
            onPress={() => postOnPress(post, setPost, "BEAR")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  postContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  postTextInput: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    textAlignVertical: "center",
    width: "90%",
    height: 50,
    marginTop: 10,
    color: colors.white,
  },
});

export default Post;
