/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./../css/general.css";

const CheckBoxComponent = ({
  name,
  valini,
  valfin,
  label,
  position,
  disabled,
  top = 0,
  setState,
}) => {
  const [value, setvalue] = useState(valini);
  const checkBoxContainer = useRef();
  const inplabel = useRef();
  const fcbc = useRef();

  useEffect(() => {
    setvalue(valini);
  }, [valini]);

  useEffect(() => {
    if (label.minw > 0) {
      checkBoxContainer.current.style.top = `${top}px`;
    }
  }, [top]);

  useEffect(() => {
    if (label.minw > 0) {
      inplabel.current.style.minWidth = `${label.minw}px`;
    }
  }, [label]);

  useEffect(() => {
    if (position === "left") {
      fcbc.current.style.justifyContent = `flex-end`;
    } else {
      fcbc.current.style.justifyContent = `flex-start`;
    }
  }, [position]);

  useEffect(() => {
    if (undefined !== name) {
      setState((e) => ({ ...e, [name]: value }));
    } else {
      setState((e) => ({ ...e }));
    }
  }, [value]);
  useEffect(() => {
    if (valfin === null) {
      setvalue(false);
    }
  }, [valfin]);

  return (
    <div ref={checkBoxContainer} className="checkBoxContainer">
      <div
        className={
          label.posit === "left" ? "fieldCBConteinerRow" : "fieldCBConteinerCol"
        }
      >
        {label.minw > 0 ? <div ref={inplabel} className="noLabel"></div> : null}
        <div ref={fcbc} className="fieldcbContainer">
          {position === "left" ? (
            <label className="checkboxLabel">{label.text}</label>
          ) : null}
          <input
            type="checkbox"
            checked={value}
            disabled={disabled}
            onChange={(e) => setvalue(e.target.checked)}
          />
          {position !== "left" ? (
            <label className="m-2 fs14">{label.text}</label>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CheckBoxComponent;
