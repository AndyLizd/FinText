import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { io } from "socket.io-client";

import AppText from "../components/AppText";
import colors from "../config/colors";
import connection from "../config/connection";
import Tweet from "./Tweet";

const temp = [
  {
    message: "It is still over-priced. Be patient.",
    user: "Andy",
    sentiment: "BEAR",
  },
  {
    message: "The recent financial report looks great!",
    user: "Andy",
    sentiment: "BULL",
  },
  { message: "FED is the best", user: "Andy", sentiment: "BULL" },
  {
    message:
      "I am concerned about the accident in the supply chain in Japan. It will have a great impact to the market. I think people should be careful.",
    user: "Andy",
    sentiment: "BEAR",
  },
  {
    message: "I just lost 1 million. LOL",
    user: "Andy",
    sentiment: "BEAR",
  },
];

function TweetBox(props) {
  const [tweets, setTweets] = useState([]); // TODO: make it a list
  const [socket, setSocket] = useState({});

  useEffect(() => {
    // receive any new tweets from the backend by socket.io
    const socket = io.connect(connection.backendIp);
    socket.on("tweet", (data) => {
      setTweets((tweets) => [data, ...tweets]);
    });

    // temporary
    setTweets(temp);

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
