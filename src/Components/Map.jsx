import React, { useEffect, useState } from "react";
import styles from "../App.module.css";

function Map() {
  const [map, setMap] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // Retrieve latitude and longitude values here (e.g., from an API or user input)
    const latitude = 22.269713;
    const longitude = 114.235209;

    setMap({
      latitude,
      longitude,
    });
  }, []);

  return (
    <div className={styles["googleMapWrapper"]}>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3691.2652607348364!2d${map.longitude}!3d${map.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDE4JzIwLjkiTiAxMTTCsDEwJzA1LjUiRQ!5e0!3m2!1sen!2shk!4v1702883238467!5m2!1sen!2shk`}
        className="google-map"
        allowFullScreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="google-map"
      ></iframe>
    </div>
  );
}

export default Map;
