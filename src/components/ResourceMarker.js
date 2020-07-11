import React from "react";
import { Marker } from "@react-google-maps/api";



const ResourceMarker = ({ key, resource, clusterer, setMapCenter, setResourceDetail, setZoom }) => {
  const handleClick = (e) => {
    setMapCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() })
    setResourceDetail(resource)
    setZoom(19)
  }

  return (
    <Marker
      key={key}
      position={{ lat: resource.lat, lng: resource.lng }}
      icon={{
        url: `/icons/${resource.type}-${resource.status}.svg`,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(16, 32),
      }}
      clusterer={clusterer}
      clickable={true}
      onClick={handleClick}
    />
  );
};

export default ResourceMarker;
