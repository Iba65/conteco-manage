/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

const ButtonCus = ({
  data,
  colors,
  onClick,
  icono = null,
  onlyIco = false,
}) => {
  const button = useRef();
  const { label, width, height, border, pad, font } = data;
  useEffect(() => {
    button.current.style.width = width;
    button.current.style.height = height;
    button.current.style.border = `${border.width} solid ${border.color}`;
    button.current.style.color = colors.ct;
    button.current.style.backgroundColor = colors.cb;
    button.current.addEventListener("mouseover", function () {
      this.style.backgroundColor = colors.ct;
      this.style.color = colors.cb;
    });
    button.current.addEventListener("mouseout", function () {
      this.style.color = colors.ct;
      this.style.backgroundColor = colors.cb;
    });
    if (undefined !== pad) {
      button.current.style.padding = `${pad.h}px ${pad.w}px`;
    }
    button.current.style.fontSize = font?.size;
  }, [colors]);

  return (
    <div
      ref={button}
      className="buttonCustom"
      onClick={
        undefined !== onClick ? () => onClick(label.text.toLowerCase()) : null
      }
    >
      {icono !== null ? (
        icono.position === "left" ? (
          <img
            className={icono.classi === null ? "icono-xs mr-2" : icono.classi}
            src={icono.url}
            alt="menu"
          />
        ) : null
      ) : null}
      {!onlyIco ? (
        <>
          {label.textype === "lower" ? label.text.toLowerCase() : null}
          {label.textype === "uper" ? label.text.toUpperCase() : null}
          {label.textype === "capi"
            ? label.text.charAt(0).toUpperCase() + label.text.substring(1)
            : null}
        </>
      ) : null}

      {icono !== null ? (
        icono.position === "right" ? (
          <img
            className={icono.classi === null ? "icono-xs ml-2" : icono.classi}
            src={icono.url}
            alt="menu"
          />
        ) : null
      ) : null}
    </div>
  );
};

export default ButtonCus;
