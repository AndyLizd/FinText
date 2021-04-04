import React from "react";
import Plotly from "react-native-plotly";

import colors from "../config/colors";

const plotLayout = {
  margin: { l: 30, r: 15, b: 0, t: 5, pad: 0 },
  plot_bgcolor: colors.black,
  paper_bgcolor: colors.black,
  nticks: 5,
  yaxis: {
    fixedrange: true,
    tickfont: { color: "white", size: 8 },
    nticks: 8,
    tickformat: ".1f",
  },
  xaxis: { fixedrange: true },
};

function LinearPlot({ rawData, color }) {
  const data = {
    x: rawData.x,
    y: rawData.y,
    type: "scatter",
    mode: "lines",
    marker: { color: color },
    line: {
      shape: "spline",
      width: 3,
    },
  };

  return (
    <Plotly
      data={[data]}
      layout={plotLayout}
      config={{ displayModeBar: false }}
      style={{ flex: 1, backgroundColor: colors.black }}
    />
  );
}

export default LinearPlot;
