import React, { useState } from "react";
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import AppText from "./AppText";
import Plotly from "react-native-plotly";
import colors from "../config/colors";

function CandlePlot({ rawData }) {
  const [loading, setLoading] = useState(true);

  const onLoad = () => {
    setLoading(false);
  };

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
    dragmode: "pan",
    margin: { r: 15, t: 15, b: 0, l: 30 },
    showlegend: false,
    xaxis: {
      // autorange: true,
      // fixedrange: true,
      rangeslider: { visible: false },
      type: "date",
    },
    yaxis: {
      // autorange: true,
      // fixedrange: true,
      tickformat: ".1f",
      type: "linear",
      tickfont: { color: "white", size: 10 },
      nticks: 5,
    },
    plot_bgcolor: colors.black,
    paper_bgcolor: colors.black,
  };

  return (
    <>
      {loading && (
        <View
          style={{ position: "absolute", left: "50%", top: "50%", zIndex: 100 }}
        >
          <ActivityIndicator
            size={70}
            color="white"
            style={{ position: "relative", left: "-50%", top: "-50%" }}
          />
        </View>
      )}

      <Plotly
        data={[data]}
        layout={layout}
        enableFullPlotly={true}
        config={{ displayModeBar: false }}
        onLoad={() => onLoad()}
        style={{ backgroundColor: colors.black }}
      />
    </>
  );
}

export default CandlePlot;
