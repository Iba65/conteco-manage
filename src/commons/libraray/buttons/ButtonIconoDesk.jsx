/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

const ButtonIconoDesk = ({ datico, onClick = null }) => {
  const { data, colors, icono } = datico;
  const button = useRef();
  const { label, width, height, border } = data;

  useEffect(() => {
    button.current.style.width = width;
    button.current.style.height = height;
    button.current.style.border = `${border.width} solid ${border.color}`;
    button.current.style.color = colors.ct;
    button.current.style.backgroundColor = colors.cb;
    /*
    button.current.addEventListener("mouseover", function () {
      this.style.backgroundColor = colors.ct;
      this.style.color = colors.cb;
    });
    button.current.addEventListener("mouseout", function () {
      this.style.color = colors.ct;
      this.style.backgroundColor = colors.cb;
    });*/
  }, [colors]);

  return (
    <div
      ref={button}
      className="ButtonIconoDesk m-1"
      onClick={
        undefined !== onClick
          ? () => {
              onClick(label.text.toLowerCase());
              button.current.blur();
            }
          : null
      }
    >
      <img
        className={icono.classi === null ? "icono-l" : icono.classi}
        src={icono.url}
        alt="menu"
      />
      <span>
        {label.textype === "lower" ? label.text.toLowerCase() : null}
        {label.textype === "uper" ? label.text.toUpperCase() : null}
        {label.textype === "capi"
          ? label.text.charAt(0).toUpperCase() + label.text.substring(1)
          : null}
      </span>
    </div>
  );
};

export default ButtonIconoDesk;
