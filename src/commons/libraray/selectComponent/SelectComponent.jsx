import React, { useContext, useEffect, useRef, useState } from "react";
import "./../css/general.css";
import { LibreriaContext } from "../context/LibreriaContext";

const SelectComponent = ({
  name,
  lista,
  valini,
  label,
  size,
  disabled,
  width,
  height = "auto",
  top = 0,
  nivel = 0,
  color,
  setState,
  setuplist,
  editable = false,
  //setStatelist,
}) => {
  const { libreriaState, libreriaDispatch } = useContext(LibreriaContext);
  const [value, setvalue] = useState(valini);
  const [despliega, setDespliega] = useState(false);
  const selfield = useRef();
  const selTextBox = useRef();
  const listop = useRef();
  const selcon = useRef();
  const selabel = useRef();

  useEffect(() => {
    setvalue(valini);
    setState(valini);
    selfield.current.value = valini;
  }, [valini]);

  useEffect(() => {
    if (libreriaState.fieldActive !== name) {
      if (despliega) {
        setDespliega(false);
      }
    }
  }, [libreriaState.fieldActive]);

  useEffect(() => {
    const vali = lista.find((reg) => reg.key === valini);
    if (undefined !== vali) {
      setvalue(vali.value);
    } else {
      setvalue("");
    }
  }, [lista]);

  useEffect(() => {
    selcon.current.style.width = `${width}px`;
    selcon.current.style.top = `${top}px`;
  }, [width, top]);

  /*useEffect(() => {
    setStatelist(despliega);
  }, [despliega]);*/

  useEffect(() => {
    if (label.minw > 0) {
      selabel.current.style.minWidth = `${label.minw}px`;
    }
  }, [label]);

  useEffect(() => {
    if (despliega) {
      listop.current.style.display = "flex";
      if (height === "auto") {
        listop.current.style.height = height;
      } else {
        listop.current.style.height = `${height}px`;
      }
      listop.current.style.position = "relative";
      listop.current.style.zIndex = "100";
      listop.current.style.left = `${
        selTextBox.current.getBoundingClientRect().left -
        selcon.current.getBoundingClientRect().left
      }px`;
    } else {
      listop.current.style.display = "none";
      listop.current.style.height = "0px";
    }
  }, [despliega]);

  const viewOptions = () => {
    libreriaDispatch({
      type: "FIELD_ACTIVE",
      payload: name,
    });
    setDespliega(true);
  };
  const selectOpt = (key) => {
    const optselis = lista.find((lis) => lis.key === key);
    if (undefined !== optselis) {
      if (undefined !== optselis.text) {
        setvalue(optselis.text);
        if (undefined !== setState) {
          setState(optselis.text);
          selfield.current.value = optselis.text;
        }
      } else {
        setvalue(optselis.value);
        if (undefined !== setState) {
          setState(optselis.value);
          selfield.current.value = optselis.value;
        }
      }
      setDespliega(false);
    }
  };

  const closeList = () => {
    setDespliega(false);
  };

  const isEmpty = (e) => {
    if (e.target.value.length <= 0) {
      setvalue("");
      setState("");
    } else {
      if (undefined !== setuplist) {
        setuplist(e.target.value);
        setDespliega(false);
      }
    }
  };

  const cleanField = () => {
    setvalue("");
    setState("");
    setDespliega(false);
  };
  return (
    <div ref={selcon} className="selectContainer">
      <div
        className={
          label.posit === "left" ? "fieldConteinerRow" : "fieldConteinerCol"
        }
      >
        {undefined !== color ? (
          <label style={{ color: color.label }} ref={selabel}>
            {label.text}
          </label>
        ) : (
          <label ref={selabel}>{label.text}</label>
        )}
        <div
          ref={selTextBox}
          className={nivel === 0 ? "inputContainer" : "inputContainer1"}
        >
          <input
            style={{ backgroundColor: "white" }}
            ref={selfield}
            type="text"
            defaultValue={value}
            size={size}
            disabled={!editable}
            onBlur={() => closeList()}
            onChange={(e) => isEmpty(e)}
          />
          {despliega ? (
            <img
              className="iconoSelect"
              src={`iconos/Black/pliegue.png`}
              alt="plegar"
              onClick={!disabled ? () => setDespliega(false) : null}
            />
          ) : (
            <img
              className="iconoSelect"
              src={`iconos/Black/desplegable.png`}
              alt="desplegar"
              onClick={!disabled ? () => viewOptions() : null}
            />
          )}
          {!editable ? (
            <img
              className="iconoCustomerInput"
              src={`iconos/Black/cerrar.png`}
              alt="limpiar"
              onClick={!disabled ? () => cleanField() : null}
            />
          ) : null}
        </div>
      </div>
      <div
        className={nivel === 0 ? "inputListOptions" : "inputListOptions1"}
        ref={listop}
      >
        {lista.length > 0
          ? lista.map((opt, index) => (
              <div
                key={index}
                className={undefined !== color ? "textfilter" : "textSelect"}
                onClick={() => selectOpt(opt.key)}
              >
                <code>{undefined !== opt.text ? opt.text : opt.value}</code>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SelectComponent;
