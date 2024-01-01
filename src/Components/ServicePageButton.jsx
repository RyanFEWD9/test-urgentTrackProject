import React from "react";
import styles from "./ServicePage.module.css";
import { hospitalSpecialistServices } from "./utils";

function ServicePageButton({ setSelectedService }) {
  //Onlick function for buttons
  const handleServiceClick = (serviceKey) => {
    setSelectedService(serviceKey);
  };

  return (
    <>
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
    </>
  );
}
export default ServicePageButton;
