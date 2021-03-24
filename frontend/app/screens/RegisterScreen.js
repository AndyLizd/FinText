import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { TextInput } from "react-native-paper";
import { TouchableHighlight } from "react-native-gesture-handler";

const RegisterOnPress = (account, password) => {
  console.log("account", account);
  console.log("password", password);
};

const loginOnPress = (setPage) => {
  setPage("login");
};

function RegisterScreen({ setPage }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen style={styles.container}>
      <View style={styles.userContainer}>
        <AntDesign name="user" size={130} color={colors.white} />
      </View>
      <AppTextInput
        width="85%"
        height={60}
        autoCapitalize="none"
        autoCompleteType="email"
        placeholder="Account"
        onChangeText={(text) => setAccount(text)}
      />
      <AppTextInput
        width="85%"
        height={60}
        secureTextEntry
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />
      <AppButton
        color="secondary"
        title="REGISTER"
        width="85%"
        marginVertical={30}
        onPress={() => RegisterOnPress(account, password)}
      />
      <TouchableHighlight onPress={() => loginOnPress(setPage)}>
        <AppText>login</AppText>
      </TouchableHighlight>
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
  userContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    margin: 50,
  },
});

export default RegisterScreen;
