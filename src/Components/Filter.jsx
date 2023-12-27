import React from "react";

function Filter() {
  const latitude = 37.7749; // Sample latitude
  const longitude = -122.4194; // Sample longitude

  const redirectToGoogleMaps = () => {
    window.open(`https://maps.google.com/maps?q=${latitude},${longitude}`);
  };

  const redirectToAppleMaps = () => {
    window.open(`http://maps.apple.com/maps?daddr=${latitude},${longitude}`);
  };
  return (
    <div className="FilterWrapper">
      <button>
        
          <img src="/filter.png" width="12em" />
      <span>篩選</span>
        
      </button>
      <button>
        
          <img src="/mapsFlags.png" width="12em" />
      <span >位置</span>
        
      </button>
      <span>
        <button onClick={redirectToGoogleMaps}>Google Maps</button>
        <button onClick={redirectToAppleMaps}>Apple Maps</button>
      </span>
    </div>
  );
}

export default Filter;
