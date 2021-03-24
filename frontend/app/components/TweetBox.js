import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { io } from "socket.io-client";

import AppText from "../components/AppText";
import colors from "../config/colors";
import connection from "../config/connection";
import Tweet from "./Tweet";

function TweetBox(props) {
  const [tweets, setTweets] = useState([]); // TODO: make it a list
  const [socket, setSocket] = useState({});

  useEffect(() => {
    // receive any new tweets from the backend by socket.io
    const socket = io.connect(connection.backendIp);
    socket.on("tweet", (data) => {
      setTweets((tweets) => [data, ...tweets]);
    });
    setSocket(socket);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {tweets.map((tweet, idx) => (
        <Tweet tweet={tweet} key={idx} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    height: "30%",
    width: "100%",
    flex: 1,
    // textAlign: "center",
    // justifyContent: "center",
    // alignItems: "center",
    overflow: "scroll",
  },
});

export default TweetBox;
