import React, { useEffect, useRef, useState } from "react";
import "./../css/general.css";

const InputComponent = ({
  name,
  type = "text",
  valini,
  valfin,
  label,
  width,
  widfld = undefined,
  size,
  disabled,
  marl = 0,
  top = 0,
  object = true,
  foco = true,
  maxLen = undefined,
  leftIco = undefined,
  helper = "",
  setState,
}) => {
  const [value, setvalue] = useState(valini);
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
    if (object) {
      if (undefined !== name) {
        setState((e) => ({ ...e, [name]: value }));
      } else {
        setState((e) => ({ ...e }));
      }
    } else {
      setState(value);
    }
  }, [value, valini]);

  useEffect(() => {
    if (valfin === "") {
      cleanField();
    }
  }, [valfin]);

  const cleanField = () => {
    if (type === "text" || type === "password") {
      setvalue("");
    }
    if (type === "decimal") {
      setvalue("");
    }
    if (type === "entero") {
      setvalue(0);
    }
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
    setvalue(e.target.value);
  };
  return (
    <>
      <div ref={inputcontainer} className="minputContainer">
        <div
          className={
            label.posit === "left" ? "fieldConteinerRow" : "fieldConteinerCol"
          }
        >
          <label ref={inplabel}>{label.text}</label>

          <div className="fieldContainer">
            {undefined !== leftIco ? (
              <img className="icono-xs" src={leftIco} alt="" />
            ) : null}
            <input
              style={undefined !== widfld ? { width: widfld } : null}
              className={
                type !== "text" && type !== "password" ? "text-right" : null
              }
              ref={inputfield}
              type={type}
              value={value}
              size={size}
              maxLength={undefined !== maxLen ? maxLen : 255}
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
      {helper !== "" && (
        <div className="helperConteinerRow">
          <label style={{ minWidth: `${label.minw}px` }}></label>
          <div style={{ width: "100%" }}>{helper}</div>
        </div>
      )}
    </>
  );
};

export default InputComponent;
