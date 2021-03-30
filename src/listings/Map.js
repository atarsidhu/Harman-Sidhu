import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "./Map.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 49.142637,
  lng: -122.806764,
};

const position = {
  lat: 49.142637,
  lng: -122.806764,
};

function Map() {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //   useEffect(() => {
  //     if (map) {
  //       map.panTo({ lat: 49.142637, lng: -122.806764 });
  //     }
  //   }, [map]);

  const loadMarker = (marker) => {
    // console.log(marker);
  };

  return (
    <div className="google">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* <Marker onLoad={loadMarker} position={position} /> */}
        </GoogleMap>
      ) : (
        <h1>Google Maps not loaded</h1>
      )}
    </div>
  );
}

export default Map;
