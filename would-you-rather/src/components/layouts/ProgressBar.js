import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  width: 100%;
  height: 25px;
  border: solid 2px black;
  border-radius: 3px;
`;

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
