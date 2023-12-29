import React from "react";

function LastUploadTime(props) {
  return (
    <div>
      <footer>最後更新： {props.latestTime}</footer>
    </div>
  );
}

export default LastUploadTime;
