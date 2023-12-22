import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function WaitingTime(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [characters, setCharacters] = useState([]); // array

  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(props.API);
        const { features } = await res.json();
        setCharacters(features);
        // console.log(features);
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
      {isFetching
        ? "Loading..."
        : characters.map((features) => (
            <div key={features.properties.OBJECTID}>
              <p>{features.properties.hospName_TC}</p>
              <ul>
                <li>LATITUDE : {features.properties.LATITUDE}</li>
                <li>LONGITUDE: {features.properties.LONGITUDE}</li>
                {/* {console.log(features.properties.JSON_TC)} */}
              </ul>
            </div>
          ))}
    </div>
  );
}

export default WaitingTime;
