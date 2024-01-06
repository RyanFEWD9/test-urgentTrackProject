import Distance from "./Components/Distance";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styles from "./App.module.css";
import ServicePage from "./Components/ServicePage";
import AboutUsPage from "./Components/AboutUsPage";
import PageNotFound from "./Components/PageNotFound";
import GeneralPage from "./Components/GeneralPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ambalance from "./Components/Ambalance";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Router>
      <section className={styles["navBar-logoName"]}>
        <span>UrgentTrack</span>
      </section>
      <div className={styles["navBar-homepage"]}>
        <nav>
          {/* Links to navigate between pages */}

          <Link to="/about-us"> 主要頁</Link>
          <Link to="/UrgentTrackProject"> 急症室</Link>
          <Link to="/service">專科服務</Link>
          <Link to="/general">普通科</Link>
          <Link to="/ambalance">緊急熱線</Link>
        </nav>
      </div>

      <Routes>
        <Route
          path="/service"
          element={
            <ServicePage
              userLocation={userLocation}
              setUserLocation={setUserLocation}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/UrgentTrackProject"
          element={
            <Distance
              userLocation={userLocation}
              setUserLocation={setUserLocation}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
        <Route
          path="/general"
          element={
            <GeneralPage
              userLocation={userLocation}
              setUserLocation={setUserLocation}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          }
        />
        <Route path="/ambalance" element={<Ambalance />} />
      </Routes>
    </Router>
  );
}

export default App;
