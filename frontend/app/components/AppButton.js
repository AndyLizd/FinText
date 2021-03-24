import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  width = "100%",
  margin = 10,
  fontSize = 18,
  padding = 15,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color], width, margin, padding },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    // marginVertical: 10,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
