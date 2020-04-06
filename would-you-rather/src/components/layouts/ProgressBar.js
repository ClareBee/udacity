import React from "react";
import PropTypes from "prop-types";
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

ProgressBar.propTypes = {
  percent: PropTypes.string.isRequired,
};

export default ProgressBar;
