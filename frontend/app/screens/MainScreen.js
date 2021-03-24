import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import StockHeader from "../components/StockHeader";
import TweetBox from "../components/TweetBox";
import Post from "../components/Post";

function MainScreen({ setPage }) {
  const stock_id = "AAPL";

  return (
    <Screen style={styles.container}>
      <View style={styles.headerContainer}>
        <StockHeader stock_id={stock_id} setPage={setPage} />
      </View>

      <View style={styles.TweetBoxContainer}>
        <TweetBox />
      </View>

      <View style={styles.PostContainer}>
        <Post />
      </View>
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
  headerContainer: {
    flex: 2,
    height: "20%",
    width: "100%",
    marginBottom: 30,
  },
  TweetBoxContainer: {
    flex: 3,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  PostContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 15,
  },
});

export default MainScreen;
