import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { io } from "socket.io-client";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import connection from "../config/connection";
import Screen from "../components/Screen";
import StockHeader from "../components/StockHeader";

function MainScreen({ setPage }) {
  const [post, setPost] = useState("");
  const [tweets, setTweets] = useState(""); // TODO: make it a list
  const [socket, setSocket] = useState({});

  useEffect(() => {
    // receive any new tweets from the backend by socket.io
    const socket = io.connect(connection.backendIp);
    socket.on("tweet", (data) => {
      const newTweet =
        data.user + " : " + data.sentiment + " : " + data.message;
      setTweets(newTweet);
    });
    setSocket(socket);
  }, []);

  // bull/bear button on press
  const postOnPress = (post, sentiment) => {
    socket.emit("tweet", {
      message: post,
      user: "andy", // TODO: change the user once the user pages are set up
      sentiment: sentiment,
    });
    console.log("POST", post, sentiment);
  };

  const userOnPress = () => console.log("press user");

  const stock_id = "AAPL";

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <StockHeader stock_id={stock_id} setPage={setPage} />
      </View>

      {/* <View style={styles.userContainer}>
        <AntDesign
          name="user"
          size={100}
          color={colors.white}
          onPress={userOnPress}
        />
        <AppText>Andy Li</AppText>
      </View> */}

      <View style={styles.tweetContainer}>
        <AppText> {tweets} </AppText>
      </View>

      <AppTextInput
        width="90%"
        height="15%"
        placeholder="Post your opinion with Bull/Bear"
        onChangeText={(text) => {
          setPost(text);
        }}
      />

      <AppButton
        color="primary"
        title="BULL"
        width="90%"
        onPress={() => postOnPress(post, "bull")}
      />
      <AppButton
        color="secondary"
        title="BEAR"
        width="90%"
        onPress={() => postOnPress(post, "bear")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.black,
    height: "100%",
  },
  text: {
    color: colors.primary,
    fontSize: 25,
  },
  header: {
    height: "20%",
    width: "100%",
    marginBottom: 30,
  },
  userContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    margin: 30,
  },
  tweetContainer: {
    height: "20%",
    width: "95%",
    marginBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
