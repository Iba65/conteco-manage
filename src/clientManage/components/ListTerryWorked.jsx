import React from "react";
import "./../css/listerrywork.css";
import {
  diasTranscurridos,
  invertirFecha,
} from "../../commons/utils/functionsLibrary";

const ListTerryWorked = ({ listData }) => {
  return (
    <div className="listTerworkContainer">
      <div className="listTerworkHeader">
        <div style={{ width: "60px", textAlign: "center",
              borderRight: "solid 1px white", }}>TERRIT</div>
        <div style={{ width: "90px", textAlign: "center",
              borderRight: "solid 1px white", }}>RECOGIO</div>
        <div style={{ width: "90px", textAlign: "center",
              borderRight: "solid 1px white", }}>ENTREGO</div>
        <div style={{ width: "80px", textAlign: "center" }}>TRABAJO</div>
      </div>
      {listData.map((dat) => (
        <div key={dat.idhit} className="listTerworkLine">
          <div
            style={{
              width: "61px",
              textAlign: "center",
              borderRight: "solid 1px grey",
            }}
          >
            {dat.idhit.slice(-4)}
          </div>
          <div style={{ width: "90px", textAlign: "center",
              borderRight: "solid 1px grey", }}>
            {invertirFecha(dat.fecget)}
          </div>
          <div style={{ width: "90px", textAlign: "center",
              borderRight: "solid 1px grey", }}>
            {invertirFecha(dat.fecgive)}
          </div>
          <div style={{ width: "69px", textAlign: "right" }}>
            {diasTranscurridos(dat.fecget, dat.fecgive)} días.
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTerryWorked;
