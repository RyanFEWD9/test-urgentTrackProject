import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ServicePageMap from "./ServicePageMap";
import styles from "../App.module.css";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import ClassIcon from "@mui/icons-material/Class";

function GeneralPage({
  userLocation,
  setUserLocation,
  searchTerm,
  setSearchTerm,
}) {
  //For enabling CORS
  // https://cors-anywhere.herokuapp.com/corsdemo

  //CORS proxy
  const CORS = "https://cors-anywhere.herokuapp.com/";

  const generalAPI = `${CORS}https://www.ha.org.hk/opendata/facility-gop.json`;

  const quotaAPI = `${CORS}https://www.ha.org.hk/pas_gopc/pas_gopc_avg_quota_pdf/g0_9uo7a_p-tc.json`;

  //for generalAPI use
  const [isFetching4, setIsFetching4] = useState(false);
  const [hospitalGeneral, setHospitalGeneral] = useState([]);

  //for quotaAPI use
  const [isFetching5, setIsFetching5] = useState(false);
  const [hospitalQuota, setHospitalQuota] = useState([]);

  //General API Fetching
  useEffect(() => {
    const getData4 = async () => {
      try {
        setIsFetching4(true);
        const res = await fetch(generalAPI);
        const data = await res.json();
        setHospitalGeneral(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsFetching4(false);
      }
    };
    getData4();
  }, []);

  //Quota API Fetching
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

  console.log(hospitalGeneral);
  console.log(hospitalQuota);
  return (
    <div>
      <h1>普通科門診診所</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ServicePageMap userLocation={userLocation} />
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
            hospitalGeneral.map(
              ({ cluster_tc, institution_tc, address_tc }, index) => (
                <div key={index} className={styles["hospital-item"]}>
                  <h2>{institution_tc}</h2>
                  <h4 className={styles["newServices-title"]}>
                    <ClassIcon />
                    {cluster_tc}
                  </h4>
                  <p>
                    <NavigationIcon style={{ color: "#2683fd" }} />
                    &emsp;
                    <a>{address_tc}</a>
                  </p>
                </div>
              )
            )
          )}
        </section>
      </div>
    </div>
  );
}

export default GeneralPage;
