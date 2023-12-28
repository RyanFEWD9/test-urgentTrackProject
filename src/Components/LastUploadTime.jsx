import React, { useContext } from "react";
import TimeContext from "../TimeContext";

function LastUploadTime() {
  const latestTime = useContext(TimeContext);

  return (
    <div>
      <footer>最後更新： {latestTime}</footer>
    </div>
  );
}

export default LastUploadTime;
