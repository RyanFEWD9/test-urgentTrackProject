import MyLocation from "./Components/MyLocation";
import Filter from "./Components/Filter";
import Distance from "./Components/Distance";

import Map from "./Components/Map";

import SearchBar from "./Components/SearchBar";
import LastUploadTime from "./Components/LastUploadTime";

function App() {
  //Below is A&E waiting time
  const API1 =
    "https://cors-anywhere.herokuapp.com/https://www.ha.org.hk/opendata/aed/aedwtdata-tc.json";
  //Below is hospital address,website,contact, for better reading : https://portal.csdi.gov.hk/csdi-webpage/info/dataquery?id=fhb_rcd_1637028364270_14638
  const API2 =
    "https://api.csdi.gov.hk/apim/dataquery/api/?id=fhb_rcd_1637028364270_14638&layer=geotagging&limit=200&offset=0";

  //below API url
  const hospitalUrl = "https://www.ha.org.hk/opendata/facility-hosp.json";

  return (
    <div>
      <img
        src="public/HospitalLogoWithName.png"
        alt="HosipitalLogo"
        width="200em"
      />
      <h1>急症室等候時間</h1>
      <SearchBar />
      {/* page1 */}
      <MyLocation /> {/*Your Current Latitude and Longtitude in console*/}
      <Filter />
      {/*according to the district*/}
      {/*Redirect to google map with last update time */}
      {/* page1 */}
      <Map />
      {/*need Hospital coordinate and data from <Distance /> and <Adderss />, show
      address, tel and website*/}
      <Distance API={API1} />
      {/*calc distance function, need to get user gps and Hospital
      location: Ryan*/}
      <LastUploadTime API={API1} />
    </div>
  );
}

export default App;
