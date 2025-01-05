import React from "react";
import { lineListUsers } from "./AuxiUsers";
import { getUserType } from "./../../../../commons/utils/funcionsApp";
import ButtonOnlico from "./../../../../commons/libraray/buttons/ButtonOnlico";
/*import {
  invertirFecha,
  getZona,
  getProgress,
  getDateToday,
} from "../../../commons/utils/functionsLibrary";*/

const ListUsersLine = ({
  data,
  permitted = false,
  session,
  handleAction,
  viewExhibDate,
}) => {
  const [bgcolor, setBgcolor] = React.useState("white");
  const [nomcrip, setNomcrip] = React.useState("*****");
  const [emailcrip, setMailcrip] = React.useState("· · · · ·");
  const [whatcrip, setWhatcrip] = React.useState("· · · · ·");
  const [usercrip, setUsercrip] = React.useState(". . .");

  React.useEffect(() => {
    if (permitted) {
      setUsercrip(data.usuario);
      setNomcrip(`${data.nombre} ${data.apellidos}`);
      setMailcrip(data.email);
      setWhatcrip(data.whatsapp);
    } else {
      setNomcrip(`${data.nombre}`);
      setUsercrip(data.usuario);
    }
  }, [data.nombre]);

  return (
    <div className="lineContainer">
      <div
        style={{
          userSelect: "none",
          width: permitted ? lineListUsers[0].with : 73,
          height: lineListUsers[0].hight,
          backgroundColor: bgcolor,
          textAlign: lineListUsers[0].align,
          fontSize: lineListUsers[0].title.fsize,
          fontWeight: lineListUsers[0].title?.fw,
          borderLeft: lineListUsers[0]?.bol,
          borderRight: lineListUsers[0]?.bor,
          borderRadius: "0px",
          fontWeight: 700,
        }}
      >
        {data.id}
      </div>
      <div
        style={{
          userSelect: "none",
          width: permitted ? lineListUsers[1].with : 103,
          height: lineListUsers[1].hight,
          backgroundColor: bgcolor,
          textAlign: lineListUsers[1].align,
          fontSize: lineListUsers[1].title.fsize,
          fontWeight: lineListUsers[1].title?.fw,
          borderRight: lineListUsers[1]?.bor,
        }}
      >
        {usercrip}
      </div>
      <div
        style={{
          userSelect: "none",
          width: permitted ? lineListUsers[2].with : 218,
          height: lineListUsers[2].hight,
          backgroundColor: bgcolor,
          textAlign: lineListUsers[2].align,
          fontSize: lineListUsers[2].title.fsize,
          fontWeight: lineListUsers[2].title?.fw,
          borderRight: lineListUsers[2]?.bor,
        }}
      >
        {nomcrip}
      </div>
      {permitted ? (
        <>
          <div
            style={{
              userSelect: "none",
              boxSizing: "border-box",
              width: lineListUsers[3].with,
              height: lineListUsers[3].hight,
              backgroundColor: bgcolor,
              textAlign: lineListUsers[3].align,
              fontSize: lineListUsers[3].title.fsize,
              fontWeight: lineListUsers[3].title?.fw,
              borderRight: lineListUsers[3]?.bor,
              paddingLeft: "10px",
            }}
          >
            {emailcrip}
          </div>
          <div
            style={{
              userSelect: "none",
              width: lineListUsers[4].with,
              height: lineListUsers[4].hight,
              backgroundColor: bgcolor,
              textAlign: lineListUsers[4].align,
              fontSize: lineListUsers[4].title.fsize,
              fontWeight: lineListUsers[4].title?.fw,
              borderRight: lineListUsers[4]?.bor,
            }}
          >
            {whatcrip}
          </div>
        </>
      ) : null}
      <div
        style={{
          userSelect: "none",
          width: permitted ? lineListUsers[5].with : 106,
          height: lineListUsers[5].hight,
          backgroundColor: bgcolor,
          textAlign: lineListUsers[5].align,
          fontSize: lineListUsers[5].title.fsize,
          fontWeight: lineListUsers[5].title?.fw,
          borderRight: lineListUsers[5]?.bor,
        }}
      >
        {getUserType(data.tipo)}
      </div>
      <div
        style={{
          userSelect: "none",
          width: permitted ? lineListUsers[6].with : 133,
          height: lineListUsers[6].hight,
          backgroundColor: bgcolor,
          textAlign: lineListUsers[6].align,
          fontSize: lineListUsers[6].title.fsize,
          fontWeight: lineListUsers[6].title?.fw,
        }}
      >
        {data.territorios.join(", ")}
      </div>
      <div
        style={{
          userSelect: "none",
          width: permitted ? lineListUsers[7].with : 31,
          height: lineListUsers[7].hight,
          backgroundColor: bgcolor,
          textAlign: lineListUsers[7].align,
          fontSize: lineListUsers[7].title.fsize,
          fontWeight: lineListUsers[7].title?.fw,
          borderLeft: lineListUsers[7]?.bol,
          borderRight: lineListUsers[7]?.bor,
          borderRadius: "0px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {permitted ? (
          <>
            <ButtonOnlico
              key="logonbtn"
              icono={{
                url: "iconos/Acctions/basura.png",
                clan: "icono-xs",
              }}
              data={{
                width: "5px",
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
              action={"vista"}
              onClick={() => handleAction(data.id, 9)}
            />
            <ButtonOnlico
              key="logonbtn2"
              icono={{
                url: "iconos/Acctions/lapiz.png",
                clan: "icono-x",
              }}
              data={{
                width: "5px",
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
              onClick={() => handleAction(data.id, 2)}
            />
          </>
        ) : null}
        {data.exhibidor.state ? (
          <ButtonOnlico
            key="logonbtn3"
            icono={{
              url: "iconos/exhibidor.png",
              clan: "icono-x",
            }}
            data={{
              width: "0px",
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
            onClick={() => handleAction(data.id, 8)}
          />
        ) : (
          <div style={{ minWidth: "20px" }}>-</div>
        )}
      </div>
    </div>
  );
};

export default ListUsersLine;
