import React from "react";
import terrData from "./../../commons/data/TerritorioMvtoHistorial.json"
import { useTerryContext } from "./../../commons/context/territorios/TerryContext";

/*const TerritoriosData = [
  {
    idTD: "C001",
    grupoTD: "Casas",
    tipoTD: "Con Ascensor(1)/Algun ascensor(2)/Plantas Bajas(3)/Escaleras(4)",
    stateTD: "reposo(0)/activo(1)",
    idhnohasTd: "001",
    hnohasTD: "Pepe perez",
    fecstateTD: "2024-05-01",
    historiTD: [
      {
        idHTD: "",
        hnohasHTD: "Perico Delos Palotes",
        fecsalHTD: "2024-05-01",
        fecentHTD: "2024-05-01",
      },
    ],
    hisgenTD: {
      canEnt: 0,
      hnoUse: 0,
      minDides: 0,
      maxDides: 0,
      canEntSer: 0,
      hnoUseSer: 0,
      minDidesSer: 0,
      maxDidesSer: 0,
    },
  },
];*/

const setidTer = (idter, tipo) => {
  return tipo + idter.toString().padStart(3, "0");
};

const isinData = (data, findat) => {
  const histor = data.find((el) => el.codTerr === findat.substring(0, 4));
  const res = histor.historico.find((elem) => elem.idHTD === findat);
  if (undefined !== res) {
    return true;
  } else {
    return false;
  }
};
const transDataServ = (historic, data) => {
  let newTerris = historic;
  let idter = "";
  let newhis = [];
  data.map((elem) => {
    idter = setidTer(elem.territorio, "E");
    const nwhistoric = newTerris.map((tl) => {
      if (tl.codTerr === idter) {
        if (elem.Fecha_Salida !== "" && undefined !== elem.Fecha_Salida) {
          const idres1 = elem.Fecha_Salida.replaceAll("-", "");
          if (!isinData(historic, idter + idres1)) {
            newhis = tl.historico;
            newhis.push({
              idHTD: idter + idres1,
              hnohasHTD: elem.Asignado,
              fecsalHTD: elem.Fecha_Salida,
              fecentHTD: "",
            });
            return {
              codTerr: tl.codTerr,
              historico: newhis,
            };
          } else {
            return tl;
          }
        } else {
          return tl;
        }
      } else {
        return tl;
      }
    });
    newTerris = nwhistoric;
  });
};

const transData = (data) => {
  let terrdata = [];
  let newHistoric = [];
  let idter = "";
  data.map((elem) => {
    newHistoric = [];
    const keys = Object.keys(elem);
    const loops = keys.filter((ele) => ele.includes("Asignadoh"));
    idter = setidTer(elem.territorio, "E");
    const idres1 = idter + "20221232";
    //if (!isinData(data, idres1)) {
    newHistoric.push({
      idHTD: idres1,
      hnohasHTD: "CierreAño",
      fecsalHTD: "2022-12-32",
      fecentHTD: elem.fecha_completo,
    });
    //}
    for (let x = 1; x <= loops.length; x++) {
      const idres2 = elem[`historico_salida${x}`].replaceAll("-", "");
      //if (!isinData(data, idter + idres2)) {
      newHistoric.push({
        idHTD: idter + idres2,
        hnohasHTD: elem[`Asignadoh${x}`],
        fecsalHTD: elem[`historico_salida${x}`],
        fecentHTD:
          undefined !== elem[`historico_entrega${x}`]
            ? elem[`historico_entrega${x}`]
            : "",
      });
      //}
    }
    terrdata.push({
      codTerr: idter,
      historico: newHistoric,
    });
  });
  return terrdata;
};

function ConvertComponent() {
  const [historic, setHistoric] = React.useState < any > [];
  const { terryCampo } = useTerryContext();

  //console.log(terryCampo);

  const campoData = terrData.CAMPO;
  const casasData = terrData.CASAS;
  const negociosData = terrData.NEGOCIOS;
  //console.log(campoData)
  const campoHist = terrData.HISTORICO_CAMPO;
  const casasHist = terrData.HISTORICO_CASA;
  const negociosHist = terrData.HISTORICO_NEGOCIOS;

  const ejecuta = () => {
    if (campoHist.length > 0) {
      const res = transData(campoHist);
      setHistoric(res);
    }
    if (campoData.length > 0) {
      if (historic.length > 0) {
        transDataServ(historic, campoData);
      }
    }
  };
  //console.log(historic);
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        CONTECO MANAGE
        <button onClick={() => ejecuta()}>arreglo</button>
      </h1>
    </>
  );
}

export default ConvertComponent;
