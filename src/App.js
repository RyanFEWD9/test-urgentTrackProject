import logo from "./logo.svg";
import "./App.css";
import MyLocation from "./Components/MyLocation";
import WaitingTime from "./Components/WaitingTime";
import Filter from "./Components/Filter";
import Distance from "./Components/Distance";
import Address from "./Components/Address";
import Map from "./Components/Map";
import Redirection from "./Components/Redirection";

function App() {
  //Below is A&E waiting time
  const API1 =
    "https://api.csdi.gov.hk/apim/dataquery/api/?id=fhb_rcd_1636947932221_94410&layer=geodatastore&limit=100&offset=0";
  //Below is hospital address,website,contact, for better reading : https://portal.csdi.gov.hk/csdi-webpage/info/dataquery?id=fhb_rcd_1637028364270_14638
  const API2 =
    "https://api.csdi.gov.hk/apim/dataquery/api/?id=fhb_rcd_1637028364270_14638&layer=geotagging&limit=200&offset=0";

  return (
    <div>
      <h1>UrgentTrack</h1>
      <p style={{ color: "red" }}>
        LATITUDE and LONGITUDE just for our REF, will delete later
      </p>
      {/* page1 */}
      <MyLocation /> {/*Your Current Latitude and Longtitude in console*/}
      <WaitingTime API={API1} />
      {/*Hospital name, waiting time and last update time : Abbie*/}
      <Filter />
      {/*according to the district*/}
      <Distance />
      {/*calc distance function, need to get user gps and Hospital
      location: Ryan*/}
      <Address />
      {/*Onclick function for address and contact*/}
      {/* page2 */}
      <Map />
      {/*need Hospital coordinate and data from <Distance /> and <Adderss />, show
      address, tel and website*/}
      <Redirection />
      {/*Redirect to google map with last update time */}
    </div>
  );
}

export default App;
