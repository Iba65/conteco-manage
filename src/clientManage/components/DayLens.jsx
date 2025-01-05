import React from "react";

const DayLens = ({ data, day, setLensModal }) => {
  console.log(data);
  return (
    <div className="lensContiner">
      <div className="lensDetail">
        <div className="lensDetailHeader">
          Detalle del dia {day}
          <div>
            <img
              className="icono-simple-s"
              src="iconos/Black/cerrarBoton.png"
              alt="menu"
              onClick={() => setLensModal(0)}
            />
          </div>
        </div>
        <div className="lensDetailBody">
          {data.length > 0 ? (
            data.map((us) => (
              <div className="nomuser">
                · {us.value}
                {us.color === "m"
                  ? " (Mañana)"
                  : us.color === "t"
                  ? " (Tarde)"
                  : ""}
              </div>
            ))
          ) : (
            <p>No hay Exhibidor</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayLens;
