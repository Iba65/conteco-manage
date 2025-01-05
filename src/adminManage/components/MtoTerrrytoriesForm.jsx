import React from "react";
import "./../../general.css";
import { useTerryContext } from "./../../commons/context/territorios/TerryContext";
import { invertirFecha } from "./../../commons/utils/functionsLibrary";
import { getUserByKey } from "./../../commons/utils/funcionsApp";
import InputBisComponent from "./../../commons/libraray/inputBisComponent/InputBisComponent";
import InputComponent from "./../../commons/libraray/inputComponent/InputComponent";
import RadioButtonComponent from "./../../commons/libraray/radioButtonComponent/RadioButtonComponent";
import CheckBoxComponent from "./../../commons/libraray/checkBoxComponent/CheckBoxComponent";
import ButtonGroup from "./../../commons/libraray/buttons/ButtonGroup";
import ImagenConRespaldo from "./ImagenConRespaldo";
import UpdateHistoricModal from "./UpdateHistoric/UpdateHistoricModal";
//import HistoricTerryView from "./HistoricTerryView";
//import PropTypes from "prop-types";

const grupsTerr = [
  {
    idGT: 1,
    descGT: "Territorio de Ciudad",
    coiGT: "ciudad",
  },
  {
    idGT: 2,
    descGT: "Territorio de Negocios",
    coiGT: "tienda",
  },
  {
    idGT: 3,
    descGT: "Territorio de Campo",
    coiGT: "campo",
  },
];

const getGT = (data, id) => {
  const res = data.find((elem) => elem.idGT === id);
  if (undefined !== res) {
    return res;
  } else {
    return {
      idGT: 0,
      descGT: "",
      coiGT: "mapa",
    };
  }
};
const getImg = (tipoter, indice) => {
  if (tipoter === 1) {
    return `terrImg/casa/C${indice.toString().padStart(3, "0")}A4.jpg`;
  }
  if (tipoter === 2) {
    return `terrImg/campo/E${indice.toString().padStart(3, "0")}A4.jpg`;
  }
  if (tipoter === 3) {
    return `terrImg/negocio/N${indice.toString().padStart(3, "0")}A4.jpg`;
  }
};

const buildLocalData = (data, hist, zona, setImgTerr) => {
  const imgt = getImg(zona, data.territorio);
  setImgTerr(imgt);
  return {
    idTD: `${data.type}${data.territorio.toString().padStart(3, "0")}`,
    grupoTD: zona,
    descTD: "",
    tipoTD: data.tipo,
    stateTD: data.Fecha_Salida !== "",
    idhnohasTd:
      data.Asignado !== "" ? getUserByKey("nombre", data.Asignado).id : "",
    hnohasTD: data.Asignado !== "" ? data.Asignado : "",
    fecstateTD:
      data.Fecha_Salida !== ""
        ? data.Fecha_Salida
        : hist[hist.length - 1].fecentHTD,
    planoTD: imgt,
    historiTD:
      data.Fecha_Salida !== ""
        ? [
            {
              idHTD: `${data.type}${data.territorio
                .toString()
                .padStart(3, "0")}${data.Fecha_Salida.replaceAll("-", "")}`,
              hnohasHTD: data.Asignado,
              fecsalHTD: data.Fecha_Salida,
              fecentHTD: "",
            },
          ]
        : [],
    hisgenTD: {},
  };
};
const buildHistoricData = (data, histor) => {
  const newArray = histor;
  if (data.Fecha_Salida === "") {
    return histor;
  }
  const isInData = histor.find(
    (elem) =>
      elem.idHTD ===
      `${data.type}${data.territorio
        .toString()
        .padStart(3, "0")}${data.Fecha_Salida.replaceAll("-", "")}`
  );
  if (undefined === isInData) {
    newArray.push({
      idHTD: `${data.type}${data.territorio
        .toString()
        .padStart(3, "0")}${data.Fecha_Salida.replaceAll("-", "")}`,
      hnohasHTD: data.Asignado,
      fecsalHTD: data.Fecha_Salida,
      fecentHTD: "",
    });
  }
  return newArray;
};

const MtoTerrrytoriesForm = ({
  mergeData,
  historData,
  indi,
  setMenu,
  setIndi,
  getLong,
}) => {
  const { terryState, updateTerryData } = useTerryContext();
  const [uphisModal, setUphisModal] = React.useState(false);
  const [zona, setZona] = React.useState("mapa");
  const [tipoter, setTipoter] = React.useState(1);
  const [longmax, setLongmax] = React.useState(0);
  const [histSelect, setHistSelect] = React.useState(0);
  const [imgTerr, setImgTerr] = React.useState("terrImg/PlanoElche.jpg");
  const [nomHno, setNomHno] = React.useState("");
  const [historic, setHistoric] = React.useState([]);
  const [stadistic, setStatistic] = React.useState({
    canEnt: 0,
    hnoUse: 0,
    minDides: 0,
    maxDides: 0,
    canEntSer: 0,
    hnoUseSer: 0,
    minDidesSer: 0,
    maxDidesSer: 0,
  });
  const [territory, setTerritory] = React.useState({
    idTD: "",
    grupoTD: 1,
    descTD: "",
    tipoTD: 1,
    stateTD: false,
    idhnohasTd: "",
    hnohasTD: "",
    fecstateTD: "",
    planoTD: "",
    historiTD: [],
    hisgenTD: {},
  });
  const modal = React.useRef();

  React.useEffect(() => {
    //console.log(territory);
  }, [territory]);
  React.useEffect(() => {
    //console.log(terryState);
  }, [terryState]);
  React.useEffect(() => {
    if (tipoter > 0) {
      setZona(getGT(grupsTerr, tipoter).coiGT);
      setTerritory({ ...territory, grupoTD: tipoter });
      switch (tipoter) {
        case 1:
          setTerritory(
            buildLocalData(mergeData.casa, historData.casa, tipoter, setImgTerr)
          );
          setHistoric(buildHistoricData(mergeData.casa, historData.casa));
          setLongmax(mergeData.casa.long);
          break;
        case 2:
          if (undefined === mergeData.negocio) {
            setIndi(1);
            setLongmax(getLong("negocio"));
            break;
          }
          setTerritory(
            buildLocalData(
              mergeData.negocio,
              historData.negocio,
              tipoter,
              setImgTerr
            )
          );
          setHistoric(buildHistoricData(mergeData.negocio, historData.negocio));
          setLongmax(mergeData.negocio.long);
          break;
        case 3:
          if (undefined === mergeData.campo) {
            setIndi(1);
            setLongmax(getLong("campo"));
            break;
          }
          setTerritory(
            buildLocalData(
              mergeData.campo,
              historData.campo,
              tipoter,
              setImgTerr
            )
          );
          setHistoric(buildHistoricData(mergeData.campo, historData.campo));
          setLongmax(mergeData.campo.long);
          break;
        default:
          break;
      }
    }
  }, [tipoter]);
  React.useEffect(() => {
    //if (indi > longmax) setIndi(longmax);
    //if (indi < 1) setIndi(1);
    switch (tipoter) {
      case 1:
        setTerritory(
          buildLocalData(mergeData.casa, historData.casa, tipoter, setImgTerr)
        );
        setHistoric(buildHistoricData(mergeData.casa, historData.casa));
        break;
      case 2:
        setTerritory(
          buildLocalData(
            mergeData.negocio,
            historData.negocio,
            tipoter,
            setImgTerr
          )
        );
        setHistoric(buildHistoricData(mergeData.negocio, historData.negocio));
        break;
      case 3:
        setTerritory(
          buildLocalData(mergeData.campo, historData.campo, tipoter, setImgTerr)
        );
        setHistoric(buildHistoricData(mergeData.campo, historData.campo));
        break;
      default:
        break;
    }
  }, [mergeData]);

  React.useEffect(() => {
    if (territory.hnohasTD !== "") {
      setNomHno(territory.hnohasTD);
    } else {
      setNomHno("");
    }
  }, [territory.idhnohasTd]);

  const updateHistoricData = (indice) => {
    setHistSelect(indice);
    setUphisModal(true);
  };
  const handleFormButton = (evento) => {
    if (evento === "aceptar") {
      let fecup = territory.fecstateTD;
      if (!territory.stateTD) {
        fecup = historic[historic.length - 1].fecentHTD;
      }
      const saveTerry = {
        ...territory,
        fecstateTD: fecup,
        historiTD: historic,
      };
      updateTerryData(saveTerry);
    }
    if (evento === "cancelar") {
      setZona("mapa");
      setTipoter(1);
      setLongmax(0);
      setImgTerr("terrImg/PlanoElche.jpg");
      setNomHno("");
      setTerritory({
        idTD: "",
        grupoTD: 1,
        descTD: "",
        tipoTD: 1,
        stateTD: false,
        idhnohasTd: "",
        hnohasTD: "",
        fecstateTD: "",
        planoTD: "",
        historiTD: [],
        hisgenTD: {},
      });
      setMenu(0);
    }
    if (evento === "anterior") {
      setIndi(indi - 1 > 0 ? indi - 1 : indi);
    }
    if (evento === "siguiente") {
      setIndi(indi + 1 <= longmax ? indi + 1 : indi);
    }
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
            <h1>Gestion Territorios</h1>
            <img
              className="icono-small w40"
              src="iconos/Black/cerrarBoton.png"
              alt="menu"
              onClick={() => setMenu(0)}
            />
          </div>
          <div className="formBody">
            <div className="upperContiner"></div>
            <div className="fieldsColsContiner">
              <div className="fieldsCol50">
                <div className="intianDataContainer">
                  <div className="fieldataFix">
                    <label>Codigo:&nbsp;</label>
                    <span>{territory.idTD}</span>
                  </div>
                  <div className="fieldataFix">
                    <label>Grupo: </label>
                    <span>{` (${
                      getGT(grupsTerr, territory.grupoTD).idGT
                    })`}</span>
                    <div>
                      <img
                        className="icono-xs"
                        src={`iconos/${zona}.png`}
                        alt="menu"
                      />
                      <span>{getGT(grupsTerr, territory.grupoTD).descGT}</span>
                    </div>
                  </div>
                </div>
                <div className="customFieldContiner mt-5">
                  <RadioButtonComponent
                    name="tipoter"
                    label={{
                      text: "Tipo territorio a ver",
                      align: "left",
                      posit: "left",
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
                    position="Column"
                    disabled={false}
                    setState={setTipoter}
                  />
                </div>
                <div className="customFieldContiner mt-3">
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
                <div className="customFieldContiner mt-3">
                  <RadioButtonComponent
                    name="tipoTD"
                    label={{
                      text: "Valoración",
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
                <div className="customFieldContinerCol mt-3">
                  <div className="customFieldContiner mr-10">
                    <CheckBoxComponent
                      name="stateTD"
                      label={{
                        text: "Activo",
                        align: "left",
                        posit: "left",
                        minw: 15,
                      }}
                      valini={territory.stateTD}
                      valfin={territory.stateTD}
                      position="right"
                      disabled={false}
                      setState={setTerritory}
                    />
                  </div>
                  <div className="customFieldContiner ml-2">
                    <InputBisComponent
                      name="fecstateTD"
                      label={{
                        text: !territory.stateTD
                          ? "Fecha de entrada"
                          : "Fecha de salida",
                        align: "left",
                        posit: "left",
                        minw: 110,
                      }}
                      valini={
                        territory.fecstateTD !== ""
                          ? invertirFecha(territory.fecstateTD)
                          : ""
                      }
                      width={65}
                      size={6}
                      marl={20}
                      disabled={true}
                      foco={false}
                      setState={setTerritory}
                      invertirFecha={invertirFecha}
                    />
                  </div>
                </div>
                <div className="fieldsColsContiner mt-3">
                  <div className="fieldsCol45 mw-230">
                    <InputComponent
                      name="idhnohasTd"
                      label={{
                        text: "Hno que lo trabaja",
                        align: "left",
                        posit: "left",
                        minw: 150,
                      }}
                      valini={territory.idhnohasTd}
                      width={55}
                      size={1}
                      disabled={false}
                      foco={false}
                      setState={setTerritory}
                    />
                  </div>
                  <div className="fieldsCol55">
                    <div className="customFieldContiner">
                      <InputComponent
                        name="nomHno"
                        label={{
                          text: "",
                          align: "left",
                          posit: "left",
                          minw: 1,
                        }}
                        object={false}
                        valini={nomHno}
                        width={260}
                        size={30}
                        disabled={true}
                        foco={false}
                        setState={setNomHno}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="fieldsGap10"></div>
              <div className="fieldsCol50">
                <div className="imagInputContainer">
                  <div className="imagenselContainer">
                    <ImagenConRespaldo
                      src={imgTerr} // URL de la imagen principal
                      fallback={"terrImg/PlanoElche.jpg"} // URL de la imagen de respaldo
                      alt={`imagen territorio ${indi}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  icono: {
                    position: "left",
                    url: "iconos/Black/retrocedes.png",
                    classi: "icono-xs mr-2",
                  },
                  label: {
                    text: "Anterior",
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
                {
                  icono: {
                    position: "right",
                    url: "iconos/Black/avanzas.png",
                    classi: "icono-xs mr-2",
                  },
                  label: {
                    text: "Siguiente",
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

MtoTerrrytoriesForm.propTypes = {};

export default MtoTerrrytoriesForm;
