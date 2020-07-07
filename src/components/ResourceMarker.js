import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const ResourceMarker = ({ location, iconUrl }) => {
  return (
    <Marker
      position={location}
      icon={{
        url: iconUrl,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(16, 16),
      }}
    />
  );
};

export default ResourceMarker;
