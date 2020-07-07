import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./App.css";
import LocationMarker from "./components/LocationMarker";
import GenerateResourceMarkers from "./components/GenerateResourceMarkers";
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
        <LocationMarker />
        <GenerateResourceMarkers />
      </GoogleMap>
    </div>
  );
}

export default App;
