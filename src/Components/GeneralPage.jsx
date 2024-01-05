import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ShareMap from "./ShareMap";
import styles from "../App.module.css";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import ClassIcon from "@mui/icons-material/Class";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { hospitalSpecialistServices } from "./utils";
import { districtColor2 } from "./utils";
import { hongKongDistricts } from "./utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { settings } from "./utils";

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

  //for Map use
  const [selectedHospitalLocation2, setSelectedHospitalLocation2] =
    useState(null);

  const handleHospitalSelect2 = (location) => {
    setSelectedHospitalLocation2(location);
  };

  //for selected district value
  const [filterValue, setFilterValue] = useState(null);

  const handleSelectChange = (event) => {
    setFilterValue(event.target.value === "篩選" ? null : event.target.value);
  };

  // On Click function for hospital container
  const handleHospitalClick2 = (hospital) => {
    // Call the onHospitalSelect function provided by the parent component

    handleHospitalSelect2({
      latitude: hospital.latitude,
      longitude: hospital.longitude,
      hospitalName: hospital.institution_tc,
    });

    const scrollToPosition = () => {
      window.scrollTo({
        top: 100, // Scroll to the top of the page
        behavior: "smooth", // Add smooth scrolling behavior
      });
    };
    scrollToPosition();
  };

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

      // Apply district filter if filterValue is set, otherwise use all distances
      const filteredDistances = filterValue
        ? distances.filter(
            (obj) =>
              hospitalQuota.find(
                (quota) => quota.Clinic === obj.hospital.institution_tc
              )?.District === filterValue
          )
        : distances;

      setSortedGeneralHospitals(filteredDistances);
    }
  }, [userLocation, hospitalGeneral, filterValue]); // Add filterValue to the dependency array

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  console.log(hospitalGeneral);
  console.log(hospitalQuota);
  console.log(sortedGeneralHospitals);

  return (
    <div>
      <h1>普通科門診診所</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {
        <select className={styles["select"]} onChange={handleSelectChange}>
          <option>篩選</option>
          {hongKongDistricts.map((district, index) => (
            <option value={district} key={index}>
              {district}
            </option>
          ))}
        </select>
      }
      <ShareMap
        userLocation={userLocation}
        location={selectedHospitalLocation2}
      />
      <div className={styles["serviceText-container"]}>
        <div className={styles["iconContainer"]}>
          <a
            href="https://www3.ha.org.hk/hago/Home/DownloadApps/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles["haGO"]}
              src="https://sthagowebwww2prd01.blob.core.windows.net/hago/images/default-source/web-library/ha_go_logo_text.png?sfvrsn=21d59c59_3"
              alt="HA-GO"
            />
          </a>
        </div>
        <p>
          <LocationOnIcon sx={{ fontSize: 16, padding: 0.1 }} />
          以下是距離您當前位置最近的普通科門診：
        </p>
        <section className={styles["specialistServices-container"]}>
          <Slider {...settings}>
            {isFetching4 ? (
              <p>
                <HourglassBottomIcon />
                資料更新中...
              </p>
            ) : (
              sortedGeneralHospitals
                .filter((obj) =>
                  obj.hospital.institution_tc.includes(searchTerm)
                ) //for input function
                .map((hospital, index) => (
                  <div
                    key={index}
                    className={styles["hospital-item"]}
                    onClick={() => handleHospitalClick2(hospital.hospital)}
                  >
                    {/* <div
                    className={districtColor2(
                      //// Use find to locate the matching 醫院聯網 and return its district
                      hospitalSpecialistServices.find(
                        (obj) => obj.type === hospital.hospital.cluster_tc
                      )?.district
                    )}
                  >
                    {
                      // Use find to locate the matching 醫院聯網 and return its district
                      hospitalSpecialistServices.find(
                        (obj) => obj.type === hospital.hospital.cluster_tc
                      )?.district
                    }
                  </div> */}
                    <div className={styles["districts"]}>
                      {/* {Use find to locate the matching clinic name and return to its 18區} */}
                      {
                        hospitalQuota.find(
                          (obj) =>
                            obj.Clinic === hospital.hospital.institution_tc
                        )?.District
                      }
                    </div>
                    <h2 className={styles["bold"]}>
                      {hospital.hospital.institution_tc}&emsp;
                      <span>
                        <span class="glyphicon glyphicon-map-marker"></span>
                        {hospital.distance.toFixed(1)}km
                      </span>
                    </h2>
                    {/* 
                  <h4 className={styles["newServices-title"]}>
                    <ClassIcon />
                    {hospital.hospital.cluster_tc}
                  </h4> */}

                    <p>
                      <QueryBuilderIcon />
                      &emsp;
                      {/* {Use find to locate the matching clinic name and return to its 18區} */}
                      {isFetching5 ? (
                        <p>
                          <HourglassBottomIcon />
                          資料更新中...
                        </p>
                      ) : (
                        hospitalQuota.find(
                          (obj) =>
                            obj.Clinic === hospital.hospital.institution_tc
                        )?.["Doctor Consultation Sessions"]
                      )}
                    </p>
                    <p>
                      <CalendarMonthIcon style={{ color: "#2683fd" }} />
                      &emsp;
                      {/* {Apple mobile device will redirect to App store, Andriod --> Google store, Desktop device all redirect to Google store} */}
                      <a
                        href="https://www3.ha.org.hk/hago/Home/DownloadApps/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        經醫管局流動應用程式「 HA Go 」預約新症
                      </a>
                    </p>
                    <p>
                      <NavigationIcon style={{ color: "#2683fd" }} />
                      &emsp;
                      <a>{hospital.hospital.address_tc}</a>
                    </p>
                  </div>
                ))
            )}
          </Slider>
        </section>
      </div>
    </div>
  );
}

export default GeneralPage;
