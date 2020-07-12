import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import theme from "../theme"


const options = ["resources", "incidents", "cameras", "cars"]

const CommandContainer = styled.div`
position: absolute;
margin-top:20px;
margin-left: 30px;
box-shadow: ${theme.boxShadows.ui};
z-index: 3;
width: 340px;
`

const TextInput = styled.input`
background-color:${theme.colors.bgGeneral};
padding:${theme.space[3]} ${theme.space[3]};
padding-left: 20px;
border: 1px solid ${theme.colors.bgGeneral};
color: ${theme.colors.textInactive};
outline: none;
width: 302px;
border-radius: 4px;
${theme.textStyles.body};

:focus {
  background-color: ${theme.colors.bgNav};
  outline: none;
  border: 1px solid ${theme.colors.white};
  color: ${theme.colors.white};
  border-radius: 4px 4px 0px 0px;
}
`

const CommandOption = styled.div`
background-color: ${theme.colors.bgGeneral};
padding: ${theme.space[2]};
padding-left: 20px;
${theme.textStyles.uiSmall};
color: ${theme.colors.white};
:focus {
  background-color: ${theme.colors.cta2};
  outline: none;
}
`


const CommandPanel = () => {
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(null);

  const wrapperRef = useRef(null);
  const inputRef = useRef([]);
  const commandOptionRefs = useRef([]);


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

  const handleUserKeyPress = event => {
    const { key, keyCode } = event;
    // If input focussed
    if (keyCode === 40 && display && focus === null) {
      commandOptionRefs.current[0].focus()
      setFocus(0)
    }
    // if an option is focussed
    if (focus != null) {

      // down key is pressed
      if (keyCode === 40 & focus !== options.length - 1) {
        // check if there is a valid next option
        if (commandOptionRefs.current[focus + 1] !== null) {
          commandOptionRefs.current[focus + 1].focus()
          setFocus(focus + 1)
        }
      }
      // up key is pressed
      if (keyCode === 38 && focus !== 0) {
        setFocus(focus - 1)
        commandOptionRefs.current[focus - 1].focus()
      }
      // top option is focussed and up key is pressed to go back to input
      if (keyCode === 38 & focus === 0) {
        inputRef.current.focus()
        setFocus(null)
      }
    }
    // Esc out of input field
    if (keyCode === 27 && inputRef.current) {
      inputRef.current.blur()
      setFocus(null)
      setDisplay(false)
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });
  const handleUserKeyPressUp = event => {
    const { key, keyCode } = event;

    if (keyCode === 191 && display === false) {
      inputRef.current.focus()
      setDisplay(true)
    }
  }

  // To trigger / command
  useEffect(() => {
    window.addEventListener('keyup', handleUserKeyPressUp);
    return () => {
      window.removeEventListener('keyup', handleUserKeyPressUp);
    };
  });

  console.log(inputRef.current)

  return (
    <CommandContainer ref={wrapperRef}>
      <TextInput
        id="auto"
        onClick={() => setDisplay(!display)}

        placeholder={display === false ? "Press '/' to focus" : "Enter layers to toggle"}
        value={search}
        onChange={event => setSearch(event.target.value)}
        ref={inputRef}
      />
      {display && (
        <div className="autoContainer">
          {options
            .filter((item) => item.startsWith(search))
            .map((value, i) => {
              return (
                <CommandOption
                  onClick={null}
                  className="option"
                  key={i}
                  tabIndex={i}
                  ref={(el) => (commandOptionRefs.current[i] = el)}
                >
                  <span>{value}</span>
                </CommandOption>
              );
            })}
        </div>
      )}
    </CommandContainer>

  );
}

export default CommandPanel;
