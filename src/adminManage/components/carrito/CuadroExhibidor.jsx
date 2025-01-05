import React from "react";
import { obtenerNombreMes } from "../../../commons/utils/functionsLibrary";

const CuadroExhibidor = ({ year, month, celdas}) => {
  return (
    <div
      style={{
        margin: "3px",
        padding: "10px",
        border: "solid 2px navy",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <h3
          style={{ margin: "10px 0px 0px 10px", fontSize: "28px" }}
        >{`Cuadrante para ${obtenerNombreMes(month)} ${year}`}</h3>
      </div>
      <div style={estiloCalendario}>
        {[
          { namDay: "Lunes", period: "Mañana" },
          { namDay: "Lunes", period: "Tarde" },
          { namDay: "Martes", period: "Mañana" },
          { namDay: "Jueves", period: "Mañana" },
          { namDay: "Viernes", period: "Tarde" },
          { namDay: "Sabado", period: "Mañana" },
        ].map((dia, index) => (
          <div key={index} className={`celhead ${dia.namDay}`}>
            <div>{dia.namDay}</div>
            <div>{dia.period}</div>
          </div>
        ))}
        {celdas}
      </div>
    </div>
  );
};

// Estilos
const estiloCalendario = {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)", // 6 columnas para los días especificados
  gap: "5px",
  minWidth: "16%",
};

export default CuadroExhibidor;
