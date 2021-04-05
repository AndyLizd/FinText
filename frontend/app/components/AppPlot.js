import React, { useEffect, useState } from "react";

import colors from "../config/colors";
import connection from "../config/connection";
import CandlePlot from "./CandlePlot";
import LinearPlot from "./LinearPlot";

const fetchPrices = async (stockId, setPrices) => {
  const url =
    connection.backendIp + "/api/priceHistory/id/" + stockId + "/duration/day";
  console.log(url);
  try {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setPrices(res);
        console.log(res.o.length);
      });
  } catch (err) {
    console.log("Fail to fetch data from the backend. ", err);
  }
};

function AppPlot({ stockId }) {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    fetchPrices(stockId, setPrices);
  }, []);

  const mode = ["candle", "linear"][0];

  return mode === "linear" ? (
    <LinearPlot rawData={{ x: prices.t, y: prices.o }} color={colors.primary} />
  ) : (
    <CandlePlot rawData={prices} />
  );
}

export default AppPlot;
