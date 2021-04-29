import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { Searchbar } from "react-native-paper";
import Card from "../components/Card";
import connection from "../config/connection";

const getTickers = async (setTickers) => {
  const url = connection.backendIp + "/api/tickers";
  try {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setTickers(res));
  } catch (err) {
    console.log("Fail to fetch tickers list.", err);
  }
};

function SearchScreen({ setPage, setStockId }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    getTickers(setTickers);
  }, []);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Screen style={styles.container}>
      <TextInput
        placeholder="Search for stocks"
        placeholderTextColor={colors.gray}
        style={styles.postTextInput}
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
        }}
      />

      {tickers.map((item) => (
        <Card
          key={item}
          stock={item}
          setPage={setPage}
          setStockId={setStockId}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.black,
    height: "100%",
  },
  postTextInput: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    textAlignVertical: "center",
    width: "90%",
    height: 55,
    fontSize: 22,
    marginTop: 10,
    color: colors.white,
  },
});

export default SearchScreen;
