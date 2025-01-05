/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./../css/general.css";

const RadioButtonComponent = ({
  name,
  list = [],
  valini,
  valfin,
  label,
  position,
  disabled,
  object = true,
  top = 0,
  setState,
}) => {
  const [value, setvalue] = useState(valini);
  const radiobutContainer = useRef();
  const inplabel = useRef();
  const labelradio = useRef();

  useEffect(() => {
    if (label.minw > 0) {
      radiobutContainer.current.style.top = `${top}px`;
    }
  }, [top]);

  useEffect(() => {
    if (label.minw > 0) {
      inplabel.current.style.minWidth = `${label.minw}px`;
    }
    if (label.color) {
      labelradio.current.style.color = label.color;
    }
  }, [label]);

  useEffect(() => {
    if (object) {
      if (undefined !== name) {
        setState((e) => ({ ...e, [name]: parseInt(value) }));
      } else {
        setState((e) => ({ ...e }));
      }
    } else {
      setState(parseInt(value));
    }
  }, [value, valini]);
  useEffect(() => {
    if (valfin === 0) {
      setvalue(1);
    }
  }, [valfin]);

  /*const getpos = () => {
    return radiobutContainer.current.getBoundingClientRect();
  };*/

  return (
    <div name="radio" ref={radiobutContainer} className="radiobutContainer">
      <div
        className={
          label.posit === "left" ? "fieldConteinerRow" : "fieldConteinerCol"
        }
      >
        <label ref={inplabel}>{label.text}</label>

        <div ref={labelradio} className={`radio${position}`}>
          {list.map((option, index) => (
            <div className="radiofield pl-3 pr-2" key={option.key}>
              <input
                type="radio"
                id={option.value}
                name={name}
                value={index + 1}
                checked={parseInt(value) === parseInt(option.key)}
                onChange={(e) => setvalue(e.target.value)}
                disabled={disabled}
              />
              <span htmlFor={option.value}>{option.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioButtonComponent;
