import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";

const stocks = {
  abc123: {
    name: "TSLA",
    price: 214.45,
    sentiment: 121,
    like: false,
  },
};

const postOnPress = () => console.log("POST");

function WritePostScreen({ stock_id }) {
  const stock = stocks[stock_id];

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.text}>{stock.name} </AppText>
        <AppText style={styles.text}>{stock.price} </AppText>
      </View>
      <AppTextInput width="90%" height="30%" placeholder="Post your opinion" />
      <AppButton
        color="secondary"
        title="POST"
        width="90%"
        onPress={postOnPress}
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
    flexDirection: "row",
    // alignContent: "space-around",
  },
});

export default WritePostScreen;
