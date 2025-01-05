import React, { createContext, useContext, useEffect } from "react";
//import CryptoJS from "crypto-js";
import { userLog } from "../utils/fixed";
import {
  encryptData,
  decryptData,
  guardarContexto,
  obtenerContexto,
  obtenerFechaHora,
} from "./../utils/functionsLibrary";

const initState = {
  session: {
    loguin: false,
    user: "",
    datConect: "",
    lebel: 4,
    permitted: true,
    seed: "",
  },
  isMobile: false,
  configApp: {
    totalDaysC: 120,
    totalDaysN: 120,
    totalDaysE: 365,
  },
};

export const GeneralContext = createContext(initState);

export const useGeneralContext = () => useContext(GeneralContext);

export const GeneralProvider = ({ children }) => {
  const [GeneralState, setGeneralState] = React.useState({});
  const [usersLog, setUsersLog] = React.useState(userLog);

  useEffect(() => {
    login({
      datConect: "",
      loguin: false,
      iduser: "",
      user: "",
      lebel: 0,
      permitted: false,
      seed: false,
    });

    const logincontex = obtenerContexto("UsersLogin");
    if (undefined !== logincontex && null !== logincontex) {
      setUsersLog(logincontex);
    } else {
      setUsersLog(userLog);
      guardarContexto("UsersLogin", userLog);
    }
  }, []);

  const newUserLog = ({ userName, userPassword, crytoPassword }) => {
    const semilla = import.meta.env.VITE_APP_SEMILLA;
    const newSave = [
      ...usersLog,
      {
        user: encryptData(userName, semilla),
        password: encryptData(userPassword, semilla),
        key:
          crytoPassword !== ""
            ? encryptData(crytoPassword, semilla)
            : crytoPassword,
      },
    ];
    setUsersLog(newSave);
    guardarContexto("UsersLogin", newSave);
  };

  const getSemola = (pass, key) => {
    return decryptData(pass[1], key);
  };
  const getKeyByUser = (user, password) => {
    const semilla = import.meta.env.VITE_APP_SEMILLA;
    const isInFile = usersLog.find(
      (use) => decryptData(use.user, semilla) === user
    );
    if (undefined !== isInFile) {
      return decryptData(isInFile.password, password);
    }
    return "";
  };

  const isSemOk = (pass) => {
    if (pass === "") return false;
    const semilla = import.meta.env.VITE_APP_SEMILLA;
    if (decryptData(decryptData(usersLog[0].key, semilla), pass) === pass) {
      return true;
    } else {
      return false;
    }
  };
  const isInFileOk = (userName) => {
    let isOk = false;
    let userkey = userName;
    if (userName.charAt(0) === "*") {
      userKey = userName.slice(1);
    }
    const semilla = import.meta.env.VITE_APP_SEMILLA;
    const isInFile = usersLog.find(
      (use) => decryptData(use.user, semilla) === userkey
    );
    if (undefined !== isInFile) {
      isOk = true;
    }
    return isOk;
  };

  const descriptValue = (value, crytoPassword, semilla) => {
    const passprev = decryptData(value, semilla);
    const result = decryptData(passprev, crytoPassword);
    return result;
  };
  const isLogOK = ({ userName, userPassword, crytoPassword }) => {
    let isOk = false;
    let isPassEqual = {};
    const semilla = import.meta.env.VITE_APP_SEMILLA;
    const isInFile = usersLog.find(
      (use) => decryptData(use.user, semilla) === userName
    );
    if (undefined !== isInFile) {
      if (crytoPassword !== "") {
        isPassEqual = usersLog.find(
          (use) =>
            descriptValue(use.password, crytoPassword, semilla) === userPassword
        );
      } else {
        isPassEqual = usersLog.find(
          (use) => decryptData(use.password, semilla) === userPassword
        );
      }
      if (undefined !== isPassEqual) isOk = true;
    }
    return isOk;
  };

  const login = (data) => {
    setGeneralState({
      ...GeneralState,
      session: data,
    });
  };

  const logout = () => {
    setGeneralState({
      ...GeneralState,
      session: {
        datConect: obtenerFechaHora(),
        lebel: 0,
        loguin: false,
        permitted: false,
        seed: "",
        iduser: "",
        user: "",
      },
    });
  };

  const setIsMobile = (value) => {
    setGeneralState({ ...GeneralState, isMobile: value });
  };
  return (
    <GeneralContext.Provider
      value={{
        GeneralState: GeneralState,
        usersLog,
        newUserLog,
        getKeyByUser,
        getSemola,
        isInFileOk,
        isLogOK,
        isSemOk,
        logout,
        login,
        setIsMobile,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
