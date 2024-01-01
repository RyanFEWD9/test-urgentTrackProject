import styles from "./ServicePage.module.css";
import CallIcon from "@mui/icons-material/Call";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import InfoIcon from "@mui/icons-material/Info";
import ClassIcon from "@mui/icons-material/Class";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useState, useEffect } from "react";
import { hospitalSpecialistServices } from "./utils";
import ServicePageButton from "./ServicePageButton";
import ServicePageMap from "./ServicePageMap";
import { districtColor } from "./utils";

function ServicePage({ userLocation }) {
  //For enabling CORS
  // https://cors-anywhere.herokuapp.com/corsdemo

  //CORS proxy
  const CORS = "https://cors-anywhere.herokuapp.com/";

  const BookingWaitTimeAPI = `${CORS}https://www.ha.org.hk/opendata/sop/sop-waiting-time-tc.json`;

  //for BookingAPI use
  const [isFetching3, setIsFetching3] = useState(false);
  const [hospitalsBooking, setHospitalsBooking] = useState([]);

  //for selected button
  const [selectedService, setSelectedService] = useState(null);

  //for Distance use
  const [allHospitals, setAllHospitals] = useState([]);

  //for Map use
  const [selectedHospitalLocation2, setSelectedHospitalLocation2] =
    useState(null);

  const handleHospitalSelect2 = (location) => {
    setSelectedHospitalLocation2(location);
  };

  // On Click function for hospital container
  const handleHospitalClick2 = (hospital) => {
    // Call the onHospitalSelect function provided by the parent component

    handleHospitalSelect2({
      latitude: hospital.latitude,
      longitude: hospital.longitude,
      hospitalName: hospital.name,
    });

    const scrollToPosition = () => {
      window.scrollTo({
        top: 100, // Scroll to the top of the page
        behavior: "smooth", // Add smooth scrolling behavior
      });
    };
    scrollToPosition();
  };

  //BookingWaitTime API Fetching
  useEffect(() => {
    const getData3 = async () => {
      try {
        setIsFetching3(true);
        const res = await fetch(BookingWaitTimeAPI);
        const data = await res.json();
        setHospitalsBooking(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching3(false);
      }
    };
    getData3();
  }, []);

  // Calculate Distances and sort them
  useEffect(() => {
    if (userLocation) {
      const distances = hospitalSpecialistServices.map((hospital) => {
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
      distances.sort((a, b) => a.distance - b.distance); // Sort by distance
      setAllHospitals(distances); // Set sorted hospitals with distances
    }
  }, [userLocation]); // This effect should only run when userLocation changes

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // //district color function
  // function districtColor(obj) {
  //   if (obj.hospital.district === "港島") {
  //     return "hkisland";
  //   }
  //   if (obj.hospital.district === "九龍") {
  //     return "kowloon";
  //   }
  //   if (obj.hospital.district === "新界") {
  //     return "newterr";
  //   }
  // }
  console.log(hospitalsBooking);
  console.log(allHospitals);

  return (
    <div>
      <h1>
        <LocalHospitalIcon sx={{ fontSize: 30 }} />
        專科服務
      </h1>
      <ServicePageMap
        userLocation={userLocation}
        location={selectedHospitalLocation2}
      />
      <div className={styles["button-container"]}>
        <ServicePageButton setSelectedService={setSelectedService} />
      </div>
      <h3>
        <LocationOnIcon />
        以下是距離您當前位置最近的專科醫院：
      </h3>
      <div className={styles["specialistServices-container"]}>
        {allHospitals
          .filter(
            (obj) =>
              selectedService === null ||
              obj.hospital.specialistServices[selectedService] === 1
          )
          .map((obj) => (
            <div
              key={obj.hospital.name}
              className={styles["border"]}
              onClick={() => handleHospitalClick2(obj.hospital)}
            >
              <div className={styles[districtColor(obj)]}>
                <p>{obj.hospital.district}區</p>
              </div>
              <p className={styles["bold"]}>
                {obj.hospital.name}
                <span>
                  <LocationOnIcon />
                  {obj.distance.toFixed(1)}km
                </span>
              </p>
              <p>
                <NavigationIcon />
                <a>{obj.hospital.address}</a>
              </p>
              <p>
                <CallIcon />
                <a href={`tel:${obj.hospital.contact}`}>
                  {obj.hospital.contact}
                </a>
              </p>
              <p>
                <ClassIcon />
                {obj.hospital.type}：新症輪候時間
              </p>
              <ol>
                {/* {service=key, avaiable= value} */}
                {Object.entries(obj.hospital.specialistServices)
                  .filter(([service, available]) => available === 1)
                  .map(([service, _], index) => {
                    // Find the booking wait time for the current service
                    const waitTimeUrgent = hospitalsBooking.find(
                      (time) =>
                        time.cluster === obj.hospital.type &&
                        time.specialty === service &&
                        time.Category === "緊急新症 - 中位數"
                    );

                    const waitTimeStableSemiUrgent = hospitalsBooking.find(
                      (time) =>
                        time.cluster === obj.hospital.type &&
                        time.specialty === service &&
                        time.Category === "半緊急新症 - 中位數"
                    );

                    const waitTimeStable = hospitalsBooking.find(
                      (time) =>
                        time.cluster === obj.hospital.type &&
                        time.specialty === service &&
                        time.Category === "穩定新症 - 中位數"
                    );

                    const waitTimeStableLongest = hospitalsBooking.find(
                      (time) =>
                        time.cluster === obj.hospital.type &&
                        time.specialty === service &&
                        time.Category === "穩定新症 - 最長"
                    );

                    return (
                      <li key={index}>
                        {service}
                        <span>
                          {isFetching3 ? (
                            <p>
                              <HourglassBottomIcon />
                              等候時間更新中...
                            </p>
                          ) : (
                            <p>
                              {waitTimeUrgent ? (
                                <div>
                                  <p className={styles["blue"]}>
                                    <AccessTimeIcon />
                                    緊急新症：{waitTimeUrgent.Value}
                                  </p>
                                  <p className={styles["orange"]}>
                                    <AccessTimeIcon />
                                    半緊急新症：{waitTimeStableSemiUrgent.Value}
                                  </p>
                                  <p className={styles["red"]}>
                                    <AccessTimeIcon />
                                    穩定新症：{waitTimeStable.Value} (最長：
                                    {waitTimeStableLongest.Value})
                                  </p>
                                </div>
                              ) : (
                                <span>
                                  *新症輪候時間只適用於耳鼻喉科丶眼科丶婦科丶內科丶骨科丶兒科丶精神科及外科
                                </span>
                              )}
                            </p>
                          )}
                        </span>
                      </li>
                    );
                  })}
              </ol>
              <p>
                <InfoIcon />
                <a
                  href={obj.hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看更多
                </a>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ServicePage;
