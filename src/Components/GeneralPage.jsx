import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ServicePageMap from "./ServicePageMap";
import styles from "../App.module.css";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import ClassIcon from "@mui/icons-material/Class";
import Redirection from "./Redirection";

function GeneralPage({
  userLocation,
  setUserLocation,
  searchTerm,
  setSearchTerm,
}) {
  // For enabling CORS
  // https://cors-anywhere.herokuapp.com/corsdemo

  // CORS proxy
  const CORS = "https://cors-anywhere.herokuapp.com/";

  const generalAPI = `${CORS}https://www.ha.org.hk/opendata/facility-gop.json`;

  const quotaAPI = `${CORS}https://www.ha.org.hk/pas_gopc/pas_gopc_avg_quota_pdf/g0_9uo7a_p-tc.json`;

  // For generalAPI use
  const [isFetching4, setIsFetching4] = useState(false);
  const [hospitalGeneral, setHospitalGeneral] = useState([]);

  // For quotaAPI use
  const [isFetching5, setIsFetching5] = useState(false);
  const [hospitalQuota, setHospitalQuota] = useState([]);

  // For Distance use
  const [sortedGeneralHospitals, setSortedGeneralHospitals] = useState([]);

  // General API Fetching
  useEffect(() => {
    const getData4 = async () => {
      try {
        setIsFetching4(true);
        const res = await fetch(generalAPI);
        const data = await res.json();
        setHospitalGeneral(data);
        console.log(hospitalGeneral); // Move the console.log inside the useEffect
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching4(false);
      }
    };
    getData4();
  }, []);

  // Quota API Fetching
  useEffect(() => {
    const getData5 = async () => {
      try {
        setIsFetching5(true);
        const res = await fetch(quotaAPI);
        const data = await res.json();
        setHospitalQuota(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching5(false);
      }
    };
    getData5();
  }, []);

  // Calculate Distances, sort them and update state
  useEffect(() => {
    if (userLocation && hospitalGeneral.length) {
      const calculateDistances = () => {
        return hospitalGeneral.map((hospital) => {
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
          return { hospital, distance }; // Add distance data to the hospital object
        });
      };

      const distances = calculateDistances();
      distances.sort((a, b) => a.distance - b.distance);
      setSortedGeneralHospitals(distances);
    }
  }, [userLocation, hospitalGeneral]); // This effect should run when userLocation or hospitalGeneral changes

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  console.log(hospitalGeneral);
  console.log(hospitalQuota);

  return (
    <div>
      <h1>普通科門診診所</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ServicePageMap userLocation={userLocation} />
      <Redirection userLocation={userLocation} />
      <div className={styles["serviceText-container"]}>
        <p>
          <LocationOnIcon sx={{ fontSize: 16, padding: 0.1 }} />
          以下是距離您當前位置最近的專科醫院：
        </p>
        <section className={styles["specialistServices-container"]}>
          {isFetching4 ? (
            <p>
              <HourglassBottomIcon />
              資料更新中...
            </p>
          ) : (
            sortedGeneralHospitals.map((hospital, index) => (
              <div key={index} className={styles["hospital-item"]}>
                <h2 className={styles["bold"]}>
                  {hospital.hospital.institution_tc}&emsp;
                  <span>
                    <span class="glyphicon glyphicon-map-marker"></span>
                    {hospital.distance.toFixed(1)}km
                  </span>
                </h2>

                <h4 className={styles["newServices-title"]}>
                  <ClassIcon />
                  {hospital.hospital.cluster_tc}
                </h4>

                <p>
                  <NavigationIcon style={{ color: "#2683fd" }} />
                  &emsp;
                  <a>{hospital.hospital.address_tc}</a>
                </p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default GeneralPage;
