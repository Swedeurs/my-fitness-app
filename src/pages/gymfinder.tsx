/* import React, { useEffect } from 'react';
const googlekey = "your api key"
const GymFinder = () => {
  useEffect(() => {
    const loadMap = () => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
      });

      const request = {
        location: map.getCenter(),
        radius: '5000',
        type: ['gym'],
      };

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            new google.maps.Marker({
              map,
              position: place.geometry?.location,
            });
          });
        }
      });
    };

    if (window.google) {
      loadMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googlekey}`;
      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default GymFinder;
 */