import React from "react";
import { Bar } from "./Styled";

const ProgressBar = ({ percent }) => {
  return (
    <>
      <strong>Percent: {percent}%</strong>
      <Bar>
        <div
          style={{
            width: `${percent}%`,
            background: "#44BBA4",
            height: "100%",
          }}
        ></div>
      </Bar>
    </>
  );
};

export default ProgressBar;
