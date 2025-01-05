import React from "react";
import "./../cssUsers/userStyle.css";
import { useTerryContext } from "./../../../../commons/context/territorios/TerryContext";
import { useGeneralContext } from "./../../../../commons/context/GeneralContext";
import { userTypes, initUser } from "./../../../../commons/utils/fixed";
import {
  getLastUserId,
  validarDatos,
} from "./../../../../commons/utils/funcionsApp";
import { encryptData } from "./../../../../commons/utils/functionsLibrary";
import InputComponent from "./../../../../commons/libraray/inputComponent/InputComponent";
import RadioButtonComponent from "./../../../../commons/libraray/radioButtonComponent/RadioButtonComponent";
import CheckBoxComponent from "./../../../../commons/libraray/checkBoxComponent/CheckBoxComponent";
import ButtonGroup from "./../../../../commons/libraray/buttons/ButtonGroup";
import ListHistUser from "./../../../components/usuarios/listHistUsers/ListHistUser";

const UsersNewForm = ({ setModView }) => {
  const { hnosData, setNewUser } = useTerryContext();
  const { GeneralState, getSemola } = useGeneralContext();
  const [errsfield, setErrsfield] = React.useState({});
  const [userObjNew, setUserObjNew] = React.useState(initUser);
  const [typeList, setTypeList] = React.useState([]);
  //const [seedValue, setSeedValue] = React.useState("");

  /*React.useEffect(() => {
    if (seedValue !== '') {
      const seed = decryptData(seedValue, semilla);
    }
  }, [seedValue]);*/
  React.useEffect(() => {
    if (undefined !== hnosData) {
      setUserObjNew({
        ...userObjNew,
        idUser: hnosData.length > 0 ? getLastUserId(hnosData) : "001",
      });
    }
  }, [hnosData]);
  
  React.useEffect(() => {
    const newUser = [];
    userTypes.map((us) => {
      newUser.push({
        key: us.key,
        value: us.text,
        permit: us.perm,
      });
    });
    setTypeList(newUser);
  }, [userTypes]);

  const handleFormButton = (e) => {
    if (e === "aceptar") {
      const semilla = import.meta.env.VITE_APP_SEMILLA;
      const semola = getSemola(GeneralState.session.seed, semilla);
      const errores = validarDatos(userObjNew);
      setErrsfield(errores);
      if (Object.keys(errores).length <= 0 && semilla !== "") {
        setNewUser({
          id: userObjNew.idUser,
          nombre: encryptData(userObjNew.namperUser, semilla),
          apellidos: `${userObjNew.lastnameUser.charAt(0)}${encryptData(
            userObjNew.lastnameUser,
            semola
          )}`,
          email: `${encryptData(userObjNew.emailUser, semola)}`,
          historyTer: [],
          territorios: [],
          tipo: parseInt(userObjNew.tipoUser),
          grupoSer: parseInt(userObjNew.grupoSer),
          exhibidor: {
            state: userObjNew.exhibidor,
            canti: 1,
          },
          ultimaSesion: [],
          usuario: `${encryptData(userObjNew.nameUser, semilla)}`,
          whatsapp: `${encryptData(userObjNew.whatsappUser, semola)}`,
        });
      } else {
        return;
      }
    }
    if (e === "cancelar") {
    }
    setErrsfield({});
    setUserObjNew(initUser);
    setTypeList([]);
    setModView(0);
  };

  return (
    <div className="usersFormContent">
      <div className="usersFormHeader">
        <div className="icomen">
          <img
            className="icono-ms"
            src="iconos/Black/abrirMenu.png"
            alt="menu"
          />
        </div>
        <div className="usersFormTitle">Gestion Usuarios</div>
        <div>
          <img
            className="icono-small w40"
            src="iconos/Black/cerrarBoton.png"
            alt="menu"
            onClick={() => setModView(0)}
          />
        </div>
      </div>
      <div className="usersFormBody">
        <div className="fieldsColsContiner">
          <div className="fieldsCol50">
            <div
              className={
                GeneralState.session.seed
                  ? "intianDataContainerSeed"
                  : "intianDataContainer"
              }
            >
              <div className="fieldataFix">
                <label>Codigo:&nbsp;</label>
                <span>{userObjNew.idUser}</span>
                {/*GeneralState.session.seed ? (
                  <div className="customFieldContiner ml-0">
                    <InputComponent
                      name="semilla"
                      label={{
                        text: "",
                        align: "left",
                        posit: "left",
                        minw: 0,
                      }}
                      valini={seedValue}
                      width={150}
                      size={15}
                      object={false}
                      foco={false}
                      setState={setSeedValue}
                    />
                  </div>
                ) : null*/}
              </div>
            </div>
            <div className="customFieldContiner mt-5">
              <InputComponent
                name="namperUser"
                label={{
                  text: "Nombre Personal",
                  align: "left",
                  posit: "left",
                  minw: 130,
                }}
                valini={userObjNew.namperUser}
                width={130}
                size={12}
                foco={false}
                setState={setUserObjNew}
              />
            </div>
            {errsfield.namperUser ? (
              <div className="errinfo">{errsfield.namperUser}</div>
            ) : null}
            <div className="customFieldContiner mt-2">
              <InputComponent
                name="lastnameUser"
                label={{
                  text: "Apellidos",
                  align: "left",
                  posit: "left",
                  minw: 130,
                }}
                valini={userObjNew.lastnameUser}
                width={203}
                size={23}
                foco={false}
                setState={setUserObjNew}
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
                valini={userObjNew.emailUser}
                width={290}
                size={36}
                foco={false}
                setState={setUserObjNew}
              />
            </div>
            {errsfield.emailUser ? (
              <div className="errinfo">{errsfield.emailUser}</div>
            ) : null}
            <div className="customFieldContiner mt-2">
              <InputComponent
                name="whatsappUser"
                label={{
                  text: "Numero Whatsapp",
                  align: "left",
                  posit: "left",
                  minw: 130,
                }}
                valini={userObjNew.whatsappUser}
                width={117}
                size={10}
                foco={false}
                setState={setUserObjNew}
              />
            </div>
            {errsfield.whatsappUser ? (
              <div className="errinfo">{errsfield.whatsappUser}</div>
            ) : null}
            <div className="customFieldContiner mt-2">
              <InputComponent
                name="nameUser"
                label={{
                  text: "Nombre Usuario",
                  align: "left",
                  posit: "left",
                  minw: 130,
                }}
                valini={userObjNew.nameUser}
                width={150}
                size={15}
                foco={false}
                setState={setUserObjNew}
              />
            </div>
            {errsfield.nameUser ? (
              <div className="errinfo">{errsfield.nameUser}</div>
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
                valini={userObjNew.userPassword}
                valfin={userObjNew.userPassword}
                type="password"
                width={78}
                size={4}
                maxLen={8}
                helper="hasta 10 caracteres, 1 Mayuscula, numero y letras y caracteres especiales"
                setState={setUserData}
              />
            </div>
            {errsfield.userPassword ? (
              <div className="errinfo">{errsfield.userPassword.message}</div>
            ) : null}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div className="customFieldContiner mt-2 w50">
                <InputComponent
                  name="grupoSer"
                  type="entero"
                  label={{
                    text: "Grupo Servicio",
                    align: "left",
                    posit: "left",
                    minw: 130,
                  }}
                  valini={userObjNew.grupoSer}
                  width={30}
                  widfld={12}
                  size={1}
                  maxLen={1}
                  foco={false}
                  setState={setUserObjNew}
                />
              </div>
              <div className="customFieldContiner mt-2 w50">
                <CheckBoxComponent
                  name="exhibidor"
                  label={{
                    text: "Participa en el Exhibidor.",
                    align: "left",
                    posit: "left",
                    minw: 0,
                  }}
                  valini={false}
                  valfin={userObjNew.exhibidor}
                  position="right"
                  disabled={false}
                  setState={setUserObjNew}
                />
              </div>
            </div>
            {errsfield.grupoSer ? (
              <div className="errinfo">{errsfield.grupoSer}</div>
            ) : null}
            {errsfield.exhibidor ? (
              <div className="errinfo">{errsfield.exhibidor}</div>
            ) : null}
            <div className="customFieldContiner mt-2">
              <RadioButtonComponent
                name="tipoUser"
                label={{
                  text: "Tipo Usuario",
                  align: "left",
                  posit: "top",
                  minw: 0,
                }}
                list={typeList}
                valini={userObjNew.tipoUser}
                valfin={userObjNew.tipoUser}
                position="Row"
                setState={setUserObjNew}
              />
            </div>
          </div>
          <div className="fieldsCol50 ml-5">
            <div className="histUserConten">
              <div className="histUserTitel">
                Historico de territorios de {userObjNew.namperUser}
              </div>
              <div className="histUserList">
                <ListHistUser listData={userObjNew.historyterUser} />
              </div>
            </div>
          </div>
        </div>
        <div className="viewData">
          <div className="fieldRowContent">
            <label>Ultima conexión:</label>
          </div>
          {userObjNew.terriUser.length > 0 ? (
            <>
              <label style={{ marginTop: "10px" }}>
                Territorios que actualmente trabaja:
              </label>
            </>
          ) : null}
        </div>
      </div>
      <div className="formFooter mt-5 w100">
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
                text: "Aceptar",
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
                text: "Cancelar",
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
  );
};

export default UsersNewForm;
