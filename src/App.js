import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./App.css";
const mapStyle = require("./mapstyle.json");

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 51.542285,
  lng: -0.056299,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });
  if (loadError) return "error loading maps";
  if (!isLoaded) return "Loading maps";
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        options={options}
      >
        <Marker
          position={{
            lat: 51.542285,
            lng: -0.056299,
          }}
          icon={{
            url: "/icons/location-focus.svg",
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default App;
