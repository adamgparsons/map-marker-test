import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import theme from "../theme";


function prettify(str) {
  return str.replace(/(-|^)([^-]?)/g, function (_, prep, letter) {
    return (prep && " ") + letter.toUpperCase();
  });
}
const SidebarContainer = styled.aside`
  background-color: #20202c;
  width: 284px;
  height: 100vh;
  position: absolute;
  z-index: 1;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  font-size: ${theme.fontSizes[3]};
`;



const Sidebar = ({
  selectedResources,
  setSelectedResources,
  selectedStatuses,
  setSelectedStatuses,
  resourceDetail,
}) => {





  const handleChange = (e) => {
    if (e.target.dataset.filterName === "resource") {
      setSelectedResources({
        ...selectedResources,
        [e.target.name]: !selectedResources[e.target.name],
      });
    }

    if (e.target.dataset.filterName === "status") {
      setSelectedStatuses({
        ...selectedStatuses,
        [e.target.name]: !selectedStatuses[e.target.name],
      });
    }
  };

  const Checkbox = ({ filterItem, filterName }) => {
    return (
      <div>

        <label>
          <input
            type="checkbox"
            data-filter-name={filterName}
            name={filterItem[0]}
            checked={filterItem[1]}
            onChange={handleChange}
          />
          {prettify(filterItem[0])}
        </label>
      </div>
    );
  };

  return (
    <SidebarContainer>


      <h1>Resources</h1>
      <form>
        {Object.entries(selectedResources).map((resource) => (
          <Checkbox filterItem={resource} filterName="resource" />
        ))}
      </form>

      <h1>Status</h1>
      <form>
        {Object.entries(selectedStatuses).map((status) => (
          <Checkbox filterItem={status} filterName="status" />
        ))}
      </form>

      {resourceDetail && <div>
        <h2>{resourceDetail.type}</h2>
        <p>{resourceDetail.status}</p>
      </div>}
    </SidebarContainer>
  );
};

export default Sidebar;
