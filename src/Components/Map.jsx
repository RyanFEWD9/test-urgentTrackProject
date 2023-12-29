import React from "react";
import styles from "../App.module.css";

function Map({ userLocation, location }) {
  // Determine which location to use for the map
  const mapLocation = location || userLocation;

  // If neither location nor userLocation is provided, show a loading message or some default state
  if (!mapLocation) {
    return <div>地圖更新中...</div>;
  }

  return (
    <div className={styles["googleMapWrapper"]}>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3691.2652607348364!2d${mapLocation.longitude}!3d${mapLocation.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDE4JzIwLjkiTiAxMTTCsDEwJzA1LjUiRQ!5e0!3m2!1sen!2shk!4v1702883238467!5m2!1sen!2shk`}
        className="google-map"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="google-map"
      ></iframe>
    </div>
  );
}

export default Map;
