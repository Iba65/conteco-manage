import React from "react";
import "./../../../../general.css";
import { useTerryContext } from "./../../../../commons/context/territorios/TerryContext";
//import { invertirFecha } from "./../../../commons/utils/functionsLibrary";
import { getDateToday } from "./../../../../commons/utils/functionsLibrary";
import { initTer } from "./../../../../commons/utils/fixed";
import {
  extractDate,
  validarEditTer,
  getArea,
} from "./../../../../commons/utils/funcionsApp";
import InputComponent from "./../../../../commons/libraray/inputComponent/InputComponent";
import RadioButtonComponent from "./../../../../commons/libraray/radioButtonComponent/RadioButtonComponent";
import SelectComponent from "./../../../../commons/libraray/selectComponent/SelectComponent";
import ButtonGroup from "./../../../../commons/libraray/buttons/ButtonGroup";
import ImagenConRespaldo from "./../../ImagenConRespaldo";
import UpdateHistoricModal from "./../../UpdateHistoric/UpdateHistoricModal";
import HistoricTerryView from "./HistoricTerryView";

const getImgByName = (grupoTer, nameter) => {
  let imgter = "";
  if (grupoTer === 1) {
    imgter = `terrImg/casa/${nameter}`;
  }
  if (grupoTer === 2) {
    imgter = `terrImg/negocio/${nameter}`;
  }
  if (grupoTer === 3) {
    imgter = `terrImg/campo/${nameter}`;
  }
  return imgter;
};

const getZona = (codigo) => {
  if (codigo.charAt(0) === "C") return 1;
  if (codigo.charAt(0) === "N") return 2;
  if (codigo.charAt(0) === "E") return 3;
};

const TerrrytoriesEditForm = ({ terryDataSel, hnosData, setModView }) => {
  const { terryState, updateTerryData, getLongTerrByType } = useTerryContext();
  const [selectop, setSelectop] = React.useState(0);
  const [idDespl, setIsDespl] = React.useState(false);
  const [listHnos, setListHnos] = React.useState([]);
  const [hnohasTerry, setHnohasTerry] = React.useState();
  //const [zona, setZona] = React.useState("mapa");
  const [grupoTer, setGrupoTer] = React.useState(
    terryDataSel.idTD ? getZona(terryDataSel.idTD) : 0
  );
  const [fecExit, setFecExit] = React.useState({
    dayFE: terryDataSel.stateTD
      ? String(extractDate(terryDataSel.fecstateTD).dia).padStart(2, "0")
      : "",
    mounthFE: terryDataSel.stateTD
      ? String(extractDate(terryDataSel.fecstateTD).mes).padStart(2, "0")
      : "",
    yearFE: terryDataSel.stateTD
      ? String(extractDate(terryDataSel.fecstateTD).anio)
      : "",
  });
  const [fecIn, setFecIn] = React.useState({
    dayFI: !terryDataSel.stateTD
      ? String(extractDate(terryDataSel.fecstateTD).dia).padStart(2, "0")
      : "",
    mounthFI: !terryDataSel.stateTD
      ? String(extractDate(terryDataSel.fecstateTD).mes).padStart(2, "0")
      : "",
    yearFI: !terryDataSel.stateTD
      ? String(extractDate(terryDataSel.fecstateTD).anio)
      : "",
  });
  const [lisHnosFix, setLisHnosFix] = React.useState([]);

  const [imgTerr, setImgTerr] = React.useState("terrImg/PlanoElche.jpg");
  const [territory, setTerritory] = React.useState({
    idTD: terryDataSel.idTD ? terryDataSel.idTD : "",
    grupoTD: terryDataSel.grupoTD
      ? terryDataSel.grupoTD
      : getZona(terryDataSel.idTD),
    descTD: terryDataSel.descTD ? terryDataSel.descTD : "",
    tipoTD: terryDataSel.tipoTD ? terryDataSel.tipoTD : 1,
    stateTD: terryDataSel.stateTD ? terryDataSel.stateTD : false,
    idhnohasTd: terryDataSel.idhnohasTd ? terryDataSel.idhnohasTd : "",
    hnohasTD: terryDataSel.hnohasTD ? terryDataSel.hnohasTD : "",
    fecstateTD: terryDataSel.fecstateTD ? terryDataSel.fecstateTD : "",
    planoTD: terryDataSel.planoTD
      ? terryDataSel.planoTD
      : "terrImg/PlanoElche.jpg",
    historiTD: terryDataSel.historiTD ? terryDataSel.historiTD : [],
    hisgenTD: terryDataSel.hisgenTD ? terryDataSel.hisgenTD : {},
  });
  const [historic, setHistoric] = React.useState([]);
  const [histSelect, setHistSelect] = React.useState(0);
  const [errsfield, setErrsfield] = React.useState({});
  const [uphisModal, setUphisModal] = React.useState(false);
  const modal = React.useRef();
  const datafields = React.useRef();

  window.addEventListener("resize", () => {
    ajustDom();
  });

  React.useEffect(() => {
    if (Object.keys(errsfield).length > 0) {
      ajustDom();
    }
  }, [errsfield]);

  React.useEffect(() => {
    //console.log(terryDataSel);
    setTerritory({
      idTD: terryDataSel.idTD,
      grupoTD: terryDataSel.grupoTD,
      descTD: terryDataSel.descTD,
      tipoTD: terryDataSel.tipoTD,
      stateTD: terryDataSel.stateTD,
      idhnohasTd: terryDataSel.idhnohasTd,
      hnohasTD: terryDataSel.hnohasTD,
      fecstateTD: terryDataSel.fecstateTD,
      planoTD: terryDataSel.planoTD,
      historiTD: terryDataSel.historiTD,
      hisgenTD: terryDataSel.hisgenTD,
    });
    setGrupoTer(terryDataSel.grupoTD);
    if (terryDataSel.stateTD) {
      setFecExit({
        dayFE: String(extractDate(terryDataSel.fecstateTD).dia).padStart(
          2,
          "0"
        ),
        mounthFE: String(extractDate(terryDataSel.fecstateTD).mes).padStart(
          2,
          "0"
        ),
        yearFE: String(extractDate(terryDataSel.fecstateTD).anio),
      });
    } else {
      setFecIn({
        dayFI: String(extractDate(terryDataSel.fecstateTD).dia).padStart(
          2,
          "0"
        ),
        mounthFI: String(extractDate(terryDataSel.fecstateTD).mes).padStart(
          2,
          "0"
        ),
        yearFI: String(extractDate(terryDataSel.fecstateTD).anio),
      });
    }
    setImgTerr(terryDataSel.planoTD);
    setHistoric(terryDataSel.historiTD);
  }, [terryDataSel]);

  React.useEffect(() => {
    let newlist = [];
    hnosData.map((hno) => {
      newlist.push({
        key: hno.id,
        text: hno.nombre,
        value: hno.nombre,
      });
    });
    setLisHnosFix(newlist);
    setListHnos(newlist);
    setHnohasTerry("");
    const radios = document.getElementsByName("radio");
    setSelectop(
      radios[0].getBoundingClientRect().bottom -
        (modal.current.getBoundingClientRect().top + 35)
    );
  }, [hnosData]);

  React.useEffect(() => {
    if (grupoTer > 0 && grupoTer !== terryDataSel.grupoTD) {
      //setZona(getGT(grupsTerr, grupoTer).coiGT);
      setTerritory({
        ...territory,
        grupoTD: grupoTer,
      });
    }
  }, [grupoTer]);

  const ajustDom = () => {
    let plus = 35;
    if (errsfield.fecstateTD) {
      plus = -20;
    }
    const radios = document.getElementsByName("radio");
    if (undefined !== modal && undefined !== radios[0]) {
      if (
        undefined !== radios[0].getBoundingClientRect().bottom &&
        undefined !== modal.current?.getBoundingClientRect()?.top
      )
        setSelectop(
          radios[0].getBoundingClientRect().bottom -
            (modal.current.getBoundingClientRect().top + plus)
        );
    }
  };

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
  const updateHistoric = (active, datater, datenow, hno) => {
    let updated = false;
    let newHist = datater.historiTD;
    if (active) {
      if (datater.historiTD[datater.historiTD.length - 1].fecsalHTD !== datenow)
        updated = true;
      if (datater.historiTD[datater.historiTD.length - 1].hnohasHTD !== hno)
        updated = true;
    } else {
      if (datater.historiTD[datater.historiTD.length - 1].fecentHTD !== datenow)
        updated = true;
      if (datater.historiTD[datater.historiTD.length - 1].hnohasHTD !== hno)
        updated = true;
    }
    if (updated) {
      newHist = datater.historiTD.map((his, index) => {
        if (index === datater.historiTD.length - 1) {
          if (active) {
            return {
              idHTD: `${his.idHTD.slice(0, 4)}${datenow.replaceAll("-", "")}`,
              fecentHTD: "",
              fecsalHTD: datenow,
              hnohasHTD: hno,
            };
          } else {
            return {
              idHTD: his.idHTD,
              fecentHTD: datenow,
              fecsalHTD: his.fecsalHTD,
              hnohasHTD: hno,
            };
          }
        } else {
          return his;
        }
      });
    }
    return newHist;
  };
  const handleFormButton = (evento) => {
    const hoy = getDateToday();
    if (evento === "aceptar") {
      const errores = validarEditTer(territory, fecExit, fecIn, hnohasTerry);
      setErrsfield(errores);
      if (Object.keys(errores).length <= 0) {
        const datenow = territory.stateTD
          ? `${fecExit.yearFE}-${fecExit.mounthFE}-${fecExit.dayFE}`
          : `${fecIn.yearFI}-${fecIn.mounthFI}-${fecIn.dayFI}`;
        const payloadTer = {
          idTD: territory.idTD,
          descTD: territory.descTD,
          grupoTD:
            territory.grupoTD !== 0
              ? territory.grupoTD
              : getZona(territory.idTD),
          tipoTD: territory.tipoTD,
          stateTD: territory.stateTD,
          fecstateTD: datenow,
          idhnohasTd: "000",
          hnohasTD: hnohasTerry,
          planoTD: imgTerr,
          historiTD: updateHistoric(
            territory.stateTD,
            territory,
            datenow,
            hnohasTerry
          ),
          hisgenTD: territory.hisgenTD,
        };
        updateTerryData(payloadTer);
        exitEdition();
      }
    }
    if (evento === "cancelar") {
      exitEdition();
    }
  };

  const exitEdition = () => {
    setGrupoTer(3);
    setImgTerr("terrImg/PlanoElche.jpg");
    setTerritory(initTer);
    setModView(0);
  };
  const handleFileChange = (event) => {
    const [fileList] = event.target.files;
    setImgTerr(getImgByName(grupoTer, fileList.name));
    setTerritory({ ...territory, planoTD: fileList.name });
    //setFileList(newfiles);
  };

  const cleanDate = (field) => {
    if (field === "S") {
      setFecExit({
        dayFE: "",
        mounthFE: "",
        yearFE: "",
      });
    } else {
      setFecIn({
        dayFI: "",
        mounthFI: "",
        yearFI: "",
      });
    }
  };
  const handleList = (value) => {
    if (value.length > 0) {
      const newlist = lisHnosFix.filter((elem) =>
        elem.value.toLowerCase().includes(value.toLowerCase())
      );
      setListHnos(newlist);
    }
  };
  const updateHistoricData = (indice) => {
    setHistSelect(indice);
    setUphisModal(true);
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
            <h1>Editar Territorio</h1>
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
                  <div className="fieldataFix mt-2">
                    <label>Zona Territorio:&nbsp;</label>
                    {getArea(terryDataSel.grupoTD)}
                  </div>
                  <div className="fieldataFix mt-2">
                    <label>Codigo:&nbsp;</label>
                    <span>{terryDataSel.idTD}</span>
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
                    valini={terryDataSel.descTD}
                    valfin={territory.descTD}
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
                    valini={terryDataSel.tipoTD}
                    valfin={territory.tipoTD}
                    position="Row"
                    disabled={false}
                    setState={setTerritory}
                  />
                </div>
                {errsfield.tipoTD ? (
                  <div className="errinfo">{errsfield.tipoTD}</div>
                ) : null}
                {terryDataSel.stateTD && (
                  <div className="fieldsFecContiner mt-3">
                    <label style={{ minWidth: "170px", fontWeight: "700" }}>
                      Fecha Salida
                    </label>
                    <div className="uphistfieldContainer mb-2">
                      <input
                        id="dayFE"
                        type="text"
                        value={fecExit.dayFE}
                        maxLength={2}
                        disabled={!terryDataSel.stateTD}
                        onChange={(e) => handleNumberChange(e)}
                      />
                      <span>/</span>
                      <input
                        id="mounthFE"
                        type="text"
                        value={fecExit.mounthFE}
                        maxLength={2}
                        disabled={!terryDataSel.stateTD}
                        onChange={(e) => handleNumberChange(e)}
                      />
                      <span>/</span>
                      <input
                        id="yearFE"
                        type="text"
                        value={fecExit.yearFE}
                        maxLength={4}
                        disabled={!terryDataSel.stateTD}
                        onChange={(e) => handleNumberChange(e)}
                      />
                      <img
                        className="iconouphistInput"
                        src={`iconos/Black/cerrar.png`}
                        alt="limpiar"
                        onClick={() => cleanDate("S")}
                      />
                    </div>
                  </div>
                )}
                {!terryDataSel.stateTD && (
                  <div className="fieldsFecContiner mt-3">
                    <label style={{ minWidth: "170px", fontWeight: "700" }}>
                      Fecha Entrada
                    </label>
                    <div className="uphistfieldContainer mb-2">
                      <input
                        ref={datafields}
                        id="dayFI"
                        type="text"
                        value={fecIn.dayFI}
                        maxLength={2}
                        disabled={terryDataSel.stateTD}
                        onChange={(e) => handleNumberChange(e)}
                      />
                      <span>/</span>
                      <input
                        id="mounthFI"
                        type="text"
                        value={fecIn.mounthFI}
                        maxLength={2}
                        disabled={terryDataSel.stateTD}
                        onChange={(e) => handleNumberChange(e)}
                      />
                      <span>/</span>
                      <input
                        id="yearFI"
                        type="text"
                        value={fecIn.yearFI}
                        maxLength={4}
                        disabled={terryDataSel.stateTD}
                        onChange={(e) => handleNumberChange(e)}
                      />
                      <img
                        className="iconouphistInput"
                        src={`iconos/Black/cerrar.png`}
                        alt="limpiar"
                        onClick={() => cleanDate("E")}
                      />
                    </div>
                  </div>
                )}
                {errsfield.fecstateTD ? (
                  <div className="errinfo">{errsfield.fecstateTD}</div>
                ) : null}
                {listHnos.length > 0 ? (
                  <>
                    <div className="fieldsColsContiner mt-3">
                      <div>
                        <SelectComponent
                          name="hnohasTerry"
                          type="entero"
                          lista={listHnos}
                          label={{
                            text: "Hno que lo trabaja",
                            align: "left",
                            posit: "left",
                            minw: 150,
                          }}
                          width={180}
                          height={
                            listHnos.length * 30 > 150
                              ? 150
                              : listHnos.length * 30
                          }
                          top={selectop}
                          valini={terryDataSel.hnohasTD}
                          valfin={hnohasTerry}
                          object={false}
                          size={15}
                          disabled={false}
                          setState={setHnohasTerry}
                          setuplist={handleList}
                          setStatelist={setIsDespl}
                        />
                      </div>
                    </div>
                    {errsfield.hnohasTD ? (
                      <div className="errinfo">{errsfield.hnohasTD}</div>
                    ) : null}
                    <div style={{ minHeight: "50px" }}></div>
                  </>
                ) : null}
              </div>
              <div className="fieldsGap10"></div>
              <div className="fieldsCol50">
                {errsfield.planoTD ? (
                  <div className="errinfo">{errsfield.planoTD}</div>
                ) : null}
                <div ref={datafields} className="imagInputContainer">
                  <div className="imagenselContainer">
                    <ImagenConRespaldo
                      src={imgTerr} // URL de la imagen principal
                      fallback={"terrImg/PlanoElche.jpg"} // URL de la imagen de respaldo
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
              <div style={{ width: "100%" }}>
                {historic.length > 0 ? (
                  <div className="listDataContainer">
                    <div className="listHead">
                      <div className="headCodt">Id Historico</div>
                      <div className="headEstado">Estado</div>
                      <div className="headHno pl-2">Publicador/ra</div>
                      <div className="headDateSal">Fecha Salida</div>
                      <div className="headDateEnt">Fecha Entrada</div>
                      <div className="headActions">Acciones</div>
                    </div>
                    <div className="listbody">
                      {historic.map((dat, index) => (
                        <div
                          key={dat.idHTD}
                          className={
                            historic.length === index + 1
                              ? "listLine fw-500 bg-gray-10"
                              : "listLine"
                          }
                        >
                          <HistoricTerryView
                            data={dat}
                            long={historic.length}
                            indice={index}
                            updateHistoricData={updateHistoricData}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="listfooter">
                      <img
                        className="icono-s"
                        src="iconos/Acctions/adicional.png"
                        alt="crear fecha"
                      />
                    </div>
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
      {uphisModal ? (
        <UpdateHistoricModal
          territory={territory}
          historic={historic}
          indi={histSelect}
          setUphisModal={setUphisModal}
          setHistoric={setHistoric}
        />
      ) : null}
    </>
  );
};

TerrrytoriesEditForm.propTypes = {};

export default TerrrytoriesEditForm;
