import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AppText from "./AppText";
import Plotly from "react-native-plotly";
import colors from "../config/colors";

function CandlePlot({ rawData }) {
  const data = {
    x: rawData.t,
    close: rawData.c,
    high: rawData.h,
    low: rawData.l,
    open: rawData.o,

    decreasing: { line: { color: colors.secondary } },
    increasing: { line: { color: colors.primary } },

    type: "candlestick",
  };

  const layout = {
    // dragmode: "zoom",
    margin: { r: 15, t: 15, b: 0, l: 30 },
    showlegend: false,
    xaxis: {
      // autorange: true,
      fixedrange: true,
      rangeslider: { visible: false },
      type: "date",
    },
    yaxis: {
      // autorange: true,
      fixedrange: true,
      tickformat: ".1f",
      type: "linear",
      tickfont: { color: "white", size: 10 },
      nticks: 5,
    },
    plot_bgcolor: colors.black,
    paper_bgcolor: colors.black,
  };
  return (
    <Plotly
      data={[data]}
      layout={layout}
      enableFullPlotly={true}
      config={{ displayModeBar: false }}
      style={{ flex: 1, backgroundColor: colors.black }}
    />
  );
}


export default CandlePlot;
