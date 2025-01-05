/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ButtonCus from "./ButtonCus";

const ButtonGroup = ({ direction, border, list }) => {
  const [classbotgru, setClassbotgru] = useState("");
  const colors = {
    ct: "navy",
    cb: "rgb(253, 178, 37)",
  };
  useEffect(() => {}, [list]);
  useEffect(() => {
    if (direction === "row") {
      setClassbotgru(`buttonGroupContRow bord${border.pos}`);
    } else {
      setClassbotgru(`buttonGroupContCol bord${border.pos}`);
    }
  }, [direction]);
  useEffect(() => {
    let hojaEstilo;
    let nomclass = border.pos.charAt(0).toUpperCase() + border.pos.substring(1);
    for (let x = 0; x < document.styleSheets.length; x++) {
      hojaEstilo = document.styleSheets[x];
      for (let i = 0; i < hojaEstilo.cssRules.length; i++) {
        if (hojaEstilo.cssRules[i].selectorText === `.bord${border.pos}`) {
          hojaEstilo.cssRules[i].style[`border${nomclass}Color`] = border.color;
          hojaEstilo.cssRules[i].style[`border${nomclass}Style`] = border.style;
          hojaEstilo.cssRules[i].style[`border${nomclass}Width`] = border.width;
        }
      }
    }
  }, [border]);
  return (
    <div className={classbotgru}>
      {list.map((dab, index) => (
        <ButtonCus
          key={index}
          icono={undefined !== dab.icono ? dab.icono : null}
          data={dab}
          colors={colors}
          onClick={dab.onClick}
        />
      ))}
    </div>
  );
};

export default ButtonGroup;
