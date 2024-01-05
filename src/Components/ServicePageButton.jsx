import React, { useState } from "react";
import styles from "./ServicePage.module.css";
import { hospitalSpecialistServices } from "./utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function ServicePageButton({ setSelectedService }) {
  const [selectedKey, setSelectedKey] = useState(null);

  // OnClick function for buttons
  const handleServiceClick = (serviceKey) => {
    setSelectedService(serviceKey);
    setSelectedKey(serviceKey);
  };
  //slider setting
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className={styles["button-container"]}>
      {/* Map over a list of service keys to create buttons */}
      <Slider {...settings}>
        {Object.keys(hospitalSpecialistServices[0].specialistServices).map(
          (serviceKey) => (
            <button
              onClick={() => handleServiceClick(serviceKey)}
              key={serviceKey}
              // {highlighted color for selected button}
              className={`${styles["button"]} ${
                selectedKey === serviceKey ? styles["selected"] : ""
              }`}
            >
              {serviceKey}
            </button>
          )
        )}
      </Slider>
    </div>
  );
}
export default ServicePageButton;
