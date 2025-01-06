import React, { createContext, useContext, useEffect } from "react";
import { usuarios, temporal, exhibidorIni, usutemp } from "../../utils/fixed";
import {
  guardarContexto,
  obtenerContexto,
  obtenerDiaSemana,
} from "./../../utils/functionsLibrary";
import * as Actions from "./TerryActions";
import { calcTimTrans } from "../../utils/funcionsApp";

const initState = {
  terryData: [],
  hnosData: usuarios,
  cuadrante: exhibidorIni,
  htd: usutemp,
};

function getHno(data, id) {
  const isfind = data.find((hno) => hno.nombre === id);
  if (undefined !== isfind) {
    return isfind.id;
  } else {
    return "";
  }
}

export const TerryContext = createContext(initState);

export const useTerryContext = () => {
  const contexto = useContext(TerryContext);
  return contexto;
};

export const TerryProvider = ({ children }) => {
  const [terryState, setTerryState] = React.useState(initState.terryData);
  //const [terrySelected, setTerrySelected] = React.useState({});
  const [hnosState, setHnosState] = React.useState(initState.hnosData);
  const [cuadranteData, setCuadranteData] = React.useState(initState.cuadrante);
  const [hdt, setHdt] = React.useState(initState.htd);

  useEffect(() => {
    const contexto = obtenerContexto("Territorios");
    if (undefined !== contexto && null !== contexto) {
      setTerryState(contexto);
    } else {
      setTerryState(temporal);
      guardarContexto("Territorios", temporal);
    }
    const userContex = obtenerContexto("Usuarios");
    if (undefined !== userContex && null !== userContex) {
      setHnosState(userContex);
    } else {
      setHnosState(usuarios);
      guardarContexto("Usuarios", usuarios);
    }
    const exhibContex = obtenerContexto("Exhibidor");
    if (undefined !== exhibContex && null !== exhibContex) {
      setCuadranteData(exhibContex);
    } else {
      setCuadranteData(exhibidorIni);
      guardarContexto("Exhibidor", exhibidorIni);
    }
    const hdtContex = obtenerContexto("hdt");
    if (undefined !== hdtContex && null !== hdtContex) {
      setHdt(hdtContex);
    } else {
      setHdt(usutemp);
      guardarContexto("hdt", usutemp);
    }
  }, []);

  React.useEffect(() => {
    //console.log(hnosState);
  }, [hnosState]);

  //
  //==================================================================================
  //                            funciones para territoios                            =
  //==================================================================================
  const updateTerryData = (data) => {
    let newsterstate;
    if (!Actions.isInData(data, terryState)) {
      newsterstate = [...terryState, data];
      setTerryState(newsterstate);
    } else {
      newsterstate = terryState.map((ter) => {
        if (ter.idTD === data.idTD) {
          return data;
        } else {
          return ter;
        }
      });
      setTerryState(newsterstate);
    }
    guardarContexto("Territorios", newsterstate);
  };

  const getTerryById = (codigo) => {
    const terryFind = terryState.find((ter) => ter.idTD === codigo);
    if (undefined !== terryFind) {
      return terryFind;
    } else {
      return {};
    }
  };
  const setArchive = (action, data, date) => {
    const findter = terryState.find((ter) => ter.idTD === data.idTD);
    let newHistoric = findter.historiTD;
    if (action === "asignar") {
      newHistoric.push({
        idHTD: `${data.idTD}${date.replaceAll("-", "")}`,
        hnohasHTD: data.hnoTD,
        fecsalHTD: date,
        fecentHTD: "",
      });
    }
    if (action === "archivar") {
      newHistoric = findter.historiTD.map((dat, index) => {
        if (findter.historiTD.length - 1 === index) {
          return {
            idHTD: dat.idHTD,
            hnohasHTD: dat.hnohasHTD,
            fecsalHTD: dat.fecsalHTD,
            fecentHTD: date,
          };
        } else {
          return dat;
        }
      });
      //console.log(newHistoric);
    }
    const newdatater = {
      idTD: findter.idTD,
      descTD: findter.descTD,
      grupoTD: findter.grupoTD,
      hisgenTD: findter.hisgenTD,
      historiTD: newHistoric,
      hnohasTD: action === "asignar" ? data.hnoTD : "",
      idhnohasTD: action === "asignar" ? getHno(hnosState, data.hnoTD) : "",
      planoTD: findter.planoTD,
      stateTD: action === "asignar",
      tipoTD: findter.tipoTD,
      fecstateTD: date,
    };
    //console.log(newdatater);
    const newTerryState = terryState.map((ter) => {
      if (ter.idTD === newdatater.idTD) {
        return newdatater;
      } else {
        return ter;
      }
    });
    setTerryState(newTerryState);
    guardarContexto("Territorios", newTerryState);
    //
    updateHisterUser(action, data, date);
  };

  const getLongTerrByType = (type) => {
    return Actions.getLong(type, terryState);
  };

  const getTerryByUser = (id) => {
    const findters = [];
    terryState.map((ter) => {
      const isinfile = ter.historiTD.filter((ele) => ele.hnohasHTD === id);
      if (isinfile.length > 0) {
        findters.push(...isinfile);
      }
    });
    return findters;
  };
  //
  //==================================================================================
  //                             funciones para usuarios                              =
  //==================================================================================
  const setNewUser = (data) => {
    const newUserState = [...hnosState, data];
    setHnosState(newUserState);
    guardarContexto("Usuarios", newUserState);
  };
  const setdelUser = (iduser) => {
    const newUserState = hnosState.filter((hno) => hno.id !== iduser);
    setHnosState(newUserState);
    guardarContexto("Usuarios", newUserState);
  };
  const setUpdateUser = (iduser, data) => {
    const newUserState = hnosState.map((hno) => {
      if (hno.id === iduser) {
        return data;
      } else {
        return hno;
      }
    });
    setHnosState(newUserState);
    guardarContexto("Usuarios", newUserState);
  };
  const isinArray = (id, arr) => {
    const isin = arr.find((ele) => ele.idHE === id);
    if (undefined !== isin) {
      return true;
    } else {
      return false;
    }
  };
  const udataHistExibUser = (ids, payload, tempHnoState) => {
    const newUserState = tempHnoState.map((user) => {
      if (ids.includes(user.id)) {
        if (!isinArray(payload.idHE, user.historyExhib)) {
          const newdata = {
            ...user,
            historyExhib: [...user.historyExhib, payload],
          };
          return newdata;
        } else {
          return user;
        }
      } else {
        if (user.historyExhib.length > 0) {
          const his = user.historyExhib.filter(
            (ele) => ele.idHE !== payload.idHE
          );
          const newdatb = {
            ...user,
            historyExhib: his,
          };
          return newdatb;
        } else {
          return user;
        }
      }
    });
    return newUserState;
  };
  const calcTimer = (data, timer) => {
    const hini = data.fec.split("-");
    const timtrans = calcTimTrans(hini[1], timer);
    return timtrans;
  };
  const updateUserSession = (iduser, conectuser, timer = null) => {
    const newUserState = hnosState.map((hno) => {
      if (hno.id === iduser) {
        const newdat = {
          ...hno,
          ultimaSesion: [
            ...hno.ultimaSesion,
            {
              fec: conectuser,
              tim:
                timer === null
                  ? "00:00"
                  : calcTimer(
                      hno.ultimaSesion[hno.ultimaSesion.length - 1],
                      timer
                    ),
            },
          ],
        };
        return newdat;
      } else {
        return hno;
      }
    });
    setHnosState(newUserState);
    guardarContexto("Usuarios", newUserState);
  };
  const updateHisterUser = (action, data, date) => {
    let newobj = {};
    const newUserState = hnosState.map((hno) => {
      if (hno.id === data.hnoTD) {
        if (action === "asignar") {
          newobj = {
            idhit: `${date.replaceAll("-", "")}${data.idTD}`,
            fecget: date,
            fecgive: "",
          };
          return {
            ...hno,
            historyTer: [...hno.historyTer, newobj],
            territorios: [...hno.territorios, data.idTD],
          };
        }
        if (action === "archivar") {
          const newdat = hno.historyTer.map((ht) => {
            // comprobar que el territorio que se quiere actualizar es el id enviado y que la fecha de vuelta este vacia.
            if (ht.idhit.slice(-4) === data.idTD) {
              if (ht.fecgive === "") {
                return {
                  idhit: ht.idhit,
                  fecget: ht.fecget,
                  fecgive: date,
                };
              } else {
                return ht;
              }
            } else {
              return ht;
            }
          });
          return {
            ...hno,
            historyTer: newdat,
            territorios: hno.territorios.filter((ter) => ter !== data.idTD),
          };
        }
      } else {
        return hno;
      }
    });
    setHnosState(newUserState);
    guardarContexto("Usuarios", newUserState);
  };
  //
  //==================================================================================
  //                       Acciones del cuadrante del exhibidor                      =
  //==================================================================================

  const updateCuadran = (data) => {
    setCuadranteData(data);
    guardarContexto("Exhibidor", data);
  };

  const isYearInData = (year) => {
    // Recorremos cada objeto en el array
    return cuadranteData.some((obj) => {
      // Obtenemos las claves de cada objeto
      return Object.keys(obj).some((key) => {
        // Verificamos si los primeros cuatro caracteres de la clave coinciden con el año dado
        return key.slice(0, 4) === year.toString();
      });
    });
  };
  const isMouthinData = (year, mouth) => {
    const stryear = year.toString();
    const mesStr = mouth.toString().padStart(2, "0");
    // Recorremos cada objeto en el array
    return cuadranteData.some((obj) => {
      // Obtenemos las claves de cada objeto
      return Object.keys(obj).some((key) => {
        // Verificamos si los caracteres 5 y 6 de la clave coinciden con el mes dado
        return key.slice(0, 6) === `${stryear}${mesStr}`;
      });
    });
  };
  const loadMouthCuad = (year, month) => {
    const mesStr = month.toString().padStart(2, "0");
    const [selobj] = cuadranteData.filter((objeto) =>
      objeto.hasOwnProperty(`${year}${mesStr}`)
    );
    if (undefined !== selobj) {
      return selobj[`${year}${mesStr}`];
    } else {
      return {};
    }
  };
  const updateHisUserExib = (year, month, data) => {
    let tempHnoState = hnosState;
    let sectionday = "";
    let sectionid = "";
    data.map((dat, index) => {
      if (index > 0) {
        sectionid = dat.dia.slice(-1);
        const fecdata =
          year.toString() +
          month.toString().padStart(2, "0") +
          (dat.dia.slice(0, -1).length > 1
            ? dat.dia.slice(0, -1)
            : `0${dat.dia.slice(0, -1)}`);
        const sectday = obtenerDiaSemana(fecdata);
        switch (sectday) {
          case "lunes":
            if (sectionid === "m") {
              sectionday = "mañana";
            } else {
              sectionday = "tarde";
            }
            break;
          case "martes":
          case "jueves":
          case "sabado":
            sectionday = "mañana";
            break;
          case "viernes":
            sectionday = "tarde";
            break;
          default:
            break;
        }
        const payload = {
          idHE: fecdata + sectionday.charAt(0),
          secdayHE: sectionday,
        };
        const newhnostate = udataHistExibUser(
          dat.asings,
          payload,
          tempHnoState
        );
        tempHnoState = newhnostate;
      }
    });
    setHnosState(tempHnoState);
    guardarContexto("Usuarios", tempHnoState);
  };

  const getDatesForUser = (id) => {
    let datInMou = [];
    const fechaActual = new Date(); // Obtiene la fecha actual
    const anio = fechaActual.getFullYear(); // Obtiene el año
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const cuames = loadMouthCuad(anio.toString(), mes.toString());
    const newdata = cuames.filter((ele) => ele.asings.includes(id));
    newdata.map((dat) => {
      const day = dat.dia.slice(0, -1);
      const diasemana = "lunes";
      const mes = "diciembre";
      datInMou.push({ dia: day, text: `${diasemana} ${day} de ${mes}` });
    });
    console.log(datInMou.sort((a, b) => a.dia - b.dia));
  };

  //
  //==================================================================================
  //                             Acciones del fichero Hdt                            =
  //==================================================================================
  const newHdt = (data) => {
    const newdata = [...hdt, data];
    setHdt(newdata);
    guardarContexto("hdt", newdata);
  };

  //
  //=================================================================
  //
  return (
    <TerryContext.Provider
      value={{
        hnosData: hnosState,
        terryState: terryState,
        cuadranteExh: cuadranteData,
        newHdt,
        getLongTerrByType,
        updateTerryData,
        setArchive,
        getTerryById,
        getTerryByUser,
        setNewUser,
        setUpdateUser,
        setdelUser,
        updateCuadran,
        isYearInData,
        isMouthinData,
        loadMouthCuad,
        updateHisUserExib,
        updateUserSession,
      }}
    >
      {children}
    </TerryContext.Provider>
  );
};
