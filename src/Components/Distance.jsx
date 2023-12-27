import React, { useEffect, useState } from "react";

function Distance() {
  const [userLocation, setUserLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    fetchUserLocation();
    fetchHospitalData();
  }, []);

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
        },
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const fetchHospitalData = async () => {
    try {
      const response = await fetch(
        "https://www.ha.org.hk/opendata/facility-hosp.json",
      );
      const data = await response.json();
      const filteredHospitals = data.filter(
        (hospital) => hospital.with_AE_service_eng === "Yes",
      );
      setHospitals(filteredHospitals);
      calculateDistances(filteredHospitals);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userLocation);
  console.log(hospitals);
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
      setDistances(distances);
    }
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div id="hospitalDisplayWrapper">
      {distances.length >= 0 ? (
        <div>
          <ul>
            <div id="outputList">
              <div ClassName="hospitalName">
                <h2>
                  東區尤德夫人那打素醫院
                  <button id="checkDistanceWrapper">
                    <img src="/mapsFlags.png" width="12em" />
                    1.3km
                  </button>
                </h2>
              </div>
              <h5>
                等候時間: <span id="timeText">+ 超過 1 小時</span>
              </h5>
              <h5>地址: 香港柴灣樂民道3 號</h5>
              <h5>電話: 1234 5678</h5>
              <h5>
                <a href="https://www.ha.org.hk/visitor/ha_visitor_text_index.asp?Content_ID=100141&lang=CHIB5">
                  查看更多
                </a>
              </h5>
            </div>

            <div id="outputList">
              <div ClassName="hospitalName">
                <h2>
                  東區尤德夫人那打素醫院
                  <button id="checkDistanceWrapper">
                    <img src="/mapsFlags.png" width="12em" />
                    1.3km
                  </button>
                </h2>
              </div>
              <h5>
                等候時間: <span id="timeText">+ 超過 1 小時</span>
              </h5>
              <h5>地址: 香港柴灣樂民道3 號</h5>
              <h5>電話: 1234 5678</h5>
              <h5>
                <a href="https://www.ha.org.hk/visitor/ha_visitor_text_index.asp?Content_ID=100141&lang=CHIB5">
                  查看更多
                </a>
              </h5>
            </div>




            
          </ul>

          <ul>
            {distances.map((item, index) => (
              <li key={index}>
                <p>Hospital: {item.hospital.institution_tc}</p>
                <p>Distance: {item.distance.toFixed(0)} km</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default Distance;
