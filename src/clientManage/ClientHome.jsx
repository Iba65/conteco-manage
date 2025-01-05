import React from "react";
import "./css/generalCliStyle.css";
import { useTerryContext } from "./../commons/context/territorios/TerryContext";
import { decryptData, getDateToday } from "../commons/utils/functionsLibrary";
import TerryViewCard from "./components/TerryViewCard";
import ListTerryWorked from "./components/ListTerryWorked";
import Calendar from "./components/Calendar";
import ListExhibDates from "./components/ListExhibDates";

const filterForDates = (data, startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return data.filter((item) => {
    const itemDate = new Date(item.fecget);
    return itemDate >= start && itemDate <= end && item.fecgive !== "";
  });
};
const ClientHome = ({ idUser, closeClientManage }) => {
  //const { isSemOk, getSemola } = useGeneralContext();
  const { hnosData, getTerryByUser, loadMouthCuad } = useTerryContext();
  const [userData, setUserData] = React.useState({});
  const [opcMenu, setOpcMenu] = React.useState("territorios");
  const [rwhMovil, setrwhMovil] = React.useState({
    width: 0,
    height: 0,
  });
  const [isMovil, setIsMovil] = React.useState(false);
  const [osMovil, setOsMovil] = React.useState("Desconocido");
  const [fecServ, setFecServ] = React.useState({
    actual: "",
    fecini: "",
    fecfin: "",
    fectini: "",
    fectfin: "",
  });
  const [terwork, setTerwork] = React.useState(null);
  const [exhMonth, setExhMonth] = React.useState([]);
  //const semilla = import.meta.env.VITE_APP_SEMILLA;

  React.useEffect(() => {
    const getResolution = () => {
      setrwhMovil({
        width: window.screen.width,
        height: window.screen.height,
      });
    };
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMovil(
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    );
    if (/android/i.test(userAgent)) {
      setOsMovil("Android");
      getResolution();
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setOsMovil("iOS");
      getResolution();
    } else if (/windows phone/i.test(userAgent)) {
      setOsMovil("Windows Phone");
      getResolution();
    }
    const fecact = getDateToday(true);
    setFecServ({
      actual: `${fecact.año.toString()}-${fecact.mes}-${fecact.dia}`,
      fecini:
        parseInt(fecact.mes) >= 9
          ? `${fecact.año.toString()}-09-01`
          : `${(fecact.año + 1).toString()}-09-01`,
      fecfin:
        parseInt(fecact.mes) >= 9
          ? `${(fecact.año + 1).toString()}-08-31`
          : `${fecact.año.toString()}-08-31`,
      fectini:
        parseInt(fecact.mes) >= 9
          ? `01-09-${fecact.año.toString()}`
          : `01-09-${(fecact.año + 1).toString()}`,
      fectfin:
        parseInt(fecact.mes) >= 9
          ? `31-08-${(fecact.año + 1).toString()}`
          : `31-08-${fecact.año.toString()}`,
    });
    const fecdat = new Date();
    const exhib = loadMouthCuad(fecdat.getFullYear(), fecdat.getMonth() + 1);
    if (exhib.length > 1) {
      console.log("------->", exhib);
      if (Object.keys(exhib).length > 0) {
        const exhibMonth = exhib.map((ele) => {
          if (ele.dia.length < 3) {
            return {
              ...ele,
              dia: "0" + ele.dia,
              asings: changeIdForName(ele.asings),
            };
          } else {
            return {
              ...ele,
              dia: ele.dia,
              asings: changeIdForName(ele.asings),
            };
          }
        });
        console.log(exhibMonth);
        setExhMonth(
          exhibMonth.sort((a, b) => {
            return a.dia.localeCompare(b.dia);
          })
        );
      }
    }
  }, []);

  const changeIdForName = (idus) => {
    //console.log(hnosData, idus);
    if (idus.length > 0) {
      return idus.map((ele) => {
        const nomus = hnosData.find((el) => el.id === ele);
        if (undefined !== nomus) {
          return `${decryptData(
            nomus.nombre,
            import.meta.env.VITE_APP_SEMILLA
          )} ${nomus.apellidos.charAt(0)}`;
        } else {
          return ele;
        }
      });
    } else {
      return idus;
    }
  };

  React.useEffect(() => {
    if (terwork === null) {
      const fecact = getDateToday(true);
      const [selhnodat] = hnosData.filter((ele) => ele.id === idUser);
      setUserData({
        id: selhnodat.id,
        user: decryptData(selhnodat.usuario, import.meta.env.VITE_APP_SEMILLA),
        nombre: `${decryptData(
          selhnodat.nombre,
          import.meta.env.VITE_APP_SEMILLA
        )} ${selhnodat.apellidos?.charAt(0)}`,
        grSer: selhnodat.grupoSer,
        level: selhnodat.tipo,
        terrasig: selhnodat.territorios,
        isinExhib: selhnodat.exhibidor.state,
        historic: {
          histerry: selhnodat.historyTer,
          hisgenterry: getTerryByUser(selhnodat.id),
          hisexhib: selhnodat.historyExhib,
        },
      });
      const listTerWorked = filterForDates(
        selhnodat.historyTer,
        parseInt(fecact.mes) >= 9
          ? `${fecact.año.toString()}-09-01`
          : `${(fecact.año - 1).toString()}-09-01`,
        parseInt(fecact.mes) >= 9
          ? `${(fecact.año + 1).toString()}-08-31`
          : `${fecact.año.toString()}-08-31`
      );
      setTerwork(listTerWorked);
    }
  }, [hnosData]);

  React.useEffect(() => {
    console.log(userData);
  }, [userData]);

  const exitToClient = () => {
    closeClientManage();
  };
  return (
    <div className="clientContainer">
      <div>ClientHome</div>
      <div className="movilContiner">
        <div className="headerMovilContainer">
          <div className="headerTitle">
            <img
              className="icono-simple-s"
              src="iconos/Black/agendaWhite.png"
              alt="menu"
            />
            {`Agenda de ${userData.nombre}`}
          </div>
          <div className="headerClose">
            <img
              className="icono-simple-s"
              src="iconos/Black/cerrarBotonWhite.png"
              alt="menu"
              onClick={() => exitToClient()}
            />
          </div>
        </div>
        <div className="bodyMovilContainer">
          {Object.keys(userData).length > 0 ? (
            <>
              {opcMenu === "territorios" ? (
                <>
                  <h2>Territorios Asignados</h2>
                  {userData.terrasig.length > 0 ? (
                    userData.terrasig.map((ter) => (
                      <TerryViewCard
                        key={ter}
                        terId={ter}
                        historic={userData.historic.histerry}
                      />
                    ))
                  ) : (
                    <div className="alertNoData">
                      No tiene territorios asignados.
                    </div>
                  )}
                  {terwork.length > 0 ? (
                    <>
                      <div className="leyenda">
                        <p>Otros territorios trabajados</p>
                        <code>
                          ({fecServ.fectini} a {fecServ.fectfin})
                        </code>
                      </div>
                      <ListTerryWorked listData={terwork} />
                    </>
                  ) : null}
                </>
              ) : null}
              {opcMenu === "exhibidor" && userData.isinExhib ? (
                <>
                  <h2>Citas Exhibidor</h2>
                  {exhMonth.length > 0 ? (
                    <>
                      <ListExhibDates
                        listData={userData.historic.hisexhib}
                        feca={fecServ.actual}
                      />
                      <div style={{ width: "100%" }}>
                        <Calendar exhMonth={exhMonth} />
                      </div>
                    </>
                  ) : (
                    <div className="alertNoData">
                      No tiene participación en el Exhibidor este mes.
                    </div>
                  )}
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <div className="menuFooterContainer">
          <div
            className="opcMenuFooter"
            onClick={() => setOpcMenu("territorios")}
          >
            <img className="icono-simple-s" src="iconos/plano.png" alt="menu" />
            <code>Territorio</code>
          </div>
          <div
            className="opcMenuFooter"
            onClick={() => setOpcMenu("exhibidor")}
          >
            <img
              className="icono-simple-s"
              src="iconos/exhibidor.png"
              alt="menu"
            />
            <code>Carrito</code>
          </div>
          <div
            className="opcMenuFooter"
            onClick={() => setOpcMenu("asignaciones")}
          >
            <img className="icono-simple-s" src="iconos/lista.png" alt="menu" />
            <code>Asignacion</code>
          </div>
          <div className="opcMenuFooter" onClick={() => setOpcMenu("respons")}>
            <img
              className="icono-simple-s"
              src="iconos/Acctions/curriculum.png"
              alt="menu"
            />
            <code>Responsab.</code>
          </div>
          <div className="opcMenuFooter" onClick={() => setOpcMenu("calendar")}>
            <img
              className="icono-simple-s"
              src="iconos/agenda.png"
              alt="menu"
            />
            <code>Calendar</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
