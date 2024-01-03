import React from "react";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

function Redirection({ userLocation, location }) {
  // Determine which location to redirect for the map
  const mapLocation = location || userLocation;
  const redirectToGoogleMaps = () => {
    window.open(
      `https://maps.google.com/maps?q=${mapLocation.latitude},${mapLocation.longitude}`
    );
  };

  const redirectToAppleMaps = () => {
    window.open(
      `http://maps.apple.com/maps?daddr=${mapLocation.latitude},${mapLocation.longitude}`
    );
  };

  return (
    <div className="redirectContainer">
      <button onClick={redirectToGoogleMaps}>
        <Fab variant="extended" size="small" color="primary">
          <NavigationIcon sx={{ mr: 1 }} />
          Google Map
        </Fab>
      </button>
      <button onClick={redirectToAppleMaps}>
        <Fab variant="extended" size="small" color="primary">
          <NavigationIcon sx={{ mr: 1 }} />
          Apple Map
        </Fab>
      </button>
    </div>
  );
}
export default Redirection;
