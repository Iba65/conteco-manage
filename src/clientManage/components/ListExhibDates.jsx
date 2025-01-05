import React from "react";
import "./../css/listerrywork.css";
import {
  obtenerDiaSemana,
  obtenerNombreMes,
} from "../../commons/utils/functionsLibrary";

const ListExhibDates = ({ listData, feca }) => {
  const [listres, setListRes] = React.useState([]);
  console.log(feca);
  React.useEffect(() => {
    setListRes(
      listData.filter((elem) => elem.idHE.slice(4, 6) === feca.slice(5, 7))
    );
  }, [listData]);

  return (
    <div className="listTerworkContainer">
      {listres.length > 0 ? (
        <>
          <div className="listTerworkHeader">
            <div
              style={{
                width: "179px",
                textAlign: "center",
                borderRight: "solid 1px white",
              }}
            >
              FECHA
            </div>
            <div style={{ width: "150px", textAlign: "center" }}>TURNO</div>
          </div>
          {listres.map((dat) => (
            <div key={dat.idHE} className="listTerworkLine">
              <div
                style={{
                  width: "180px",
                  textAlign: "center",
                  borderRight: "solid 1px grey",
                }}
              >
                {`${obtenerDiaSemana(dat.idHE)} ${dat.idHE.slice(
                  6,
                  8
                )} de ${obtenerNombreMes(dat.idHE.slice(4, 6))}`}
              </div>
              <div style={{ width: "150px", textAlign: "right" }}>
                seccion de la {dat.secdayHE}
              </div>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ListExhibDates;
