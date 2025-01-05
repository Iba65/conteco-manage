import React, { useEffect, useRef, useState } from "react";
import "./../css/general.css";

const InputComponent = ({
  name,
  type = "text",
  valini,
  valfin,
  label,
  width,
  size,
  disabled,
  marl = 0,
  top = 0,
  object = true,
  foco,
  setState,
}) => {
  const inputcontainer = useRef();
  const inputfield = useRef();
  const inplabel = useRef();

  useEffect(() => {
    inputcontainer.current.style.width = `${width}px`;
    inputcontainer.current.style.top = `${top}px`;
    inputcontainer.current.style.marginLeft = `${marl}px`;
  }, [width]);

  useEffect(() => {
    if (label.minw > 0) {
      inplabel.current.style.minWidth = `${label.minw}px`;
    }
  }, [label]);

  useEffect(() => {
    if (valfin === "") {
      cleanField();
    }
  }, [valfin]);

  const cleanField = () => {
    setvalue("");
    if (foco) inputfield.current.focus();
  };

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      const caracter = e.target.value.slice(-1);
      if (type === "decimal") {
        if (!/^[0-9.]$/.test(caracter)) {
          return;
        }
      }
      if (type === "entero") {
        if (!/^[0-9]$/.test(caracter)) {
          return;
        }
      }
    }
    //
    if (object) {
      if (undefined !== name) {
        setState((e) => ({ ...e, [name]: e.target.value }));
      } else {
        setState((e) => ({ ...e }));
      }
    } else {
      setState(value);
    }
  };
  return (
    <div ref={inputcontainer} className="minputContainer">
      <div
        className={
          label.posit === "left" ? "fieldConteinerRow" : "fieldConteinerCol"
        }
      >
        <label ref={inplabel}>{label.text}</label>

        <div className="fieldContainer">
          <input
            className={type !== "text" ? "text-right" : null}
            ref={inputfield}
            type={type}
            value={valini}
            size={size}
            disabled={disabled}
            onChange={(e) => handleChange(e)}
          />
          {!disabled ? (
            <img
              className="iconoCustomerInput"
              src={`iconos/Black/cerrar.png`}
              alt="limpiar"
              onClick={!disabled ? () => cleanField() : null}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
