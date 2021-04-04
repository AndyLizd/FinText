import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import StockHeader from "../components/StockHeader";
import TweetBox from "../components/TweetBox";
import Post from "../components/Post";
import AppPlot from "../components/AppPlot";
import AppText from "../components/AppText";

function MainScreen({ setPage }) {
  const stock_id = "AAPL";

  return (
    <Screen style={styles.container}>
      <View style={styles.headerContainer}>
        <StockHeader stock_id={stock_id} setPage={setPage} />
      </View>

      <View style={styles.plotContainer}>
        <AppPlot stock_id={stock_id} />
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
    flex: 0.5,
    width: "100%",
  },
  plotContainer: {
    flex: 2.5,
    width: "100%",
  },
  TweetBoxContainer: {
    flex: 3.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  PostContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 30,
  },
});

export default MainScreen;
