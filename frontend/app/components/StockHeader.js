import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import { FontAwesome } from "@expo/vector-icons";
import { io } from "socket.io-client";

import colors from "../config/colors";
import connection from "../config/connection";

function StockHeader({ stockId, setPage, setPlotType }) {
  const [like, setLike] = useState(false);

  const [stock, setStock] = useState({
    id: stockId,
    price: 0,
    sentiment: 0,
  });

  useEffect(() => {
    const channel = "stock:" + stockId;
    const socket = io.connect(connection.backendIp);

    let lastUpdateTime = Date.now();
    const intervalTime = 1500;

    socket.on(channel, (data) => {
      // update the price for at least intervalTime
      if (Date.now() > lastUpdateTime + intervalTime) {
        setStock(JSON.parse(data));
        lastUpdateTime = Date.now();
      }
      // console.log("something", JSON.parse(data));
    });

    // test
    // socket.on("stock", (data) => {
    //   console.log("something", data);
    //   setStock(data[stock_id]);
    // });

    // unmount
    return () => {
      socket.removeAllListeners(channel);
    };
  }, [stockId]);

  const searchOnPress = () => {
    console.log("to search");
    setPage("search");
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <TouchableOpacity onPress={searchOnPress}>
          <AppText style={styles.text}>{stockId} </AppText>
        </TouchableOpacity>
        {/* </View>
      <View style={[styles.subcontainer, { flex: 0.5 }]}> */}
        {like ? (
          <FontAwesome
            name="heart"
            size={26}
            color="#f06292"
            onPress={() => setLike(false)}
          />
        ) : (
          <FontAwesome
            name="heart-o"
            size={26}
            color="#f06292"
            onPress={() => setLike(true)}
          />
        )}
      </View>
      <View style={styles.subcontainer}>
        <TouchableOpacity onPress={() => setPlotType("candle")}>
          <AppText style={[styles.text, { color: colors.primary }]}>
            $ {stock.price}
          </AppText>
        </TouchableOpacity>
      </View>
      <View style={[styles.subcontainer, { flex: 1.4 }]}>
        <TouchableOpacity onPress={() => setPlotType("sentiment")}>
          <AppText
            style={{
              fontSize: 20,
              color: colors.secondary,
              fontWeight: "bold",
            }}
          >
            sentiment {stock.sentiment}
          </AppText>
        </TouchableOpacity>
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
