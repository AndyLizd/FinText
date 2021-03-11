import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";

function StockHeader({ stock_id, temp_sentiment = 95.5 }) {
  const stocks = {
    TSLA: {
      name: "TSLA",
      price: 214.5,
    },
  };
  const [like, setLike] = useState(false);
  const stock = stocks[stock_id];

  const searchOnPress = () => console.log("to search");

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <TouchableOpacity onPress={searchOnPress}>
          <AppText style={styles.text}>{stock.name} </AppText>
        </TouchableOpacity>
        {/* </View>
      <View style={[styles.subcontainer, { flex: 0.5 }]}> */}
        {like ? (
          <FontAwesome
            name="heart"
            size={30}
            color="#f06292"
            onPress={() => setLike(false)}
          />
        ) : (
          <FontAwesome
            name="heart-o"
            size={30}
            color="#f06292"
            onPress={() => setLike(true)}
          />
        )}
      </View>
      <View style={styles.subcontainer}>
        <AppText style={[styles.text, { color: colors.primary }]}>
          $ {stock.price}
        </AppText>
      </View>
      <View style={[styles.subcontainer, { flex: 1.4 }]}>
        <AppText
          style={{ fontSize: 20, color: colors.secondary, fontWeight: "bold" }}
        >
          sentiment {temp_sentiment}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  subcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default StockHeader;
