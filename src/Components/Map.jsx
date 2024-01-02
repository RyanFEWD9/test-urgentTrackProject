import React from "react";
import styles from "../App.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { hospitalGoogleIframeLink } from "./utils";

function Map({ userLocation, location }) {
  // Determine which location to use for the map
  const mapLocation = location || userLocation;

  // If neither location nor userLocation is provided, show a loading message
  if (!mapLocation) {
    return (
      <p>
        <HourglassBottomIcon />
        地圖更新中...
      </p>
    );
  }

  // if (userLocation === null) {
  //   return <p>請允許系統存取您的當前位置及重新更新頁面</p>;
  // }

  // Function to get iframe src based on location
  const getIframeSrc = () => {
    //to prevent location.hospitalName value is null before user clicks
    if (location && location.hospitalName === hospitalGoogleIframeLink.NameTC) {
      return hospitalGoogleIframeLink.googleIframeLink;
    } else {
      //userlocation
      return `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3691.2652607348364!2d${mapLocation.longitude}!3d${mapLocation.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDE4JzIwLjkiTiAxMTTCsDEwJzA1LjUiRQ!5e0!3m2!1sen!2shk!4v1702883238467!5m2!1sen!2shk`;
    }
  };

  return (
    <div className={styles["googleMapWrapper"]}>
      <p className={styles["mapHeading"]}>
        <LocationOnIcon />
        {location ? `${location.hospitalName}位置：` : "您的當前位置："}
      </p>
      <div className={styles["mapContainer"]}>
        <iframe
          src={getIframeSrc()}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Map;
