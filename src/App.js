import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerClusterer,
  HeatmapLayer,
  LoadScript
} from "@react-google-maps/api";
import "./App.css";
import LocationMarker from "./components/LocationMarker";
import ResourceMarker from "./components/ResourceMarker";
import Sidebar from "./components/Sidebar";
import resourcesData from "./data/resourcesData";
import incidentData from "./data/incidentData";
const mapStyle = require("./mapstyle.json");

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};



const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};


const clusterOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
};

function createKey(resource) {
  return resource.lat + resource.lng;
}


function App() {
  const [mapCenter, setMapCenter] = useState({
    lat: 51.542285,
    lng: -0.056299 * .99,
  })

  const mapRef = useRef();
  const [resourceDetail, setResourceDetail] = useState();
  const [zoom, setZoom] = useState(17)
  const [selectedResources, setSelectedResources] = useState({
    "vehicle-unit": false,
    "dog-unit": false,
    "firearm-unit": false,
    "mounted-police": false,
    officer: false,
    "officer-firearm": false,
    civillian: false,
  });

  const [selectedStatuses, setSelectedStatuses] = useState({
    emergency: false,
    available: false,
    tasked: false,
    "committed-deployable": false,
    "committed-not-deployable": false,
    "off-duty": false,
  });



  const filterResources = (resourceList) => {
    const resourceTypeFiltered = Object.values(selectedResources).find(resource => resource === true)
    const statusFiltered = Object.values(selectedStatuses).find(status => status === true)
    const filterUsed = resourceTypeFiltered || statusFiltered

    if (filterUsed) {
      function filterResourceTypes() {
        const resourceTypeNamesToFilter = Object.entries(selectedResources).filter(resource => resource[1] && resource).map(element => element[0])
        return resourceTypeNamesToFilter.map(resourceName => resourceList.filter(resource => resource.type === resourceName)).reduce((a, b) => a.concat(b), [])
      }

      function filterStatusTypes() {
        const statusNamesToFilter = Object.entries(selectedStatuses).filter(status => status[1] && status).map(element => element[0])
        return statusNamesToFilter.map(statusName => resourceList.filter(resource => resource.status === statusName)).reduce((a, b) => a.concat(b), [])
      }


      if (resourceTypeFiltered && statusFiltered) {
        const combinedResults = filterResourceTypes().concat(filterStatusTypes())
        const uniqueResources = combinedResults.filter((item, index, self) => index !== self.findIndex(t => (
          t.lat === item.lat && t.lng === item.lng)))
        return uniqueResources
      }
      else if (resourceTypeFiltered) {
        return filterResourceTypes()
      }
      else if (statusFiltered) {
        return filterStatusTypes()
      }

    }

    else {
      return resourceList
    }

  }
  const shownResources = filterResources(resourcesData)




  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries: ["visualization"],
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
        resourceDetail={resourceDetail}
      />

      <GoogleMap
        ref={mapRef}
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={mapCenter}
        options={options}
        panTo={mapCenter}
        onProjectionChanged={e => console.log(e)}
      >
        <HeatmapLayer

          // required
          data={incidentData.map(incident => new window.google.maps.LatLng(incident.lat, incident.lng))}

        />

        <LocationMarker />
        <MarkerClusterer options={clusterOptions}>
          {(clusterer) =>
            shownResources.map((resource) => (
              <ResourceMarker
                key={createKey(resource)}
                resource={resource}
                clusterer={clusterer}
                setMapCenter={setMapCenter}
                setResourceDetail={setResourceDetail}
                setZoom={setZoom}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
      {console.log(mapRef.map && mapRef.map.getBounds())}
    </div >
  );
}

export default App;
