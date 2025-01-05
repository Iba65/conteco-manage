/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

const ButtonOnlico = ({
  data,
  colors,
  onClick,
  onMouseOver,
  border,
  icono,
  action,
  mar,
  pad,
}) => {
  const button = useRef();
  const { width, height } = data;
  useEffect(() => {
    button.current.style.width = width;
    button.current.style.height = height;
    button.current.style.margin = `${mar.h}px ${mar.w}px`;
    button.current.style.padding = `${pad.h}px ${pad.w}px`;
    if (border) {
      button.current.style.border = `${border.width} solid ${border.color}`;
      button.current.style.backgroundColor = colors.cb;
    }
    /*button.current.addEventListener("mouseover", function () {
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
      className="ButtonOnlico"
      onClick={undefined !== onClick ? () => onClick(action) : null}
      onMouseOver={undefined !== onMouseOver ? () => onMouseOver(action) : null}
    >
      <img className={icono.clan} src={icono.url} alt="menu" />
    </div>
  );
};

export default ButtonOnlico;
