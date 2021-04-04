import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { FontAwesome } from "@expo/vector-icons";
import { io } from "socket.io-client";

import colors from "../config/colors";
import connection from "../config/connection";

function StockHeader({ stock_id, setPage, temp_sentiment = 95.5 }) {
  // const stocks = {
  //   TSLA: {
  //     name: "TSLA",
  //     price: 214.5,
  //   },
  // };
  // const stock = stocks[stock_id];

  const [like, setLike] = useState(false);

  const [stock, setStock] = useState({
    id: stock_id,
    price: 122.9,
    sentiment: 85.2,
  });

  // TODO: unsubscribe socket when component un-mount
  useEffect(() => {
    console.log("set up the stock socket");
    const socket = io.connect(connection.backendIp);

    socket.on("stock:AAPL", (data) => {
      setStock(JSON.parse(data));
      // console.log("something", JSON.parse(data));
    });

    // test
    // socket.on("stock", (data) => {
    //   console.log("something", data);
    //   setStock(data[stock_id]);
    // });
  }, []);

  const searchOnPress = () => {
    console.log("to search");
    setPage("search");
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <TouchableOpacity onPress={searchOnPress}>
          <AppText style={styles.text}>{stock_id} </AppText>
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
          sentiment {stock.sentiment}
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
