import React, { useEffect, useRef, useState } from "react";
import "../css/general.css";

const TextAreaComponent = ({
  name,
  valini,
  valfin,
  label,
  dimension,
  disabled,
  top = 0,
  foco,
  setState,
}) => {
  const [value, setvalue] = useState(valini);
  const textareaContainer = useRef();
  const textaField = useRef();
  const inplabel = useRef();

  useEffect(() => {
    if (label.minw > 0) {
      textareaContainer.current.style.top = `${top}px`;
    }
  }, [top]);

  useEffect(() => {
    if (label.minw > 0) {
      inplabel.current.style.minWidth = `${label.minw}px`;
    }
  }, [label]);

  useEffect(() => {
    if (undefined !== name) {
      setState((e) => ({ ...e, [name]: value }));
    } else {
      setState((e) => ({ ...e }));
    }
  }, [value]);

  useEffect(() => {
    if (valfin === "") {
      cleanField();
    }
  }, [valfin]);

  const cleanField = () => {
    setvalue("");
    if (foco) textaField.current.focus();
  };

  return (
    <div ref={textareaContainer} className="textareaContainer">
      <div
        className={
          label.posit === "left" ? "fieldConteinerRow" : "fieldConteinerCol"
        }
      >
        <label ref={inplabel}>{label.text}</label>

        <div className="fieldtaTareaContainer">
          <textarea
            ref={textaField}
            name="comments"
            rows={dimension.rows}
            cols={dimension.cols}
            type="text"
            value={value}
            disabled={disabled}
            onChange={(e) => setvalue(e.target.value)}
          />
          <img
            className="iconoCustomerInput"
            src={`iconos/Black/cerrar.png`}
            alt="limpiar"
            onClick={!disabled ? () => cleanField() : null}
          />
        </div>
      </div>
    </div>
  );
};

export default TextAreaComponent;
