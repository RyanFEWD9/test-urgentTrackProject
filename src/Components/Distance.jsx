import React, { useEffect, useState } from "react";
import styles from "../App.module.css";

function Distance({ setLatestTime, ...props }) {
  //For Distance API use
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [distances, setDistances] = useState([]);

  //For Hospital Tel API use
  const [isFetching2, setIsFetching2] = useState(false);
  const [hospitalsData, setHospitalsData] = useState([]);

  //For WaitTime API use
  const [isFetching, setIsFetching] = useState(false);
  const [characters, setCharacters] = useState([]); // array
  // const [latestTime, setLatestTime] = useState("");

  //WaitTime API Fetching
  useEffect(() => {
    const getData = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(`${props.WaitTimeAPI}`);
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
  }, []);

  //red text for waitTime above 2hrs
  const isWaitTimeOverTwoHours = (waitTime) => {
    // This regular expression matches "超過" followed by one or more digits and then "小時"
    const overHoursRegex = /超過\s*(\d+)\s*小時/;
    const match = waitTime.match(overHoursRegex);

    if (match) {
      // Extract the number and convert it to an integer
      const hours = parseInt(match[1], 10);
      // Check if the extracted hours are greater than or equal to 2
      return hours >= 2;
    }

    return false;
  };

  //Hospital Tel API fetching
  useEffect(() => {
    const getData2 = async () => {
      try {
        setIsFetching2(true);
        const res = await fetch(props.TelAPI);
        const data = await res.json();

        // Create an array to hold all hospital names and contact numbers
        const hospitalsData = data.features.map((feature) => {
          const properties = feature.properties;
          // Replace <br/> with space or any other preferred separator
          const contact = properties.NSEARCH02_TC.replace("<br/>", " / ");
          return {
            name: properties.NAME_TC,
            contact: contact,
            website: properties.NSEARCH03_TC,
            address: properties.ADDRESS_TC,
            latitude: properties.LATITUDE,
            longitude: properties.LONGITUDE,
          };
        });
        setHospitalsData(hospitalsData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching2(false);
      }
    };
    getData2();
  }, []);

  console.log(hospitalsData);

  //Distance API Fetching
  useEffect(() => {
    fetchUserLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetchHospitalData();
    }
  }, [userLocation]);

  useEffect(() => {
    if (hospitals.length > 0 && userLocation) {
      calculateDistances(hospitals);
    }
  }, [hospitals, userLocation]);

  // console.log(hospitals);
  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          setUserLocation({
            latitude: userLatitude,
            longitude: userLongitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const fetchHospitalData = async () => {
    try {
      const response = await fetch(`${props.DistanceAPI}`);
      const data = await response.json();
      const filteredHospitals = data.filter(
        (hospital) => hospital.with_AE_service_eng === "Yes"
      );
      setHospitals(filteredHospitals);
      calculateDistances(filteredHospitals);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userLocation);
  // console.log(hospitals);
  const calculateDistances = (hospitals) => {
    if (userLocation) {
      const distances = hospitals.map((hospital) => {
        const lat1 = parseFloat(hospital.latitude);
        const lon1 = parseFloat(hospital.longitude);
        const lat2 = userLocation.latitude;
        const lon2 = userLocation.longitude;
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return { hospital, distance };
      });
      //Sort distances in ascending order
      distances.sort((a, b) => a.distance - b.distance);
      setDistances(distances);
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // console.log(distances);

  return (
    <div id="hospitalDisplayWrapper">
      {distances.length > 0 ? (
        <div className={styles["all-hospital-container"]}>
          <div className={styles["hospital-container"]}>
            {distances.map((item, index) => (
              <div key={index} className={styles["hospital-item"]}>
                <h2>
                  {item.hospital.institution_tc}
                  <span>
                    &emsp;<span class="glyphicon glyphicon-map-marker"></span>
                    {item.distance.toFixed(0)} km
                  </span>
                </h2>
                {isFetching
                  ? "更新中..."
                  : characters
                      .filter(
                        (char) => char.hospName === item.hospital.institution_tc
                      )
                      .map(({ hospName, topWait }) => (
                        <div key={hospName} className="wait-Time">
                          <p>
                            等候時間：
                            <span
                              className={
                                isWaitTimeOverTwoHours(topWait)
                                  ? styles.redText
                                  : styles.blueText
                              }
                            >
                              {topWait}
                            </span>
                          </p>
                        </div>
                      ))}

                {isFetching2
                  ? "更新中..."
                  : hospitalsData
                      .filter(
                        (hospitalsData) =>
                          hospitalsData.name === item.hospital.institution_tc
                      )
                      .map(({ name, contact, website, address }) => (
                        <div key={name}>
                          <p>地址：{address}</p>
                          <p>
                            電話：
                            {contact}
                          </p>
                          <a href={website} target="_blank">
                            查看更多
                          </a>
                        </div>
                      ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>更新中...</p>
      )}
    </div>
  );
}

export default Distance;
