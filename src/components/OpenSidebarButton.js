import React from "react";
import styled from "styled-components";
import theme from "../theme"

const SVG = styled.svg`

`
const SVGPath = styled.path`
fill:white;
transition: fill .05s ease-in;
`

const ButtonContainer = styled.button`
position:absolute;
margin-top:20px;
margin-left: ${props => props.isOpen ? "284px" : "0px"};
z-index:2;
background-color: ${theme.colors.bgGeneral};
transition: background-color .05s ease-in;
border: none;
display: flex;
align-items: center;
height: 58px;
box-shadow: ${theme.boxShadows.ui};

:hover {
  background-color: white;
  cursor: pointer;
}
&:hover ${SVGPath} {
  fill: ${theme.colors.bgGeneral};
}

:focus {
  outline: none;
}
`


const OpenSidebarButton = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <ButtonContainer onClick={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen}>
      <SVG width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <SVGPath d="M6.5 7L0 13.5L0 0.5L6.5 7Z" fill="white" />
      </SVG>
    </ButtonContainer>
  );
}

export default OpenSidebarButton;
