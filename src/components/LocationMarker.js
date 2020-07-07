import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const location = {
  lat: 51.542285,
  lng: -0.056299,
};

function LocationMarker() {
  return (
    <Marker
      position={location}
      icon={{
        url: "/icons/location-focus.svg",
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(36, 36),
      }}
    />
  );
}

export default LocationMarker;
