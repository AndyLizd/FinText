import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { TextInput } from 'react-native-paper';

function LoginScreen(props) {
  return (
    <Screen style={styles.container}>
      <AppText> Login </AppText>
      <TextInput label="username"
      value={text}
      onChangeText={text => setText(text)}
    />
      <AppText> Login </AppText>
      <TextInput label="password"
      value={text}
      onChangeText={text => setText(text)}
    />
      
      <Button> Login </Button>
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

export default LoginScreen;
