import React from "react";
import "./../css/opcterritorios.css";
import {
  sumarMeses,
  diasTranscurridos,
  invertirFecha,
} from "../../commons/utils/functionsLibrary";
import ImagenConRespaldo from "../../adminManage/components/ImagenConRespaldo";

const TerryViewCard = ({ terId, historic }) => {
  const [fecsData, setFecsData] = React.useState({
    fecini: "",
    fecfin: "",
    fectrans: 0,
  });
  const [origen, setOrigen] = React.useState("");
  const period = React.useRef();

  React.useEffect(() => {
    let fecf = "";
    const [newterry] = historic.filter(
      (ter) => ter.idhit.slice(-4) === terId && ter.fecgive === ""
    );
    if (Object.keys(newterry).length > 0) {
      if (terId.charAt(0) === "C") {
        setOrigen("casa");
        fecf = sumarMeses(newterry.fecget, 3);
      }
      if (terId.charAt(0) === "N") {
        setOrigen("negocio");
        fecf = sumarMeses(newterry.fecget, 4);
      }
      if (terId.charAt(0) === "E") {
        setOrigen("campo");
        fecf = sumarMeses(newterry.fecget, 6);
      }
      const fecfin = `${fecf.getFullYear()}-${(fecf.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${fecf.getDate().toString().padStart(2, "0")}`;
      //const totdias = diasTranscurridos(newterry.fecget, fecfin);
      const progre = diasTranscurridos(newterry.fecget);
      setFecsData({
        fecini: invertirFecha(newterry.fecget),
        fecfin: invertirFecha(fecfin),
        fectrans: progre,
      });
      period.current.style.width = `${progre}%`;
      if (progre <= 75) {
        period.current.style.backgroundColor = "green";
      } else if (progre > 75 && progre <= 98) {
        period.current.style.backgroundColor = "orange";
      } else if (progre > 98) {
        period.current.style.backgroundColor = "red";
      }
    }
  }, [terId]);

  return (
    <div className="terryCard">
      <div className="terryTitle">
        <h3>Territorio de {origen}</h3>
      </div>
      <div className="terryMap">
        <ImagenConRespaldo
          src={`terrImg/${origen}/${terId}.jpg`} // URL de la imagen principal
          fallback={"terrImg/PlanoElche.jpg"} // URL de la imagen de respaldo
          alt={`imagen territorio ${terId}`}
          imgsize={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="terryData">
        <div className="terryDataFec">
          <div className="terryDataFecini"><strong>Inicio:</strong> {fecsData.fecini}</div>
          <div className="terryDataFecfin"><strong>Vencimiento:</strong> {fecsData.fecfin}</div>
        </div>
        <div className="periodoCardterContainer">
          <div ref={period} className="periodoLine"></div>
        </div>
      </div>
    </div>
  );
};

export default TerryViewCard;
