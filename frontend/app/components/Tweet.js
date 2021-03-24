import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";

function Tweet({ tweet }) {
  const { message, user, sentiment } = tweet;
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <AntDesign name="user" size={35} color={colors.white} />
        </View>
        <View
          style={[
            styles.sentiment,
            {
              backgroundColor:
                sentiment == "BULL" ? colors.primary : colors.secondary,
            },
          ]}
        >
          <AppText style={styles.sentimentText}>{sentiment}</AppText>
        </View>
      </View>
      <View style={styles.tweetContainer}>
        <AppText style={styles.messageText}>{message}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    height: 55,
    marginVertical: 10,
    alignItems: "center",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tweetContainer: {
    flex: 4,
    marginLeft: "4%",
    marginRight: "2%",
  },
  avatar: {
    flex: 3,
  },
  sentiment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: "55%",
  },
  sentimentText: {
    fontSize: 10,
  },
  messageText: {
    fontSize: 13,
  },
});

export default Tweet;
