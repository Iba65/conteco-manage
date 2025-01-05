import React from "react";
import ButtonIconoDesk from "./../commons/libraray/buttons/ButtonIconoDesk";
import { useGeneralContext } from "./../commons/context/GeneralContext";
import TerritoriesComponent from "./components/territorios/TerritoriesComponent";
import UsersComponent from "./components/usuarios/UsersComponent";
import ExhibidoComponent from "./components/carrito/ExhibidoComponent";

const datparIcons = [
  {
    icono: {
      url: "iconos/ubicacion.png",
      classi: "icono-m",
    },
    data: {
      label: {
        text: "Territorios",
        textype: "uper",
      },
      width: "100px",
      height: "auto",
      border: {
        color: "gray",
        width: "2px",
      },
    },
    colors: {
      ct: "rgb(92, 102, 133)",
      cb: "white",
    },
  },
  {
    icono: {
      url: "iconos/Acctions/perfilUsuario.png",
      classi: "icono-m",
    },
    data: {
      label: {
        text: "Usuarios",
        textype: "uper",
      },
      width: "100px",
      height: "auto",
      border: {
        color: "gray",
        width: "2px",
      },
    },
    colors: {
      ct: "rgb(92, 102, 133)",
      cb: "white",
    },
  },
  {
    icono: {
      url: "iconos/exhibidor.png",
      classi: "icono-m",
    },
    data: {
      label: {
        text: "Exhibidor",
        textype: "uper",
      },
      width: "100px",
      height: "auto",
      border: {
        color: "gray",
        width: "2px",
      },
    },
    colors: {
      ct: "rgb(92, 102, 133)",
      cb: "white",
    },
  },
  {
    icono: {
      url: "iconos/plano.png",
      classi: "icono-m",
    },
    data: {
      label: {
        text: "Planos",
        textype: "uper",
      },
      width: "100px",
      height: "auto",
      border: {
        color: "gray",
        width: "2px",
      },
    },
    colors: {
      ct: "rgb(92, 102, 133)",
      cb: "white",
    },
  },
  {
    icono: {
      url: "iconos/Acctions/engranaje.png",
      classi: "icono-m",
    },
    data: {
      label: {
        text: "Configurar",
        textype: "uper",
      },
      width: "100px",
      height: "auto",
      border: {
        color: "gray",
        width: "2px",
      },
    },
    colors: {
      ct: "rgb(92, 102, 133)",
      cb: "white",
    },
  },
];

const AdminHome = () => {
  const { GeneralState } = useGeneralContext();
  const [userSession, setUserSession] = React.useState({});
  const [menu, setMenu] = React.useState(0);

  const handleFormButton = (e) => {
    if (e === "territorios") setMenu(0);
    if (e === "usuarios") setMenu(1);
    if (e === "exhibidor") setMenu(2);
    if (e === "planos") setMenu(3);
    if (e === "configurar") setMenu(4);
  };

  React.useEffect(() => {
    if (undefined !== GeneralState.session) {
      //console.log(GeneralState.session);
      setUserSession(GeneralState.session);
    }
  }, [GeneralState.session]);

  return (
    <div className="homeContainer">
      {Object.keys(userSession).length > 0 && userSession.loguin && (
        <>
          <div className="iconActions">
            <ButtonIconoDesk
              datico={datparIcons[0]}
              onClick={handleFormButton}
            />
            <ButtonIconoDesk
              datico={datparIcons[1]}
              onClick={handleFormButton}
            />
            <ButtonIconoDesk
              datico={datparIcons[2]}
              onClick={handleFormButton}
            />
            <ButtonIconoDesk
              datico={datparIcons[3]}
              onClick={handleFormButton}
            />
            <ButtonIconoDesk
              datico={datparIcons[4]}
              onClick={handleFormButton}
            />
          </div>
          {menu === 0 ? <TerritoriesComponent session={userSession} /> : null}
          {menu === 1 ? <UsersComponent session={userSession} /> : null}
          {menu === 2 ? (
            <ExhibidoComponent session={userSession} setMenu={setMenu} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default AdminHome;
