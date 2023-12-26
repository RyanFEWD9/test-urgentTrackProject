import React, { useEffect, useState } from "react";

function WaitingTime(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [characters, setCharacters] = useState([]); // array
  const [latestTime, setLatestTime] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(`${props.API}`);
        const { waitTime, updateTime } = await res.json();
        setCharacters(waitTime);
        setLatestTime(updateTime);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching(false);
      }
    };
    getData();
  }, []); //dependency array

  return (
    <div>
      <h2>急症室等候時間</h2>
      {isFetching
        ? "更新中..."
        : characters.map(({ hospName, topWait }) => (
            <div key={hospName} className="wait-Time">
              <p>{hospName}</p>
              <p>{topWait}</p>
            </div>
          ))}
      <p>最後更新時間：{latestTime}</p>
    </div>
  );
}

export default WaitingTime;
