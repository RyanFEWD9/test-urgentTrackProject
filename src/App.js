import Distance from "./Components/Distance";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import ServicePage from "./Components/ServicePage";
import AboutUsPage from "./Components/AboutUsPage";
import PageNotFound from "./Components/PageNotFound";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  return (
    <Router>
      <nav>
        {/* Links to navigate between pages */}
        <Link to="/about-us">主頁 </Link>
        <Link to="/UrgentTrackProject">附近急症室 </Link>
        <Link to="/service">專科服務 </Link>
      </nav>

      <Routes>
        <Route
          path="/service"
          element={
            <ServicePage
              userLocation={userLocation}
              setUserLocation={setUserLocation}
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
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
