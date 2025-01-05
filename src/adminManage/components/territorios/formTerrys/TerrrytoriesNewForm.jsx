import React from "react";
import "./../../../../general.css";
import { useTerryContext } from "./../../../../commons/context/territorios/TerryContext";
import { getDateToday } from "./../../../../commons/utils/functionsLibrary";
import { initTer } from "./../../../../commons/utils/fixed";
import { validarDatosTer } from "./../../../../commons/utils/funcionsApp";
import InputComponent from "./../../../../commons/libraray/inputComponent/InputComponent";
import RadioButtonComponent from "./../../../../commons/libraray/radioButtonComponent/RadioButtonComponent";
import ButtonGroup from "./../../../../commons/libraray/buttons/ButtonGroup";
import ImagenConRespaldo from "./../../ImagenConRespaldo";

const getImgByName = (tipoter, nameter) => {
  let imgter = "";
  if (tipoter === 1) {
    imgter = `terrImg/casa/${nameter}`;
  }
  if (tipoter === 2) {
    imgter = `terrImg/negocio/${nameter}`;
  }
  if (tipoter === 3) {
    imgter = `terrImg/campo/${nameter}`;
  }
  return imgter;
};

const TerrrytoriesNewForm = ({ hnosData, setModView }) => {
  const { terryState, updateTerryData, getLongTerrByType } = useTerryContext();
  const [tipoter, setTipoter] = React.useState(1);
  const [fecExit, setFecExit] = React.useState({
    dayFE: getDateToday(true).dia,
    mounthFE: getDateToday(true).mes,
    yearFE: getDateToday(true).año,
  });
  const [fecIn, setFecIn] = React.useState({
    dayFI: getDateToday(true).dia,
    mounthFI: getDateToday(true).mes,
    yearFI: getDateToday(true).año,
  });
  const [imgTerr, setImgTerr] = React.useState("terrImg/PlanoElche.jpg");
  const [territory, setTerritory] = React.useState(initTer);
  const [errsfield, setErrsfield] = React.useState({});
  const modal = React.useRef();
  const datafields = React.useRef();

  /*React.useEffect(() => {
    //console.log(terryState);
  }, [terryState]);*/

  React.useEffect(() => {
    let newlist = [];
    hnosData.map((hno) => {
      newlist.push({
        key: hno.id,
        text: hno.nombre,
        value: hno.nombre,
      });
    });
  }, [hnosData]);

  React.useEffect(() => {
    if (tipoter > 0) {
      setTerritory({
        ...territory,
        idTD: getLongTerrByType(tipoter),
        grupoTD: tipoter,
      });
    }
  }, [tipoter]);

  const handleNumberChange = (e) => {
    const regex = /[^0-9]/;
    if (e.target.id.slice(-1) === "E") {
      if (e.target.value === "") {
        setFecExit({ ...fecExit, [e.target.id]: "" });
      }
      if (!regex.test(e.target.value)) {
        setFecExit({ ...fecExit, [e.target.id]: e.target.value });
      }
    } else {
      if (e.target.value === "") {
        setFecIn({ ...fecIn, [e.target.id]: "" });
      }
      if (!regex.test(e.target.value)) {
        setFecIn({ ...fecIn, [e.target.id]: e.target.value });
      }
    }
  };
  const handleFormButton = (evento) => {
    const hoy = getDateToday();
    if (evento === "aceptar") {
      const errores = validarDatosTer(territory);
      setErrsfield(errores);
      if (Object.keys(errores).length <= 0) {
        const payloadTer = {
          idTD: territory.idTD,
          descTD: territory.descTD,
          grupoTD: territory.grupoTD,
          tipoTD: territory.tipoTD,
          stateTD: false,
          fecstateTD: hoy,
          idhnohasTd: "000",
          hnohasTD: "creacion",
          planoTD: imgTerr,
          historiTD: [
            {
              idHTD: `${territory.idTD}${hoy.replaceAll("-", "")}`,
              hnohasHTD: "Creación",
              fecsalHTD: hoy,
              fecentHTD: hoy,
            },
          ],
          hisgenTD: {
            inService: {
              hnoUse: [
                {
                  hno: "",
                  nuso: 0,
                },
              ],
              canUse: 0,
              minDiuse: 0,
              maxDiuse: 0,
              totDiuse: 0,
              minDides: 0,
              maxDides: 0,
              totDides: 0,
            },
            total: {
              hnoUse: [
                {
                  hno: "",
                  nuso: 0,
                },
              ],
              canUse: 0,
              minDiuse: 0,
              maxDiuse: 0,
              totDiuse: 0,
              minDides: 0,
              maxDides: 0,
              totDides: 0,
            },
          },
        };
        updateTerryData(payloadTer);
        setTipoter(1);
        setImgTerr("terrImg/PlanoElche.jpg");
        setTerritory(initTer);
        setModView(0);
      }
    }
    if (evento === "cancelar") {
      setTipoter(1);
      setImgTerr("terrImg/PlanoElche.jpg");
      setTerritory(initTer);
      setModView(0);
    }
  };

  const handleFileChange = (event) => {
    const [fileList] = event.target.files;
    setImgTerr(getImgByName(tipoter, fileList.name));
    setTerritory({ ...territory, planoTD: fileList.name });
  };

  return (
    <>
      <div className="generalFormContiner">
        <div ref={modal} className="newproductForm">
          <div className="formHeader">
            <img
              className="icono-small"
              src="iconos/Black/abrirMenu.png"
              alt="menu"
            />
            <h1>Nuevo Territorio</h1>
            <img
              className="icono-small w40"
              src="iconos/Black/cerrarBoton.png"
              alt="menu"
              onClick={() => setModView(0)}
            />
          </div>
          <div id="formbody" className="formBody">
            <div className="upperContiner"></div>
            <div className="fieldsColsContiner">
              <div className="fieldsCol50">
                <div className="intianDataContainer mb-2">
                  <div className="customFieldContiner">
                    <RadioButtonComponent
                      name="tipoter"
                      label={{
                        text: "Tipo territorio",
                        align: "left",
                        posit: "top",
                        minw: 148,
                      }}
                      list={[
                        { key: 1, value: "Ciudad" },
                        { key: 2, value: "Negocios" },
                        { key: 3, value: "Campo" },
                      ]}
                      valini={1}
                      valfin={tipoter}
                      object={false}
                      position="Row"
                      disabled={false}
                      setState={setTipoter}
                    />
                  </div>
                  <div className="fieldataFix mt-2">
                    <label>Codigo:&nbsp;</label>
                    <span>{territory.idTD}</span>
                  </div>
                </div>
                {errsfield.idTD ? (
                  <div className="errinfo">{errsfield.idTD}</div>
                ) : null}
                {errsfield.grupoTD ? (
                  <div className="errinfo">{errsfield.grupoTD}</div>
                ) : null}
                <div className="customFieldContiner mt-5">
                  <InputComponent
                    name="descTD"
                    label={{
                      text: "Descripcion",
                      align: "left",
                      posit: "left",
                      minw: 148,
                    }}
                    valini={territory.descTD}
                    width={260}
                    size={30}
                    disabled={false}
                    foco={false}
                    setState={setTerritory}
                  />
                </div>
                {errsfield.descTD ? (
                  <div className="errinfo">{errsfield.descTD}</div>
                ) : null}
                <div id="radiottd" className="customFieldContiner mt-3">
                  <RadioButtonComponent
                    name="tipoTD"
                    label={{
                      text: "Caracteristica",
                      align: "left",
                      posit: "left",
                      minw: 148,
                    }}
                    list={[
                      { key: 1, value: "Con ascensor" },
                      { key: 2, value: "Algún ascensor" },
                      { key: 3, value: "Plantas bajas" },
                      { key: 4, value: "Escaleras" },
                      { key: 5, value: "Negocio" },
                      { key: 6, value: "Campo" },
                    ]}
                    valini={territory.tipoTD}
                    valfin={territory.tipoTD}
                    position="Row"
                    disabled={false}
                    setState={setTerritory}
                  />
                </div>
                {errsfield.tipoTD ? (
                  <div className="errinfo">{errsfield.tipoTD}</div>
                ) : null}
                <div className="fieldsFecContiner mt-3">
                  <label style={{ minWidth: "170px", fontWeight: "700" }}>
                    Fecha Salida
                  </label>
                  <div className="uphistfieldContainer mb-2 no-focus">
                    <input
                      id="dayFE"
                      type="text"
                      value={fecExit.dayFE}
                      maxLength={2}
                      disabled={true}
                      onChange={(e) => handleNumberChange(e)}
                    />
                    <span>/</span>
                    <input
                      id="mounthFE"
                      type="text"
                      value={fecExit.mounthFE}
                      maxLength={2}
                      disabled={true}
                      onChange={(e) => handleNumberChange(e)}
                    />
                    <span>/</span>
                    <input
                      id="yearFE"
                      type="text"
                      value={fecExit.yearFE}
                      maxLength={4}
                      disabled={true}
                      onChange={(e) => handleNumberChange(e)}
                    />
                    <img
                      className="iconouphistInput"
                      src={`iconos/Black/cerrar.png`}
                      alt="limpiar"
                      onClick={() => {}}
                    />
                  </div>
                </div>
                <div className="fieldsFecContiner">
                  <label style={{ minWidth: "170px", fontWeight: "700" }}>
                    Fecha Entrada
                  </label>
                  <div className="uphistfieldContainer mb-2 no-focus">
                    <input
                      ref={datafields}
                      id="dayFI"
                      type="text"
                      value={fecIn.dayFI}
                      maxLength={2}
                      disabled={true}
                      onChange={(e) => handleNumberChange(e)}
                    />
                    <span>/</span>
                    <input
                      id="mounthFI"
                      type="text"
                      value={fecIn.mounthFI}
                      maxLength={2}
                      disabled={true}
                      onChange={(e) => handleNumberChange(e)}
                    />
                    <span>/</span>
                    <input
                      id="yearFI"
                      type="text"
                      value={fecIn.yearFI}
                      maxLength={4}
                      disabled={true}
                      onChange={(e) => handleNumberChange(e)}
                    />
                    <img
                      className="iconouphistInput"
                      src={`iconos/Black/cerrar.png`}
                      alt="limpiar"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>
              <div className="fieldsGap10"></div>
              <div className="fieldsCol50">
                {errsfield.planoTD ? (
                  <div className="errinfo">{errsfield.planoTD}</div>
                ) : null}
                <div ref={datafields} className="imagInputContainer">
                  <div className="imagenselContainer">
                    <ImagenConRespaldo
                      src={imgTerr}
                      fallback={"terrImg/PlanoElche.jpg"}
                      alt={`imagen territorio nuevo`}
                    />
                  </div>
                  <div className="file-select" id="src-file1">
                    <input
                      type="file"
                      name="src-file1"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
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
      </div>
    </>
  );
};

TerrrytoriesNewForm.propTypes = {};

export default TerrrytoriesNewForm;
