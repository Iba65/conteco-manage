import React from "react";
import { useGeneralContext } from "./../commons/context/GeneralContext";
import { checkDevice, getUserByKey } from "./../commons/utils/funcionsApp.js";
import ButtonCus from "./../commons/libraray/buttons/ButtonCus";
import { useTerryContext } from "../commons/context/territorios/TerryContext.jsx";
import { obtenerFechaHora } from "../commons/utils/functionsLibrary.js";

const MenuPrincipal = () => {
  const { GeneralState, logout, login } = useGeneralContext();
  const { hnosData, updateUserSession } = useTerryContext();
  const [isMobile, setIsMobile] = React.useState(false);
  const [logon, setLogon] = React.useState(false);
  const [userlog, setUserlog] = React.useState({
    user: "",
    datConect: "",
  });
  const handleFormButton = (evento) => {
    if (evento === "salir") {
      logout();
      const userId = getUserByKey(
        "usuario",
        hnosData,
        GeneralState.session.user,
        import.meta.env.VITE_APP_SEMILLA
      );
      const feconex = obtenerFechaHora();
      const parcon = feconex.split("-");
      updateUserSession(userId.id, feconex, parcon[1]);
    }
    if (evento === "acceder") login();
  };
  const titleApp = "Gestor Territorios";

  window.addEventListener("resize", () => setIsMobile(checkDevice()));

  React.useEffect(() => {
    setIsMobile(checkDevice());
    return () => {
      window.removeEventListener("resize", () => setIsMobile(checkDevice()));
    };
  }, []);

  React.useEffect(() => {
    if (Object.keys(GeneralState).length > 0) {
      setLogon(GeneralState.session.loguin);
      setUserlog({
        user: GeneralState.session.user,
        datConect: GeneralState.session.datConect,
      });
    }
  }, [GeneralState]);

  return (
    <>
      {!isMobile ? (
        <div className="navMenu">
          <div className="navLogo">
            <img className="icono-m " src="iconos/logoApp.png" alt="menu" />
            <div className="navTitle">{titleApp}</div>
          </div>
          <div className="navAction">
            {logon ? <code>{userlog.user}</code> : null}
            <ButtonCus
              key="logonbtn"
              icono={
                logon
                  ? {
                      position: "left",
                      url: "iconos/log-off.png",
                      classi: "icono-ms mr-2",
                    }
                  : {
                      position: "left",
                      url: "iconos/log-on.png",
                      classi: "icono-ms mr-2",
                    }
              }
              data={{
                label: {
                  text: logon ? "Salir" : "Acceder",
                  textype: "uper",
                },
                width: "100px",
                height: "auto",
                border: {
                  color: "white",
                  width: "1px",
                },
              }}
              colors={
                logon
                  ? {
                      ct: "white",
                      cb: "green",
                    }
                  : {
                      ct: "white",
                      cb: "brown",
                    }
              }
              onClick={handleFormButton}
            />
          </div>
        </div>
      ) : (
        <div className="navMenuMobile">
          <div className="navicouserMobile">
            <div className="navLogoMobile">
              <img className="icono-m" src="iconos/logoApp.png" alt="menu" />
              <div className="navTitleMobile">{titleApp}</div>
            </div>
            <div className="navActionMobile">
              {logon ? <code>{userlog.user}</code> : null}
              <ButtonCus
                key="logonbtn"
                data={{
                  label: {
                    text: logon ? "Salir" : "Acceder",
                    textype: "uper",
                  },
                  width: "60px",
                  height: "auto",
                  border: {
                    color: "white",
                    width: "1px",
                  },
                  pad: {
                    h: 3,
                    w: 6,
                  },
                  font: {
                    size: "16px",
                  },
                }}
                colors={
                  logon
                    ? {
                        ct: "white",
                        cb: "green",
                      }
                    : {
                        ct: "white",
                        cb: "brown",
                      }
                }
                onClick={handleFormButton}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuPrincipal;
