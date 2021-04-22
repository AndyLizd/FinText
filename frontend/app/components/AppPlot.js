import React, { useEffect, useState } from "react";

import colors from "../config/colors";
import connection from "../config/connection";
import CandlePlot from "./CandlePlot";
import LinearPlot from "./LinearPlot";

const fetchPrices = async (stockId, setPrices) => {
  const url =
    connection.backendIp + "/api/priceHistory/id/" + stockId + "/duration/day";
  try {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setPrices(res);
        // console.log(res.o.length);
      });
  } catch (err) {
    console.log("Fail to fetch stock prices data. ", err);
  }
};

const fetchSentiments = async (stockId, setSentiments) => {
  const url = connection.backendIp + "/api/sentiment/id/" + stockId;
  // console.log(url);
  try {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const plotable = {
          x: [...Array(res.history.length).keys()],
          y: res.history,
        };
        // console.log(plotable);
        setSentiments(plotable);
      });
  } catch (err) {
    console.log("Fail to fetch sentiments data. ", err);
  }
};

function AppPlot({ stockId, plotType }) {
  const [prices, setPrices] = useState({});
  const [sentiments, setSentiments] = useState({});

  useEffect(() => {
    fetchPrices(stockId, setPrices);
    fetchSentiments(stockId, setSentiments);
  }, [stockId]);

  return plotType === "candle" ? (
    <CandlePlot rawData={prices} />
  ) : (
    <LinearPlot
      rawData={{ x: sentiments.x, y: sentiments.y }}
      color="rgba(253,216,53, 0.85)"
    />
  );
}

export default AppPlot;
