import React, { useContext } from "react";
import TimeContext from "../TimeContext";

function LastUploadTime() {
  const latestTime = useContext(TimeContext);

  return <div>最後更新： {latestTime}</div>;
}

export default LastUploadTime;
