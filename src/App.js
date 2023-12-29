import Filter from "./Components/Filter";
import Distance from "./Components/Distance";
import React, { useState } from "react";
import Map from "./Components/Map";

import SearchBar from "./Components/SearchBar";
import LastUploadTime from "./Components/LastUploadTime";
import TimeContext from "./TimeContext";

function App() {
  const [latestTime, setLatestTime] = React.useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospitalLocation, setSelectedHospitalLocation] =
    useState(null);

  // Function to update the selected hospital location
  const handleHospitalSelect = (location) => {
    setSelectedHospitalLocation(location);
  };
  //Below is CORS proxy
  const CORS = "https://cors-anywhere.herokuapp.com/";

  //Below is A&E waiting time
  const API1 = `${CORS}https://www.ha.org.hk/opendata/aed/aedwtdata-tc.json`;

  //Below is hospital address,website,contact, for better reading : https://portal.csdi.gov.hk/csdi-webpage/info/dataquery?id=fhb_rcd_1637028364270_14638
  const API2 = `${CORS}https://api.csdi.gov.hk/apim/dataquery/api/?id=fhb_rcd_1637028364270_14638&layer=geotagging&limit=200&offset=0`;

  //Below Distance and Hospital Name
  const hospitalUrl = `${CORS}https://www.ha.org.hk/opendata/facility-hosp.json`;

  return (
    <div>
      <h1>急症室等候時間</h1>
      <SearchBar />
      <Filter />
      {/*according to the district*/}
      {/*Redirect to google map with last update time */}

      <Map userLocation={userLocation} location={selectedHospitalLocation} />
      <Distance
        setLatestTime={setLatestTime}
        WaitTimeAPI={API1}
        DistanceAPI={hospitalUrl}
        TelAPI={API2}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        onHospitalSelect={handleHospitalSelect}
      />

      {/*need Hospital coordinate and data from <Distance /> and <Adderss />, show
      address, tel and website*/}
      <TimeContext.Provider value={latestTime}>
        <LastUploadTime />
      </TimeContext.Provider>
    </div>
  );
}

export default App;
