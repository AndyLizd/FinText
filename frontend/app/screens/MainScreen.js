import React from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import Screen from "../components/Screen";
import StockHeader from "../components/StockHeader";

function MainScreen({ setPage }) {
  const postOnPress = () => console.log("POST");
  const userOnPress = () => console.log("press user");

  const stock_id = "APPL";

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <StockHeader stock_id={stock_id} setPage={setPage} />
      </View>

      <View style={styles.userContainer}>
        <AntDesign
          name="user"
          size={100}
          color={colors.white}
          onPress={userOnPress}
        />
        <AppText>Andy Li</AppText>
      </View>

      <AppButton
        color="primary"
        title="BULL"
        width="90%"
        onPress={postOnPress}
      />
      <AppButton
        color="secondary"
        title="BEAR"
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
    height: "20%",
    width: "100%",
    marginBottom: 30,
  },
  userContainer: {
    alignItems: "center",
    justifyContent: "space-around",

    margin: 30,
  },
});

export default MainScreen;
