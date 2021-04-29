import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";
import colors from "../config/colors";
import connection from "../config/connection";

const getQuote = async (stockId, setQuote) => {
  const url = connection.backendIp + "/api/quote/id/" + stockId;
  try {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setQuote(res));
  } catch (err) {
    console.log("Fail to fetch qoute from backend.", err);
  }
};

const Card = ({ stock, setPage, setStockId }) => {
  const [quote, setQuote] = useState({ price: 0, percentage: 0 });

  useEffect(() => {
    getQuote(stock, setQuote);
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        setStockId(stock);
        setPage("main");
      }}
    >
      <View style={styles.card}>
        <View style={[styles.subContainer, { flex: 2 }]}>
          <AppText style={{ marginBottom: 5, fontWeight: "900", fontSize: 20 }}>
            {stock}
          </AppText>
        </View>

        <View style={styles.subContainer}>
          <AppText
            style={{
              marginBottom: 3,
              marginRight: 5,
              fontWeight: "bold",
              fontSize: 20,
              color: quote.percentage >= 0 ? colors.primary : colors.secondary,
            }}
          >
            ${quote.price}
          </AppText>
        </View>
        <View style={styles.subContainer}>
          <AppText
            style={{
              marginBottom: 5,
              marginRight: 5,
              fontSize: 18,
              color: quote.percentage >= 0 ? colors.primary : colors.secondary,
            }}
          >
            {(quote.percentage >= 0 ? "+" : "") + quote.percentage + "%"}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.black,
    marginBottom: 5,
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
    // justifyContent: "space-between",
  },
  subContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 35,
  },
});

export default Card;
