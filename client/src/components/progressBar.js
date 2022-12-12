import React from "react";

const ProgressBar = ({ progress, height }) => {
  let barWidth = progress;
  let barColor = "orange";
  if (progress >= 100) {
    barWidth = 100;
    barColor = "#FF6042";
  } else if (progress < 50) {
    barColor = "#00d084";
  }

  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    marginRight: 35
  };

  const Childdiv = {
    height: "100%",
    width: `${barWidth}%`,
    backgroundColor: barColor,
    borderRadius: 40,
    textAlign: "right"
  };

  const progresstext = {
    padding: 10,
    color: "black",
    fontWeight: 900
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};
ProgressBar.propTypes={};
export default ProgressBar;
