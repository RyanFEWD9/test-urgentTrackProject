import React from "react";

function Redirection() {
  const latitude = 37.7749; // Sample latitude
  const longitude = -122.4194; // Sample longitude

  const redirectToGoogleMaps = () => {
    window.open(`https://maps.google.com/maps?q=${latitude},${longitude}`);
  };

  const redirectToAppleMaps = () => {
    window.open(`http://maps.apple.com/maps?daddr=${latitude},${longitude}`);
  };

  return (
    <div>
      <button onClick={redirectToGoogleMaps}>Open in Google Maps</button>
      <button onClick={redirectToAppleMaps}>Open in Apple Maps</button>
    </div>
  );
}
export default Redirection;