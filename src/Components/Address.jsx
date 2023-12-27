import React, { useEffect, useState } from "react";


function Address() {
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
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const fetchHospitalData = async () => {
    try {
      const response = await fetch(
        "https://www.ha.org.hk/opendata/facility-hosp.json"
      );
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
    <div>
      {distances.length >= 0 ? (
        <div>
          <h2>Distances to Hospitals:</h2>
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

export default Address;