import Distance from "./Components/Distance";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Map from "./Components/Map";
import LastUploadTime from "./Components/LastUploadTime";

import SearchBar from "./Components/SearchBar";
import ServicePage from "./Components/ServicePage";
import AboutUsPage from "./Components/AboutUsPage";
import PageNotFound from "./Components/PageNotFound";

function App() {
  const [latestTime, setLatestTime] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospitalLocation, setSelectedHospitalLocation] =
    useState(null);

  // Function to update the selected hospital location
  const handleHospitalSelect = (location) => {
    setSelectedHospitalLocation(location);
  };

  //Below enable CORS
  // https://cors-anywhere.herokuapp.com/corsdemo

  //Below is CORS proxy
  const CORS = "https://cors-anywhere.herokuapp.com/";

  //Below is A&E waiting time
  const API1 = `${CORS}https://www.ha.org.hk/opendata/aed/aedwtdata-tc.json`;

  //Below is hospital address,website,contact, for better reading : https://portal.csdi.gov.hk/csdi-webpage/info/dataquery?id=fhb_rcd_1637028364270_14638
  const API2 = `${CORS}https://api.csdi.gov.hk/apim/dataquery/api/?id=fhb_rcd_1637028364270_14638&layer=geotagging&limit=200&offset=0`;

  //Below Distance and Hospital Name
  const hospitalUrl = `${CORS}https://www.ha.org.hk/opendata/facility-hosp.json`;

  return (
    <Router>
      <nav>
        {/* Links to navigate between pages */}
        <Link to="/UrgentTrackProject">主頁 </Link>
        <Link to="/search">搜尋 </Link>
        <Link to="/service">專科服務 </Link>
        <Link to="/about-us">關於我們 </Link>
      </nav>

      <Routes>
        <Route path="/search" element={<SearchBar />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/UrgentTrackProject"
          element={
            <div>
              <h1>急症室等候時間</h1>
              <div className="MapWithDistanceWrapper">
                <Map
                  userLocation={userLocation}
                  location={selectedHospitalLocation}
                />
                <Distance
                  setLatestTime={setLatestTime}
                  WaitTimeAPI={API1}
                  DistanceAPI={hospitalUrl}
                  TelAPI={API2}
                  userLocation={userLocation}
                  setUserLocation={setUserLocation}
                  onHospitalSelect={handleHospitalSelect}
                />
              </div>
              <LastUploadTime latestTime={latestTime} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
