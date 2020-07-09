import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import "./App.css";
import LocationMarker from "./components/LocationMarker";
import ResourceMarker from "./components/ResourceMarker";
import Sidebar from "./components/Sidebar";
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

const resources = [
  { type: "vehicle-unit", status: "emergency", lat: 51.543225, lng: -0.054604 },
  { type: "dog-unit", status: "available", lat: 51.543439, lng: -0.058294 },
  { type: "firearm-unit", status: "available", lat: 51.545671, lng: -0.058602 },
  {
    type: "mounted-police",
    status: "available",
    lat: 51.542012,
    lng: -0.061867,
  },
  { type: "officer", status: "tasked", lat: 51.53759, lng: -0.06043 },
  {
    type: "officer",
    status: "committed-deployable",
    lat: 51.537898,
    lng: -0.055204,
  },
  {
    type: "officer-firearm",
    status: "committed-not-deployable",
    lat: 51.537275,
    lng: -0.061237,
  },
  {
    type: "mounted-police",
    status: "emergency",
    lat: 51.538763,
    lng: -0.057718,
  },
  { type: "officer", status: "emergency", lat: 51.539425, lng: -0.056302 },
  { type: "vehicle-unit", status: "available", lat: 51.541435, lng: -0.060571 },
  { type: "officer", status: "off-duty", lat: 51.543199, lng: -0.054614 },
  { type: "civillian", status: "tasked", lat: 51.541326, lng: -0.056702 },
  { type: "officer", status: "tasked", lat: 51.539986, lng: -0.05934 },
  { type: "dog-unit", status: "tasked", lat: 51.542037, lng: -0.051657 },
  { type: "officer", status: "emergency", lat: 51.543096, lng: -0.04892 },
];

const clusterOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

function createKey(resource) {
  return resource.lat + resource.lng;
}

const resourceToShow = (resourceList, filterA) => {
  if (filterA["vehicle-unit"] === false) {
    return resourceList;
  }
  if (filterA["vehicle-unit"] === true) {
    resourceList.filter((resource) => resource.type === "vehicle-unit");
  }
};

function App() {
  const [selectedResources, setSelectedResources] = useState({
    "vehicle-unit": false,
    "dog-unit": false,
    "firearm-unit": false,
    "mounted-police": false,
    officer: false,
    "officer-firearm": false,
    civillian: false,
  });
  const [shownResources, setShownResources] = useState(
    resourceToShow(resources, selectedResources)
  );

  useEffect(() => {
    // Update the document title using the browser API
    setShownResources(resourceToShow(resources, selectedResources));
  });

  const [selectedStatuses, setSelectedStatuses] = useState({
    emergency: false,
    available: false,
    tasked: false,
    "committed-deployable": false,
    "committed-not-deployable": false,
    "off-duty": false,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });
  if (loadError) return "error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Sidebar
        selectedResources={selectedResources}
        setSelectedResources={setSelectedResources}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={center}
        options={options}
      >
        <LocationMarker />
        <MarkerClusterer options={clusterOptions}>
          {(clusterer) =>
            shownResources.map((resource) => (
              <ResourceMarker
                key={createKey(resource)}
                resource={resource}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
}

export default App;
