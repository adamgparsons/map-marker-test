import React, { useState, useEffect, useRef } from "react";
import theme from "../theme";

import styled from "styled-components";

const SidebarContainer = styled.aside`
  background-color: #20202c;
  width: 380px;
  height: 100vh;
  position: absolute;
  z-index: 1;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
  font-size: ${theme.fontSizes[3]};
`;
function prettify(str) {
  return str.replace(/(-|^)([^-]?)/g, function (_, prep, letter) {
    return (prep && " ") + letter.toUpperCase();
  });
}

const options = ["resources", "incidents", "cameras", "cars"]
const Sidebar = ({
  selectedResources,
  setSelectedResources,
  selectedStatuses,
  setSelectedStatuses,
  resourceDetail,
}) => {

  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

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
      <div ref={wrapperRef}>

        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        {display && (
          <div className="autoContainer">
            {console.log(options
              .filter((item) => item.startsWith(search)))}
            {/* substr( $string_n, 0, 4 ) === "http" */}
            {console.log(search.length)}
            {options
              .filter((item) => item.startsWith(search))
              .map((value, i) => {
                return (
                  <div
                    // onClick={() => updatePokeDex(value.name)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>


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
