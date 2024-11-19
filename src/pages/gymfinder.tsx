import React, { useEffect } from "react";

const GymFinder = () => {
  useEffect(() => {
    const googlekey = " "; // enter google api key once youve gotten it
    const loadMap = () => {
      new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    };

    if (window.google) {
      loadMap();

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googlekey}`;
      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default GymFinder;
