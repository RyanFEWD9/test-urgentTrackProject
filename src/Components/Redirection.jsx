import React from "react";

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
    <div>
      <button onClick={redirectToGoogleMaps}>Open in Google Maps</button>
      <button onClick={redirectToAppleMaps}>Open in Apple Maps</button>
    </div>
  );
}
export default Redirection;
