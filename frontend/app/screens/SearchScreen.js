import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function SearchScreen(props) {
  return (
    <Screen style={styles.container}>
      <AppText>SearchScreen</AppText>
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
});

export default SearchScreen;
