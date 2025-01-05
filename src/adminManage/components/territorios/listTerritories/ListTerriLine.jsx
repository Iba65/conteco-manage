import React from "react";
import { lineListTerr } from "../AuxiTerr";
import {
  invertirFecha,
  getZona,
  getProgress,
} from "./../../../../commons/utils/functionsLibrary";
import ButtonOnlico from "./../../../../commons/libraray/buttons/ButtonOnlico";
import { getUserById } from "../../../../commons/utils/funcionsApp";

const ListTerriLine = ({
  data,
  index,
  lon,
  archiveTerritory,
  handleAction,
  session,
  hnosData,
}) => {
  const [convertData, setConvertData] = React.useState({
    zona: "",
    estado: "",
    fecsal: "",
    fecent: "",
    colCtrl: "",
  });
  const [bgcolor, setBgcolor] = React.useState("white");
  const [progre, setProgre] = React.useState(0);
  const period = React.useRef();

  React.useEffect(() => {
    setBgcolor(data.stateTD ? lineListTerr[0].bc : lineListTerr[0].bca);
    setConvertData({
      zona: getZona(data.grupoTD),
      estado: data.stateTD ? "Activo" : "Descanso",
      fecsal:
        data.stateTD || data.hnohasTD === "creacion"
          ? invertirFecha(data.fecstateTD)
          : "-",
      fecent: !data.stateTD ? invertirFecha(data.fecstateTD) : "-",
      colCtrl: "",
    });
    const progre = parseInt(
      getProgress(
        data.fecstateTD,
        data.idTD.charAt(0) === "C" || data.idTD.charAt(0) === "N" ? 120 : 365
      )
    );
    if (data.stateTD) {
      period.current.style.width = `${progre}%`;
    } else {
      period.current.style.width = `0%`;
    }
    if (progre <= 75) {
      period.current.style.backgroundColor = "green";
    } else if (progre > 75 && progre <= 98) {
      period.current.style.backgroundColor = "orange";
    } else if (progre > 98) {
      period.current.style.backgroundColor = "red";
    }
  }, [data]);

  const getUserName = (id) => {
    let nameuser = id;
    const datuser = getUserById(hnosData, id);
    if (undefined !== datuser) {
      if (session.lebel === 1) {
        nameuser = `${datuser.nombre} ${datuser.apellidos}`;
      } else {
        nameuser = `${datuser.nombre} ${datuser.apellidos.charAt(0)}`;
      }
    }
    return nameuser;
  };

  return (
    <div
      className={
        data.hnohasTD === "creacion" ? "lineContainerIni" : "lineContainer"
      }
    >
      <div
        style={{
          userSelect: "none",
          width: lineListTerr[0].with,
          height: lineListTerr[0].hight,
          backgroundColor:
            data.hnohasTD === "creacion" ? "rgb(252, 206, 149)" : bgcolor,
          textAlign: lineListTerr[0].align,
          fontSize: lineListTerr[0].title.fsize,
          fontWeight: lineListTerr[0].title?.fw,
          borderLeft: lineListTerr[0]?.bol,
          borderRight: lineListTerr[0]?.bor,
          borderRadius: index === lon - 1 ? "0px 0px 0px 9px" : "0px",
          fontWeight: 700,
        }}
      >
        {convertData.zona}
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListTerr[1].with,
          height: lineListTerr[1].hight,
          backgroundColor:
            data.hnohasTD === "creacion" ? "rgb(252, 206, 149)" : bgcolor,
          textAlign: lineListTerr[1].align,
          fontSize: lineListTerr[1].title.fsize,
          fontWeight: lineListTerr[1].title?.fw,
          borderRight: lineListTerr[1]?.bor,
        }}
      >
        {data.idTD}
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListTerr[2].with,
          height: lineListTerr[2].hight,
          backgroundColor:
            data.hnohasTD === "creacion" ? "rgb(252, 206, 149)" : bgcolor,
          textAlign: lineListTerr[2].align,
          fontSize: lineListTerr[2].title.fsize,
          fontWeight: lineListTerr[2].title?.fw,
          borderRight: lineListTerr[2]?.bor,
        }}
      >
        {data.hnohasTD === "creacion" ? data.hnohasTD : convertData.estado}
      </div>
      <div
        style={{
          userSelect: "none",
          boxSizing: "border-box",
          width: lineListTerr[3].with,
          height: lineListTerr[3].hight,
          backgroundColor:
            data.hnohasTD === "creacion" ? "rgb(252, 206, 149)" : bgcolor,
          textAlign: lineListTerr[3].align,
          fontSize: lineListTerr[3].title.fsize,
          fontWeight: lineListTerr[3].title?.fw,
          borderRight: lineListTerr[3]?.bor,
          paddingLeft: "10px",
        }}
      >
        {data.hnohasTD !== ""
          ? data.hnohasTD === "creacion"
            ? "No asignado"
            : getUserName(data.hnohasTD)
          : "Archivo"}
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListTerr[4].with,
          height: lineListTerr[4].hight,
          backgroundColor:
            data.hnohasTD === "creacion" ? "rgb(252, 206, 149)" : bgcolor,
          textAlign: lineListTerr[4].align,
          fontSize: lineListTerr[4].title.fsize,
          fontWeight: lineListTerr[4].title?.fw,
          borderRight: lineListTerr[4]?.bor,
        }}
      >
        {convertData.fecsal}
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListTerr[5].with,
          height: lineListTerr[5].hight,
          backgroundColor:
            data.hnohasTD === "creacion" ? "rgb(252, 206, 149)" : bgcolor,
          textAlign: lineListTerr[5].align,
          fontSize: lineListTerr[5].title.fsize,
          fontWeight: lineListTerr[5].title?.fw,
          borderRight: lineListTerr[5]?.bor,
        }}
      >
        {convertData.fecent}
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListTerr[6].with,
          backgroundColor:
            data.hnohasTD === "creacion" ? "rgb(252, 206, 149)" : bgcolor,
          textAlign: lineListTerr[6].align,
          fontSize: lineListTerr[6].title.fsize,
          fontWeight: lineListTerr[6].title?.fw,
        }}
      >
        <div className="periodoContainer">
          <div ref={period} className="periodoLine"></div>
        </div>
      </div>
      <div
        style={{
          userSelect: "none",
          width: lineListTerr[7].with,
          height: lineListTerr[7].hight,
          backgroundColor:
            data.hnohasTD === "creacion" ? "rgb(252, 206, 149)" : bgcolor,
          textAlign: lineListTerr[7].align,
          fontSize: lineListTerr[7].title.fsize,
          fontWeight: lineListTerr[7].title?.fw,
          borderLeft: lineListTerr[7]?.bol,
          borderRight: lineListTerr[7]?.bor,
          borderRadius: index === lon - 1 ? "0px 0px 9px 0px" : "0px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {session.lebel === 1 ? (
          <>
            <ButtonOnlico
              key="logonbtn"
              icono={{
                url: !data.stateTD
                  ? "iconos/asignar.png"
                  : "iconos/archivar.png",
                clan: !data.stateTD ? "icono-ms" : "icono-xs",
              }}
              data={{
                width: "15px",
                height: "15px",
              }}
              border={false}
              colors={{}}
              mar={{
                h: 2,
                w: 10,
              }}
              pad={{
                h: 1,
                w: 2,
              }}
              action={!data.stateTD ? "asignar" : "archivar"}
              onClick={() =>
                archiveTerritory(!data.stateTD ? "asignar" : "archivar", data)
              }
            />
            <ButtonOnlico
              key="logonbtn2"
              icono={{
                url: "iconos/Acctions/lapiz.png",
                clan: "icono-ms",
              }}
              data={{
                width: "10px",
                height: "10px",
              }}
              border={false}
              colors={{}}
              mar={{
                h: 2,
                w: 10,
              }}
              pad={{
                h: 1,
                w: 2,
              }}
              action={"editar"}
              onClick={() => handleAction(data.idTD, 2)}
            />
          </>
        ) : (
          <div className="pl-1">Sin Permiso</div>
        )}
      </div>
    </div>
  );
};

export default ListTerriLine;
