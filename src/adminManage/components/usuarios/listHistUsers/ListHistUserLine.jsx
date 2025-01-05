import React from "react";
import { useTerryContext } from "./../../../../commons/context/territorios/TerryContext";
import { lineListHistUser } from "./AuxiHistUser";
import {
  invertirFecha,
  getDateToday,
  diasTranscurridos,
  getZona,
} from "./../../../../commons/utils/functionsLibrary";

const ListHistUserLine = ({ data }) => {
  const { getTerryById } = useTerryContext();
  const [bgcolor, setBgcolor] = React.useState("white");
  const [tersel, setTersel] = React.useState({});
  const [descsel, setDescsel] = React.useState("");
  //const [descTerry, setDescTerry] = React.useState("");

  React.useEffect(() => {
    const desc = getTerryById(data.idhit.slice(-4));
    const idter =
      tersel?.descTD !== "" ? desc.descTD : getZona(desc.idTD.charAt(0));
    if (undefined !== idter) {
      if (idter.length <= 12) {
        setDescsel(`${data.idhit.slice(-4)} ${idter}`);
      } else {
        setDescsel(`${data.idhit.slice(-4)} ${idter.slice(0, 12)}`);
      }
    }
    setTersel(desc);
  }, [data]);

  return (
    <div className="lineContainer">
      <div
        style={{
          userSelect: "none",
          width: lineListHistUser[0].with,
          height: lineListHistUser[0].hight,
          backgroundColor: bgcolor,
          textAlign: lineListHistUser[0].align,
          fontSize: lineListHistUser[0].title.fsize,
          fontWeight: lineListHistUser[0].title?.fw,
          borderLeft: lineListHistUser[0]?.bol,
          borderRight: lineListHistUser[0]?.bor,
          borderRadius: "0px",
          fontWeight: 700,
        }}
      >
        {descsel}
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListHistUser[1].with,
          height: lineListHistUser[1].hight,
          backgroundColor: bgcolor,
          textAlign: lineListHistUser[1].align,
          fontSize: lineListHistUser[1].title.fsize,
          fontWeight: lineListHistUser[1].title?.fw,
          borderRight: lineListHistUser[1]?.bor,
        }}
      >
        {data.fecget !== "" ? invertirFecha(data.fecget) : ""}
      </div>
      <div
        style={{
          userSelect: "none",
          boxSizing: "border-box",
          width: lineListHistUser[2].with,
          height: lineListHistUser[2].hight,
          backgroundColor: bgcolor,
          textAlign: lineListHistUser[2].align,
          fontSize: lineListHistUser[2].title.fsize,
          fontWeight: lineListHistUser[2].title?.fw,
          borderRight: lineListHistUser[2]?.bor,
          paddingLeft: "10px",
        }}
      >
        {data.fecgive !== "" ? invertirFecha(data.fecgive) : ""}
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListHistUser[3].with,
          height: lineListHistUser[3].hight,
          backgroundColor: bgcolor,
          textAlign: lineListHistUser[3].align,
          fontSize: lineListHistUser[3].title.fsize,
          fontWeight: lineListHistUser[3].title?.fw,
          borderRight: lineListHistUser[3]?.bor,
        }}
      >
        {`${diasTranscurridos(
          data.fecget,
          data.fecgive !== "" ? data.fecgive : getDateToday()
        )} dias`}
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListHistUser[4].with,
          height: lineListHistUser[4].hight,
          backgroundColor: bgcolor,
          textAlign: lineListHistUser[4].align,
          fontSize: lineListHistUser[4].title.fsize,
          fontWeight: lineListHistUser[4].title?.fw,
          borderRight: lineListHistUser[4]?.bor,
          color: data.fecgive === "" ? "green" : "chocolate",
        }}
      >
        {data.fecgive === "" ? "Activo" : "Entregado"}
      </div>
    </div>
  );
};

export default ListHistUserLine;
