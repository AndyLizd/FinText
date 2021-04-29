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
import { firebase, signInWithGoogleAsync } from "../auth/firebase";

// TODO: call Firebase backend
const loginOnPress = (account, password, setPage) => {
  console.log("account", account);
  console.log("password", password);
  setPage("main");
};

const registerOnPress = (setPage) => {
  setPage("register");
};

const loginWithGoogleOnPress = (setPage) => {
  signInWithGoogleAsync(setPage);
};

function LoginScreen({ setPage }) {
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
        title="LOGIN"
        width="85%"
        marginVertical={30}
        onPress={() => loginOnPress(account, password, setPage)}
      />
      <TouchableHighlight
        style={styles.textButton}
        onPress={() => registerOnPress(setPage)}
      >
        <AppText>register</AppText>
      </TouchableHighlight>

      <AppText style={{ color: colors.secondary, fontSize: 16 }}>or</AppText>

      <TouchableHighlight
        style={styles.textButton}
        onPress={() => loginWithGoogleOnPress(setPage)}
      >
        <AppText>log in with Google account</AppText>
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
  textButton: {
    marginVertical: 10,
  },
});

export default LoginScreen;
