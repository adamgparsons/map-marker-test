import React from "react";
import ResourceMarker from "./ResourceMarker";

// const location = {
//   lat: 51.543225,
//   lng: -0.054604,
// };

const locations = [
  [51.543225, -0.054604],
  [51.543439, -0.058294],
  [51.545671, -0.058602],
  [51.542012, -0.061867],
  [51.53759, -0.06043],
  [51.537898, -0.055204],
];

const iconUrls = [
  "/icons/Civillian pin-1.svg",
  "/icons/Civillian pin-2.svg",
  "/icons/Civillian pin-3.svg",
  "/icons/Civillian pin-4.svg",
  "/icons/Civillian pin-5.svg",
  "/icons/Civillian pin.svg",
  "/icons/Armed officer pin.svg",
  "/icons/Armed officer pin-1.svg",
  "/icons/Armed officer pin-2.svg",
  "/icons/Armed officer pin-3.svg",
  "/icons/Armed officer pin-4.svg",
  "/icons/Armed officer pin-5.svg",
  "/icons/Civillian pin.svg",
  "/icons/Civillian pin-1.svg",
  "/icons/Civillian pin-2.svg",
  "/icons/Civillian pin-3.svg",
  "/icons/Civillian pin-4.svg",
  "/icons/Civillian pin-5.svg",
  "/icons/Dog unit pin.svg",
  "/icons/Dog unit pin-1.svg",
  "/icons/Dog unit pin-2.svg",
  "/icons/Dog unit pin-3.svg",
  "/icons/Dog unit pin-4.svg",
  "/icons/Dog unit pin-5.svg",
  "/icons/Firearm unit pin.svg",
  "/icons/Firearm unit pin-1.svg",
  "/icons/Firearm unit pin-2.svg",
  "/icons/Firearm unit pin-3.svg",
  "/icons/Firearm unit pin-4.svg",
  "/icons/Firearm unit pin-5.svg",
  "/icons/Mounted pin.svg",
  "/icons/Mounted pin-1.svg",
  "/icons/Mounted pin-2.svg",
  "/icons/Mounted pin-3.svg",
  "/icons/Mounted pin-4.svg",
  "/icons/Mounted pin-5.svg",
  "/icons/Officer pin.svg",
  "/icons/Officer pin-1.svg",
  "/icons/Officer pin-2.svg",
  "/icons/Officer pin-3.svg",
  "/icons/Officer pin-4.svg",
  "/icons/Officer pin-5.svg",
];

function randomResource() {
  const randomLocation =
    locations[[Math.floor(Math.random() * locations.length)]];
  const randomPin = iconUrls[[Math.floor(Math.random() * iconUrls.length)]];
  return (
    <ResourceMarker
      location={{ lat: randomLocation[0], lng: randomLocation[1] }}
      iconUrl={randomPin}
    />
  );
}

const GenerateResourceMarkers = () => {
  return locations.map((location) => randomResource());
};

export default GenerateResourceMarkers;
