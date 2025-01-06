import React, { useEffect } from "react";
import "./../DragAndDrop/drag_and_drop.css";
import { useGeneralContext } from "./../../../commons/context/GeneralContext";
import { useTerryContext } from "./../../../commons/context/territorios/TerryContext";
import {
  buildListData,
  buildListMindata,
  getListSortHnosExh,
} from "./../../../commons/utils/funcionsApp";
import ExhibidorManage from "./ExhibidorManage";
import HnosExhibidorList from "./HnosExhibidorList";
//import CamvasToPdf from "../camvasaPdf/CamvasToPdf";

const transNameToId = (data, listHnosCar) => {
  const newdata = data.map((elem) => {
    const hnfind = listHnosCar.find(
      (hn) => `${hn.nombre} ${hn.apellidos}` === elem
    );
    if (undefined !== hnfind) {
      return hnfind.id;
    } else {
      return elem;
    }
  });
  return newdata;
};
const transCuaData = (datasi, listHnosCar) => {
  const newdata = datasi.map((elem) => {
    const newasi = transNameToId(elem.asings, listHnosCar);
    return {
      dia: elem.dia,
      asings: newasi,
    };
  });
  return newdata;
};

const ExhibidoComponent = ({ session, setMenu }) => {
  const {
    hnosData,
    cuadranteExh,
    updateCuadran,
    loadMouthCuad,
    updateHisUserExib,
  } = useTerryContext();
  const { isSemOk, getSemola } = useGeneralContext();
  const [fechoy, setFechoy] = React.useState("");
  const [year, setYear] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [listHnosCar, setListHnosCar] = React.useState([]);
  const [cuadraData, setCuadraData] = React.useState(cuadranteExh);
  const [cuaMesData, setCuaMesData] = React.useState([]);

  React.useEffect(() => {
    let newcuaData = {};
    const fecact = new Date();
    setFechoy(fecact);
    setYear(fecact.getFullYear());
    setMonth(fecact.getMonth() + 1);
    if (
      !cuadraData.some((objeto) =>
        objeto.hasOwnProperty(
          `${fecact.getFullYear()}${String(fecact.getMonth() + 1).padStart(
            2,
            "0"
          )}`
        )
      )
    ) {
      newcuaData[
        `${fecact.getFullYear()}${String(fecact.getMonth() + 1).padStart(
          2,
          "0"
        )}`
      ] = [
        {
          dia: "0u",
          asings: [],
        },
      ];
      setCuadraData([...cuadraData, newcuaData]);
      setCuaMesData([
        {
          dia: "0u",
          asings: [],
        },
      ]);
    } else {
      setCuaMesData(loadMouthCuad(fecact.getFullYear(), fecact.getMonth() + 1));
    }
  }, []);

  React.useEffect(() => {
    if (cuadraData !== cuadranteExh) {
      //console.log("cuadraData -->", cuadraData);
      updateCuadran(cuadraData);
    }
  }, [cuadraData]);
  React.useEffect(() => {
    //console.log(cuaMesData);
  }, [cuaMesData]);

  React.useEffect(() => {
    if (session.permitted) {
      const result = getListSortHnosExh(hnosData, session, {
        getSemola,
        isSemOk,
      });
      setListHnosCar(result);
    }
  }, [hnosData]);

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData("itemID", item.id);
    //console.log("startDrag list", item);
  };
  const startDragCell = (evt, name, dia, per) => {
    evt.dataTransfer.setData("cellID", `${name}-${dia}${per}`);
    //console.log("startDrag cell", name);
  };

  const draggingOver = (evt) => {
    evt.preventDefault();
  };

  const OnDrop = (evt, origen, list, dia, per) => {
    //console.log(evt, origen, list, dia, per);
    if (origen === "list") {
      // mueve el nombre de la celda al listdo, eliminandolo de la celda
      let data = evt.dataTransfer.getData("cellID");
      const sep = data.split("-");
      const diasel = cuaMesData.find((elem) => elem.dia === sep[1]);
      const filtered = diasel.asings.filter((nam) => nam !== sep[0]);
      const newcmd = cuaMesData.map((elem) => {
        if (elem.dia === sep[1]) {
          return {
            dia: sep[1],
            asings: filtered,
          };
        } else {
          return elem;
        }
      });
      setCuaMesData(newcmd);
    } else {
      let data = evt.dataTransfer.getData("cellID");
      if (data !== "") {
        // cambia nombre de una celda a otra si es posible
        const sep = data.split("-");
        changeNametoCell(sep[1], `${dia}${per}`, sep[0]);
      } else {
        // mueve el nombre del listado a la celda añadiendolo a la celda
        let id = evt.dataTransfer.getData("itemID");
        const [hnosel] = listHnosCar.filter((elem) => elem.id === id);
        const diasel = cuaMesData.find((elem) => elem.dia === `${dia}${per}`);
        if (undefined !== diasel) {
          if (diasel.asings.length < 4) {
            const ishno = diasel.asings.find(
              (hno) => hno === `${hnosel.nombre} ${hnosel.apellidos}`
            );
            if (undefined === ishno) {
              diasel.asings.push(`${hnosel.nombre} ${hnosel.apellidos}`);
              const newcmd = cuaMesData.map((elem) => {
                if (elem.dia === `${dia}${per}`) {
                  return diasel;
                } else {
                  return elem;
                }
              });
              setCuaMesData(newcmd);
            }
          }
        } else {
          setCuaMesData([
            ...cuaMesData,
            {
              dia: `${dia}${per}`,
              asings: [`${hnosel.nombre} ${hnosel.apellidos}`],
            },
          ]);
        }
      }
    }
  };
  const changeNametoCell = (diaOrigen, diaDestino, nombre) => {
    let cmdTemp = [];
    const selOrigen = cuaMesData.find((elem) => elem.dia === diaOrigen);
    const selDestino = cuaMesData.find((elem) => elem.dia === diaDestino); // puede ser undefined si no tiene nombre.
    const filtered = selOrigen.asings.filter((nam) => nam !== nombre);
    const newcmd = cuaMesData.map((elem) => {
      if (elem.dia === diaOrigen) {
        return {
          dia: diaOrigen,
          asings: filtered,
        };
      } else {
        return elem;
      }
    });
    cmdTemp = newcmd;
    if (undefined !== selDestino) {
      if (selDestino.asings.length < 4) {
        const ishno = selDestino.asings.find((hno) => hno === nombre);
        if (undefined === ishno) {
          selDestino.asings.push(nombre);
          const newcmd = cmdTemp.map((elem) => {
            if (elem.dia === diaDestino) {
              return selDestino;
            } else {
              return elem;
            }
          });
        }
      }
    } else {
      cmdTemp = [...cmdTemp, { dia: diaDestino, asings: [nombre] }];
    }
    setCuaMesData(cmdTemp);
  };

  const updateCuad = () => {
    // grabación del cuadrante del mes.
    if (cuaMesData.length > 0) {
      const cuaMesDataIds = transCuaData(cuaMesData, listHnosCar);
      const [selobj] = cuadraData.filter((objeto) =>
        objeto.hasOwnProperty(`${year}${month.toString().padStart(2, "0")}`)
      );
      if (undefined !== selobj) {
        const newdata = cuadraData.map((elem) => {
          if (elem.hasOwnProperty(`${year}${month.toString().padStart(2, "0")}`)) {
            return {
              [`${year}${month.toString().padStart(2, "0")}`]: cuaMesDataIds,
            };
          } else {
            return elem;
          }
        });
        //console.log("newdata -->", newdata);
        updateCuadran(newdata);
        updateHisUserExib(year, month, cuaMesDataIds);
      }
    }
  };

  const loadMonthData = (y, m) => {
    setYear(y);
    setMonth(m);
    setCuaMesData(loadMouthCuad(y, m));
  };

  return (
    <div className="CarritoListContiner">
      <div className="bodyexhib">
        {session.lebel === 1 ? (
          <div
            className="listaexhib"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => OnDrop(evt, "list", 1)}
          >
            <HnosExhibidorList hnoList={listHnosCar} startDrag={startDrag} />
          </div>
        ) : (
          <div className="listaexhib"></div>
        )}
        <div className="cuadrantexhib">
          {year !== "" && month !== "" ? (
            <ExhibidorManage
              year={year}
              month={month}
              draggingOver={draggingOver}
              OnDrop={OnDrop}
              cuaMesData={cuaMesData}
              startDragCell={startDragCell}
              setMenu={setMenu}
              updateCuad={updateCuad}
              loadMonthData={loadMonthData}
              listHnosCar={listHnosCar}
              session={session}
            />
          ) : /*<CamvasToPdf
          year={year}
          month={month}
          draggingOver={draggingOver}
          OnDrop={OnDrop}
          cuaMesData={cuaMesData}
          startDragCell={startDragCell}
          setMenu={setMenu}
          updateCuad={updateCuad}
          loadMonthData={loadMonthData}
        />*/
          null}
        </div>
      </div>
    </div>
  );
};

export default ExhibidoComponent;
