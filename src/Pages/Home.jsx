import React from "react";
import { useGeneralContext } from "./../commons/context/GeneralContext";
import UserLogin from "./../UserManage/pages/UserLogin";
import AdminHome from "../adminManage/AdminHome";
import ClientHome from "../clientManage/ClientHome";
import { getUserByKey } from "../commons/utils/funcionsApp";
import { obtenerFechaHora } from "../commons/utils/functionsLibrary";
import { useTerryContext } from "../commons/context/territorios/TerryContext";
//import UsersManageForm from "../components/usuarios/UsersManageForm";

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

const Home = () => {
  const { GeneralState, logout } = useGeneralContext();
  const { hnosData, updateUserSession } = useTerryContext();
  const [userSession, setUserSession] = React.useState({});

  React.useEffect(() => {
    if (undefined !== GeneralState.session) {
      //console.log(GeneralState.session);
      setUserSession(GeneralState.session);
    }
  }, [GeneralState.session]);

  const closeClientManage = () => {
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
  };

  return (
    <div>
      {Object.keys(userSession).length > 0 && (
        <>
          {userSession.loguin ? (
            <>
              {userSession.permitted ? (
                <AdminHome />
              ) : (
                <ClientHome
                  idUser={userSession.iduser}
                  closeClientManage={closeClientManage}
                />
              )}
            </>
          ) : (
            <UserLogin session={userSession} />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
