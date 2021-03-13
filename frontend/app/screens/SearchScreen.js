import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { Searchbar } from "react-native-paper";
import Card from "../components/Card";

function SearchScreen({ setPage }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Screen style={styles.container}>
      <Searchbar
        placeholder="Look Up Stock"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <Card
        stock="TSLA"
        price="214"
        percentage="0.5"
        sentiment="85.5"
        setPage={setPage}
      />
      <Card stock="BA" price="224" percentage="5.5" sentiment="45.5" />
      <Card stock="AMZN" price="915" percentage="2.5" sentiment="99.3" />
      <Card stock="APPL" price="14.2" percentage="0.5" sentiment="15.5" />
      <Card stock="ZM" price="114" percentage="0.9" sentiment="66.2" />
      <Card stock="MS" price="52.2" percentage="11.2" sentiment="35.7" />
      <Card stock="GOOG" price="142.2" percentage="1.6" sentiment="66.8" />
      <Card stock="INTC" price="67.5" percentage="12.3" sentiment="54.2" />
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
});

export default SearchScreen;
