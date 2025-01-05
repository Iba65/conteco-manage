import React from "react";
import { invertirFecha } from "./../../../../commons/utils/functionsLibrary";

const HistoricTerryView = ({ data, long, indice, updateHistoricData }) => {
  return (
    <>
      <div className="lineDatId">{data.idHTD}</div>
      <div
        className={
          long === indice + 1
            ? data.fecsalHTD !== "" && data.fecentHTD === ""
              ? "lineDatState txt-green-100"
              : "lineDatState"
            : "lineDatState"
        }
      >
        {long === indice + 1
          ? data.fecsalHTD !== "" && data.fecentHTD === ""
            ? "Activo"
            : "Descanso"
          : "historico"}
      </div>
      <div className="lineDatHno pl-2">{data.hnohasHTD}</div>
      <div className="lineDatExit">
        {data.fecsalHTD !== "" ? invertirFecha(data.fecsalHTD) : ""}
      </div>
      <div className="lineDatIndor">
        {data.fecentHTD !== "" ? invertirFecha(data.fecentHTD) : ""}
      </div>
      <div className="lineDatAction">
        <img
          className="icono-xs"
          src="iconos/Acctions/lapiz.png"
          alt="editar"
          onClick={() => updateHistoricData(indice)}
        />
        <img
          className="icono-xs"
          src="iconos/Acctions/basura.png"
          alt="eliminar"
        />
      </div>
    </>
  );
};

export default HistoricTerryView;
