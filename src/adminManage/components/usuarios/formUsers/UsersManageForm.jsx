import React from "react";
import "./../cssUsers/userStyle.css";
import { useTerryContext } from "./../../../../commons/context/territorios/TerryContext";
import { useGeneralContext } from "./../../../../commons/context/GeneralContext";
import { userTypes, initUser } from "./../../../../commons/utils/fixed";
import {
  converData,
  getUserById,
  validarDatos,
} from "./../../../../commons/utils/funcionsApp";
import {
  encryptData,
  obtenerDiaSemana,
  obtenerMesActual,
  obtenerNombreMes,
} from "./../../../../commons/utils/functionsLibrary";
import ButtonGroup from "./../../../../commons/libraray/buttons/ButtonGroup";
import InputComponent from "./../../../../commons/libraray/inputComponent/InputComponent";
import RadioButtonComponent from "./../../../../commons/libraray/radioButtonComponent/RadioButtonComponent";
import CheckBoxComponent from "./../../../../commons/libraray/checkBoxComponent/CheckBoxComponent";
import CardTerriView from "./CardTerriView";
import ListHistUser from "./../listHistUsers/ListHistUser";
import ListDateExhibView from "../ListDateExhibView";

const UsersManageForm = ({
  session,
  hnoDataSel,
  userObjData,
  setModView,
  setUserObjData,
}) => {
  const { setUpdateUser } = useTerryContext();
  const { GeneralState, getSemola } = useGeneralContext();
  const [hnoSel, setHnoSel] = React.useState({});
  const [typeList, setTypeList] = React.useState([]);
  const [errsfield, setErrsfield] = React.useState({});
  const [listExhib, setListExhib] = React.useState([]);
  //const [terrySelis, setTerrySelis] = React.useState([]);
  //const [codTerry, setCodTerry] = React.useState("");
  //const [setIsDespl] = React.useState(false);
  //console.log("--->", session);
  //console.log("===>", hnoDataSel);

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
  React.useEffect(() => {
    const semilla = import.meta.env.VITE_APP_SEMILLA;
    const keycry = getSemola(session.seed, import.meta.env.VITE_APP_SEMILLA);
    const resConvData = converData(hnoDataSel, semilla, keycry);
    setHnoSel(resConvData);
    viewExhibDate(hnoDataSel.id);
  }, [hnoDataSel]);

  React.useEffect(() => {
    if (Object.keys(hnoSel).length > 0) {
      setUserObjData({
        idUser: hnoSel.id,
        namperUser: hnoSel.nombre,
        lastnameUser: hnoSel.apellidos,
        emailUser: hnoSel.email,
        whatsappUser: hnoSel.whatsapp,
        nameUser: hnoSel.usuario,
        tipoUser: hnoSel.tipo,
        grupoSer: parseInt(hnoSel.grupoSer),
        exhibidor: hnoSel.exhibidor.state,
        terriUser: hnoSel.territorios,
        ultsesionUser: hnoSel.ultimaSesion,
        historyExibUser: hnoSel.historyExhib,
        historyterUser: hnoSel.historyTer,
        encryptedUser: hnoSel.encrypted,
      });
    }
  }, [hnoSel]);

  const viewExhibDate = (id) => {
    let newlist = [];
    //const hnoDataSel = getUserById(hnosData, id);
    if (Object.keys(hnoDataSel)) {
      const result = hnoDataSel.historyExhib.filter(
        (us) => us.idHE.slice(4, -3) === obtenerMesActual()
      );
      if (result.length > 0) {
        const lisort = result.sort((a, b) => {
          return a.idHE.localeCompare(b.idHE);
        });
        newlist = lisort.map((dat) => {
          return {
            idHE: `${obtenerDiaSemana(dat.idHE.slice(0, -1))} ${dat.idHE.slice(
              6,
              -1
            )}`,
            secdayHE: `por la ${dat.secdayHE}`,
          };
        });
      }
    }
    setListExhib(newlist);
  };

  const handleFormButton = (e) => {
    if (e === "aceptar") {
      const semilla = import.meta.env.VITE_APP_SEMILLA;
      const semola = getSemola(GeneralState.session.seed, semilla);
      const errores = validarDatos(userObjData);
      setErrsfield(errores);
      if (Object.keys(errores).length <= 0) {
        const payload = {
          id: userObjData.idUser,
          nombre: encryptData(userObjData.namperUser, semilla),
          apellidos: `${userObjData.lastnameUser.charAt(0)}${encryptData(
            userObjData.lastnameUser,
            semola
          )}`,
          email: `${encryptData(userObjData.emailUser, semola)}`,
          whatsapp: `${encryptData(userObjData.whatsappUser, semola)}`,
          usuario: `${encryptData(userObjData.nameUser, semilla)}`,
          tipo: parseInt(userObjData.tipoUser),
          grupoSer: parseInt(userObjData.grupoSer),
          exhibidor: {
            state: userObjData.exhibidor,
            cantex: 1,
          },
          territorios: userObjData.terriUser,
          ultimaSesion: userObjData.ultsesionUser,
          historyExhib: userObjData.historyExibUser,
          historyTer: userObjData.historyterUser,
          encrypted: true,
        };
        setUpdateUser(userObjData.idUser, payload);
      } else {
        return;
      }
    }
    if (e === "cancelar") {
    }
    setErrsfield({});
    setUserObjData(initUser);
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
        {Object.keys(hnoSel).length > 0 ? (
          <div className="fieldsColsContiner">
            <div className="fieldsCol50">
              <div className="intianDataContainer">
                <div className="fieldataFix">
                  <label>Codigo:&nbsp;</label>
                  <span>{hnoSel.id}</span>
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
                  valini={hnoSel.nombre}
                  width={130}
                  size={12}
                  disabled={!session.permitted}
                  foco={false}
                  setState={setUserObjData}
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
                  valini={hnoSel.apellidos}
                  width={203}
                  size={23}
                  disabled={!session.permitted}
                  foco={false}
                  setState={setUserObjData}
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
                  valini={hnoSel.email}
                  width={290}
                  size={36}
                  disabled={!session.permitted}
                  foco={false}
                  setState={setUserObjData}
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
                  valini={hnoSel.whatsapp}
                  width={117}
                  size={10}
                  disabled={!session.permitted}
                  foco={false}
                  setState={setUserObjData}
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
                  valini={hnoSel.usuario}
                  width={150}
                  size={15}
                  disabled={!session.permitted}
                  foco={false}
                  setState={setUserObjData}
                />
              </div>
              {errsfield.nameUser ? (
                <div className="errinfo">{errsfield.nameUser}</div>
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
                    valini={hnoSel.grupoSer}
                    width={30}
                    widfld={12}
                    size={1}
                    maxLen={1}
                    foco={false}
                    disabled={!session.permitted}
                    setState={setUserObjData}
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
                    valini={hnoSel.exhibidor.state}
                    valfin={hnoSel.exhibidor.state}
                    position="right"
                    disabled={!session.permitted}
                    setState={setUserObjData}
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
                  valini={hnoSel.tipo}
                  valfin={userObjData.tipoUser}
                  position="Row"
                  disabled={!session.permitted}
                  setState={setUserObjData}
                />
              </div>
            </div>
            <div className="fieldsCol50 ml-5">
              <div className="histUserConten">
                <div className="histUserTitel">
                  Historico de territorios de {userObjData.namperUser}
                </div>
                <div className="histUserList">
                  <ListHistUser listData={userObjData.historyterUser} />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="viewData">
          <div className="fieldRowContent">
            <label>Ultima conexión</label>
            {userObjData.ultsesionUser.length > 0 ? (
              <div className="fieldViewConten">
                <div className="fieldViewData">
                  {
                    userObjData.ultsesionUser[
                      userObjData.ultsesionUser.length - 1
                    ].fec
                  }
                </div>
              </div>
            ) : null}
          </div>
          <div className="viewDataMoreInfo">
            <div>
              {userObjData.terriUser.length > 0 ? (
                <>
                  <label style={{ marginTop: "10px" }}>
                    Territorios que actualmente trabaja:
                  </label>
                  <div className="listTerryWork">
                    {userObjData.terriUser.map((tt) => (
                      <CardTerriView key={tt} codter={tt} />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            {listExhib.length > 0 ? (
              <div>
                <label style={{ marginTop: "10px" }}>Exhibidor:</label>
                <ListDateExhibView
                  mes={obtenerNombreMes(obtenerMesActual())}
                  user={hnoSel.usuario}
                  data={listExhib}
                />
              </div>
            ) : null}
          </div>
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
                text: "Salir",
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

export default UsersManageForm;
