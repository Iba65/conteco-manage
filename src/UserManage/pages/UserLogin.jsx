import React, { useEffect } from "react";
import "./../css/userGeneral.css";
import { useGeneralContext } from "./../../commons/context/GeneralContext";
import { useTerryContext } from "./../../commons/context/territorios/TerryContext";
import ButtonGroup from "./../../commons/libraray/buttons/ButtonGroup";
import InputComponent from "./../../commons/libraray/inputComponent/InputComponent";
import {
  encryptData,
  getDateToday,
  obtenerFechaHora,
} from "./../../commons/utils/functionsLibrary";
import {
  getLastUserId,
  getUserByKey,
  validateForm,
} from "./../../commons/utils/funcionsApp";
import AlertNewModal from "./../components/AlertNewModal";

const UserLogin = ({ session }) => {
  const { newUserLog, isInFileOk, isLogOK, login, getKeyByUser } =
    useGeneralContext();
  const { setUpdateUser, setNewUser, hnosData, newHdt, updateUserSession } =
    useTerryContext();
  const [userData, setUserData] = React.useState({
    namperUser: "",
    apellidosUser: "",
    emailUser: "",
    userName: "",
    userPassword: "",
    crytoPassword: "",
  });
  const [errsfield, setErrsfield] = React.useState({});
  const [newuserAlert, setNewuserAlert] = React.useState(false);
  const [isNewAccount, setIsNewAccount] = React.useState(false);

  const handleFormButton = (e) => {
    setErrsfield({});
    if (e === "validar") {
      if (isNewAccount) {
        const isValid = validateForm(userData, isNewAccount);
        if (Object.keys(isValid).length <= 0) {
          setNewuserAlert(true);
        } else {
          setErrsfield(isValid);
        }
      } else {
        const semilla = import.meta.env.VITE_APP_SEMILLA;
        const isValid = validateForm(userData, isNewAccount);
        const userObjData = getUserByKey(
          "usuario",
          hnosData,
          userData.userName,
          import.meta.env.VITE_APP_SEMILLA
        );
        if (Object.keys(isValid).length <= 0) {
          const userConection = obtenerFechaHora();
          if (isLogOK(userData)) {
            const payloadLog = {
              loguin: true,
              iduser: userObjData.id,
              user: userData.userName,
              lebel: userObjData.tipo,
              datConect: userConection,
              permitted:
                userData.crytoPassword !== "" || userObjData.tipo < 3
                  ? true
                  : false,
              seed: [
                userData.crytoPassword !== ""
                  ? encryptData(
                      getKeyByUser(userData.userName, userData.crytoPassword),
                      userData.crytoPassword
                    )
                  : encryptData(
                      getKeyByUser(userData.userName, semilla),
                      semilla
                    ),
                encryptData(userData.crytoPassword, semilla),
              ],
            };
            login(payloadLog);
            updateUserSession(userObjData.id, userConection);
            handleClean();
          } else {
            setErrsfield({
              errLogin: {
                isValid: false,
                message: "Usuario y/o contraseña incorrectos. Pruebe de nuevo.",
              },
            });
          }
        } else {
          setErrsfield(isValid);
        }
      }
    }
    if (e === "limpiar") {
      handleClean();
    }
  };
  
  const handleCreateNewUser = () => {
    let payloadUser = {};
    let usepass = userData.userPassword;
    if (!isInFileOk(userData.userName)) {
      const semilla = import.meta.env.VITE_APP_SEMILLA;
      const userObjData = getUserByKey(
        "usuario",
        hnosData,
        userData.userName,
        import.meta.env.VITE_APP_SEMILLA
      );
      if (undefined !== userObjData) {
        if (userObjData.lebel === 1 && userData.crytoPassword !== ""){
          usepass = encryptData(userData.userPassword, userData.crytoPassword)
        }
      }
      newUserLog({
        userName: userData.userName,
        userPassword: usepass,
        crytoPassword:
          userData.crytoPassword !== ""
            ? encryptData(userData.crytoPassword, userData.crytoPassword)
            : "",
      });
      //
      if (undefined !== userObjData) {
        if (userData.crytoPassword !== "") {
          payloadUser = {
            id: userObjData.id,
            nombre: userData.namperUser,
            apellidos:
              userData.crytoPassword !== ""
                ? `${userData.apellidosUser.charAt(0)}${encryptData(
                    userData.apellidosUser,
                    userData.crytoPassword
                  )}`
                : encryptData(userData.apellidosUser, semilla),
            email:
              userData.crytoPassword !== ""
                ? encryptData(userData.emailUser, userData.crytoPassword)
                : encryptData(userData.emailUser, semilla),
            whatsapp:
              userData.crytoPassword !== ""
                ? encryptData(userObjData.whatsappUser, userData.crytoPassword)
                : encryptData(userObjData.whatsappUser, semilla),
            usuario: userData.userName,
            tipo: parseInt(userObjData.tipoUser),
            grupoSer: parseInt(userObjData.grupoSer),
            exhibidor: {
              state: userObjData.exhibidor,
              cantex: 1,
            },
            territorios: userObjData.terriUser,
            ultimaSesion: userObjData.ultsesionUser,
            historyTer: userObjData.historyterUser,
          };
          setUpdateUser(userObjData.idUser, payloadUser);
        } else {
          const fechoy = getDateToday(true);
          const payloadtemp = {
            id: userObjData.id,
            nombre: encryptData(userData.namperUser, semilla),
            apellidos: encryptData(userData.apellidosUser, semilla),
            email: encryptData(userData.emailUser, semilla),
            usuario: encryptData(userData.userName, semilla),
            encrypted: encryptData(userData.userPassword, semilla),
            dateSave: fechoy.año + fechoy.mes + fechoy.dia,
          };
          newHdt(payloadtemp);
        }
      } else {
        setNewUser({
          id: hnosData.length > 0 ? getLastUserId(hnosData) : "001",
          nombre: encryptData(userData.namperUser, semilla),
          apellidos:
            userData.crytoPassword !== ""
              ? `${userData.apellidosUser.charAt(0)}${encryptData(
                  userData.apellidosUser,
                  userData.crytoPassword
                )}`
              : encryptData(userData.apellidosUser, semilla),
          email:
            userData.crytoPassword !== ""
              ? encryptData(userData.emailUser, userData.crytoPassword)
              : encryptData(userData.emailUser, semilla),
          historyTer: [],
          territorios: [],
          tipo: 4,
          grupoSer: 0,
          exhibidor: {
            state: false,
            canti: 0,
          },
          ultimaSesion: [],
          usuario: `*${userData.userName}`,
          whatsapp: "",
          encrypted: true,
        });
      }
    }
    handleClean();
    setIsNewAccount(false);
  };
  const handleClean = () => {
    setUserData({
      namperUser: "",
      apellidosUser: "",
      emailUser: "",
      userName: "",
      userPassword: "",
      crytoPassword: "",
    });
  };
  return (
    <div className="loginPageContainer">
      <div className="loginFormContainer">
        <div className="titleModal">Control de Acceso</div>
        <div className="fieldsContainer">
          {isNewAccount && (
            <>
              <div className="customFieldContiner mt-5">
                <InputComponent
                  name="namperUser"
                  label={{
                    text: "Nombre Personal",
                    align: "left",
                    posit: "left",
                    minw: 130,
                  }}
                  valini={userData.namperUser}
                  valfin={userData.namperUser}
                  width={130}
                  size={12}
                  disabled={session.permitted}
                  setState={setUserData}
                />
              </div>
              {errsfield.namperUser ? (
                <div className="errinfo">{errsfield.namperUser.message}</div>
              ) : null}
              <div className="customFieldContiner mt-2">
                <InputComponent
                  name="apellidosUser"
                  label={{
                    text: "Apellidos",
                    align: "left",
                    posit: "left",
                    minw: 130,
                  }}
                  valini={userData.apellidosUser}
                  valfin={userData.apellidosUser}
                  width={203}
                  size={23}
                  disabled={session.permitted}
                  setState={setUserData}
                />
              </div>
              <div className="customFieldContiner mt-2">
                <InputComponent
                  name="emailUser"
                  label={{
                    text: "Email",
                    align: "left",
                    posit: "left",
                    minw: 130,
                  }}
                  valini={userData.emailUser}
                  valfin={userData.emailUser}
                  width={290}
                  size={36}
                  disabled={session.permitted}
                  setState={setUserData}
                />
              </div>
              {errsfield.emailUser ? (
                <div className="errinfo">{errsfield.emailUser.message}</div>
              ) : null}
            </>
          )}
          <div className="customFieldContiner mt-2">
            <InputComponent
              name="userName"
              label={{
                text: "Usuario",
                align: "left",
                posit: "left",
                minw: 130,
              }}
              valini={userData.userName}
              valfin={userData.userName}
              width={130}
              size={12}
              helper="Minimo 4 caracteres."
              disabled={session.permitted}
              setState={setUserData}
            />
          </div>
          {errsfield.userName ? (
            <div className="errinfo">{errsfield.userName.message}</div>
          ) : null}
          <div className="customFieldContiner mt-2">
            <InputComponent
              name="userPassword"
              label={{
                text: "Contraseña",
                align: "left",
                posit: "left",
                minw: 130,
              }}
              valini={userData.userPassword}
              valfin={userData.userPassword}
              type="password"
              width={78}
              size={4}
              maxLen={10}
              helper="hasta 10 caracteres, 1 Mayuscula, numero y letras y caracteres especiales"
              disabled={session.permitted}
              setState={setUserData}
            />
          </div>
          {errsfield.userPassword ? (
            <div className="errinfo">{errsfield.userPassword.message}</div>
          ) : null}
          <div className="customFieldContiner mt-2">
            <InputComponent
              name="crytoPassword"
              label={{
                text: "Key Codificación",
                align: "left",
                posit: "left",
                minw: 130,
              }}
              valini={userData.crytoPassword}
              valfin={userData.crytoPassword}
              type="password"
              width={130}
              size={12}
              helper="Introduzca este valor solo si es administrador"
              disabled={session.permitted}
              setState={setUserData}
            />
          </div>
          {errsfield.errLogin ? (
            <div className="errinfo">{errsfield.errLogin.message}</div>
          ) : null}

          <div className="linksContainer">
            {!isNewAccount && (
              <div className="linkAcces" onClick={() => setIsNewAccount(true)}>
                Crear Cuenta
              </div>
            )}
            {isNewAccount && (
              <div className="linkAcces" onClick={() => setIsNewAccount(false)}>
                Acceso cuenta existente
              </div>
            )}
            <div className="linkAcces">Olvide mi contraseña</div>
          </div>
        </div>
        <div className="loguinFooter mt-5 w100">
          <ButtonGroup
            direction="row"
            border={{
              pos: "top",
              color: "gray",
              width: "1px",
              style: "dotted",
            }}
            list={[
              {
                label: {
                  text: "Validar",
                  textype: "uper",
                },
                width: "130px",
                height: "auto",
                border: {
                  color: "orange",
                  width: "1px",
                },
                onClick: handleFormButton,
              },
              {
                label: {
                  text: "Limpiar",
                  textype: "uper",
                },
                width: "130px",
                height: "auto",
                border: {
                  color: "orange",
                  width: "1px",
                },
                onClick: handleFormButton,
              },
            ]}
          />
        </div>
      </div>
      {newuserAlert ? (
        <div>
          <AlertNewModal
            setNewuserAlert={setNewuserAlert}
            handleCreateNewUser={handleCreateNewUser}
            name={userData.userName}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserLogin;
