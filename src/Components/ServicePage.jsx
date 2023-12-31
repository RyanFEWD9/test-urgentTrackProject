import styles from "./ServicePage.module.css";
import CallIcon from "@mui/icons-material/Call";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import ClassIcon from "@mui/icons-material/Class";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useState, useEffect } from "react";
import { hospitalSpecialistServices } from "./utils";

function ServicePage() {
  //For enabling CORS
  // https://cors-anywhere.herokuapp.com/corsdemo

  //CORS proxy
  const CORS = "https://cors-anywhere.herokuapp.com/";

  const BookingWaitTimeAPI = `${CORS}https://www.ha.org.hk/opendata/sop/sop-waiting-time-tc.json`;

  //For BookingAPI use
  const [isFetching3, setIsFetching3] = useState(false);
  const [hospitalsBooking, setHospitalsBooking] = useState([]);

  //for selected button
  const [selectedService, setSelectedService] = useState(null);

  //Onlick function for buttons
  const handleServiceClick = (serviceKey) => {
    setSelectedService(serviceKey);
  };

  // Function to filter hospitals based on the selected service
  const filteredHospitals = selectedService
    ? hospitalSpecialistServices.filter(
        (hospital) => hospital.specialistServices[selectedService] === 1
      )
    : hospitalSpecialistServices;

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

  console.log(hospitalsBooking);
  return (
    <div>
      <h1>
        <LocalHospitalIcon sx={{ fontSize: 30 }} />
        專科服務
      </h1>
      <div className={styles["button-container"]}>
        {/* Map over a list of service keys to create buttons */}
        {Object.keys(hospitalSpecialistServices[0].specialistServices).map(
          (serviceKey) => (
            <button
              onClick={() => handleServiceClick(serviceKey)}
              key={serviceKey}
              className={styles["button"]}
            >
              {serviceKey}
            </button>
          )
        )}
      </div>
      <h2>
        新症輪候時間
        <span>
          ＊只適用於耳鼻喉科丶眼科丶婦科丶內科丶骨科丶兒科丶精神科及外科
        </span>
      </h2>

      <div className={styles["specialistServices-container"]}>
        {filteredHospitals.map((hospital) => (
          <div key={hospital.name} className={styles["border"]}>
            <p className={styles["bold"]}>{hospital.name}</p>
            <p>
              <ClassIcon />
              {hospital.type}
            </p>
            <ol>
              {/* {service=key, avaiable= value} */}
              {Object.entries(hospital.specialistServices)
                .filter(([service, available]) => available === 1)
                .map(([service, _], index) => {
                  // Find the booking wait time for the current service
                  const waitTimeUrgent = hospitalsBooking.find(
                    (time) =>
                      time.cluster === hospital.type &&
                      time.specialty === service &&
                      time.Category === "緊急新症 - 中位數"
                  );

                  const waitTimeStableSemiUrgent = hospitalsBooking.find(
                    (time) =>
                      time.cluster === hospital.type &&
                      time.specialty === service &&
                      time.Category === "半緊急新症 - 中位數"
                  );

                  const waitTimeStable = hospitalsBooking.find(
                    (time) =>
                      time.cluster === hospital.type &&
                      time.specialty === service &&
                      time.Category === "穩定新症 - 中位數"
                  );

                  const waitTimeStableLongest = hospitalsBooking.find(
                    (time) =>
                      time.cluster === hospital.type &&
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
                                <p>
                                  <AccessTimeIcon />
                                  緊急新症：{waitTimeUrgent.Value}
                                </p>
                                <p>
                                  <AccessTimeIcon />
                                  半緊急新症：{waitTimeStableSemiUrgent.Value}
                                </p>
                                <p>
                                  <AccessTimeIcon />
                                  穩定新症：{waitTimeStable.Value} (最長：
                                  {waitTimeStableLongest.Value})
                                </p>
                              </div>
                            ) : null}
                          </p>
                        )}
                      </span>
                    </li>
                  );
                })}
            </ol>
            <p>
              <LocationOnIcon />
              {hospital.address}
            </p>
            <p>
              <CallIcon />
              <a href={`tel:${hospital.contact}`}>{hospital.contact}</a>
            </p>
            <p>
              <InfoIcon />
              <a
                href={hospital.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                查看更多
              </a>
            </p>
            {/* <p>
              {hospitalsBooking[287].Category} : {hospitalsBooking[287].Value}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicePage;
