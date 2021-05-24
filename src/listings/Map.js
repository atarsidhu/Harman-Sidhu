import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoBox,
} from "@react-google-maps/api";
import "./Map.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map({ position, address }) {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // const onLoad = useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map);
  // }, []);

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

  // let marker = new google.maps.Marker({
  //   position: position,
  //   map: map,
  //   icon: {
  //     url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  //     labelOrigin: new google.maps.Point(75, 32),
  //     size: new google.maps.Size(32, 32),
  //     anchor: new google.maps.Point(16, 32),
  //   },
  //   label: {
  //     text: address,
  //     color: "#C70E20",
  //     fontWeight: "bold",
  //   },
  // });
  console.log(position);
  const labelPosition = {
    lat: position.lat + 0.003,
    lng: position.lng + 0.0005,
  };
  console.log(labelPosition);

  return (
    <div className="google">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={14}
          // onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* <InfoBox
            // onLoad={onLoad}
            // options={options}
            position={labelPosition}
          >
            <div
              style={{
                backgroundColor: "transparent",
                // opacity: 0.75,
                padding: 12,
                maxWidth: 200,
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  color: `#FF0000`,
                  // fontWeight: "bold",
                  // WebkitTextStroke: "0.3px white",
                }}
              >
                {address}
              </div>
            </div>
          </InfoBox> */}
          <Marker
            onLoad={loadMarker}
            position={position}
            // label={{
            //   text: address,
            //   color: "red",
            // }}
            // icon={{
            // url:
            // "https://developers.google.com/maps/documentation/javascript/images/default-marker.png",
            // anchor: new google.maps.Point(53, 53),
            // labelOrigin: new google.maps.Point(53, 115),
            // }}
          />
        </GoogleMap>
      ) : null}
    </div>
  );
}

export default Map;
