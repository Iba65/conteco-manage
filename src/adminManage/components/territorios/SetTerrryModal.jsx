import React from "react";
import { useTerryContext } from "./../../../commons/context/territorios/TerryContext";
import { useGeneralContext } from "../../../commons/context/GeneralContext";
import {
  esFechaValida,
  getListSortHnos,
} from "./../../../commons/utils/funcionsApp";
import { getDateToday } from "./../../../commons/utils/functionsLibrary";
import AlertModal from "./../../../commons/libraray/modals/AlertModal";
import ImagenConRespaldo from "./../ImagenConRespaldo";
import SelectComponent from "./../../../commons/libraray/selectComponent/SelectComponent";

const SetTerrryModal = ({ data, functs }) => {
  const { isSemOk, getSemola } = useGeneralContext();
  const { hnosData } = useTerryContext();
  const { terSelect, imgTerr, session } = data;
  const { closeModal, setValidar } = functs;
  const [errors, setErrors] = React.useState({});
  const [selectop, setSelectop] = React.useState(300);
  const [fecExit, setFecExit] = React.useState({
    dayFE: getDateToday(true).dia,
    mounthFE: getDateToday(true).mes,
    yearFE: getDateToday(true).año,
  });
  const [lisHnosFix, setLisHnosFix] = React.useState([]);
  const [hnohasTerry, setHnohasTerry] = React.useState();
  const [listHnos, setListHnos] = React.useState([]);
  const [idDespl, setIsDespl] = React.useState(false);
  const datafields = React.useRef();

  React.useEffect(() => {
    let newlist = [];
    const result = getListSortHnos(hnosData, session, {
      getSemola,
      isSemOk,
    });
    result.map((hno) => {
      newlist.push({
        key: hno.id,
        text: `${hno.nombre} ${hno.apellidos}`,
        value: `${hno.nombre} ${
          hno.apellidos?.length > 0 ? hno.apellidos.charAt(0) : ""
        }`,
      });
    });
    setListHnos(newlist);
    setLisHnosFix(newlist);
    setHnohasTerry("");
    setSelectop(parseInt(datafields.current.getBoundingClientRect().top) + 50);
  }, [hnosData]);

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
        setFecInter({ ...fecInter, [e.target.id]: "" });
      }
      if (!regex.test(e.target.value)) {
        setFecInter({ ...fecInter, [e.target.id]: e.target.value });
      }
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

  const handleValidate = () => {
    let errs = {};
    const match = esFechaValida(
      `${fecExit.dayFE}-${fecExit.mounthFE}-${fecExit.yearFE}`
    );
    const hid = listHnos.find((hno) => hno.text === hnohasTerry);
    if (match && hnohasTerry !== "") {
      setErrors({});
      setValidar({
        date: `${fecExit.yearFE}-${fecExit.mounthFE}-${fecExit.dayFE}`,
        hno: hnohasTerry,
        hid: undefined !== hid ? hid.key : "",
      });
    } else {
      if (!match) {
        errs.date = "la fecha es incorrecta";
      }
      if (hnohasTerry === "") {
        errs.hno = "debe de seleccionar un hermano";
      }
      setErrors(errs);
    }
  };

  return (
    <AlertModal
      options={{ actionBack: false, width: 400, height: 580 }}
      data={{ title: "Entregar Territorio" }}
      functions={{
        closefunc: closeModal,
        validfunc: handleValidate,
      }}
    >
      <div className="mapContainer mt-4">
        <ImagenConRespaldo
          src={imgTerr} // URL de la imagen principal
          fallback={"terrImg/PlanoElche.jpg"} // URL de la imagen de respaldo
          alt={`imagen territorio ${terSelect.idTD}`}
          imgsize={{
            width: 340,
            height: 200,
          }}
        />
      </div>
      <div className="contenbodyExit">
        <p>
          Va a asignar el territorio <b>{terSelect.idTD}</b>. Seleccione, por
          favor, la fecha y al hermano/a al que se le entrega :
        </p>
        <div>
          <div ref={datafields} className="fieldsFecContiner">
            <label>Fecha Salida</label>
            <div className="uphistfieldContainer mb-2">
              <input
                id="dayFE"
                type="text"
                value={fecExit.dayFE}
                maxLength={2}
                onChange={(e) => handleNumberChange(e)}
              />
              <span>/</span>
              <input
                id="mounthFE"
                type="text"
                value={fecExit.mounthFE}
                maxLength={2}
                onChange={(e) => handleNumberChange(e)}
              />
              <span>/</span>
              <input
                id="yearFE"
                type="text"
                value={fecExit.yearFE}
                maxLength={4}
                onChange={(e) => handleNumberChange(e)}
              />
              <img
                className="iconouphistInput"
                src={`iconos/Black/cerrar.png`}
                alt="limpiar"
                //onClick={!disabled ? () => cleanField() : null}
              />
            </div>
          </div>

          {listHnos.length > 0 ? (
            <div>
              <SelectComponent
                name="hnohasTerry"
                type="entero"
                lista={listHnos}
                label={{
                  text: "Hno que lo trabaja",
                  align: "left",
                  posit: "left",
                  minw: 130,
                }}
                width={180}
                height={listHnos.length * 30 > 150 ? 150 : listHnos.length * 30}
                top={selectop}
                valini={hnohasTerry}
                valfin={hnohasTerry}
                object={false}
                size={15}
                disabled={false}
                setState={setHnohasTerry}
                setuplist={handleList}
                setStatelist={setIsDespl}
              />
            </div>
          ) : null}
        </div>
        {Object.keys(errors).length > 0 ? (
          <div>
            <br />
            <br />
            <p className="w100 mt-2 p-2 ml-5 bg-red-100 txt-blue-10">
              {errors.date ? `· ${errors.date}` : null}
              {Object.keys(errors).length > 1 ? <br /> : null}
              {errors.hno ? `· ${errors.hno}` : null}
            </p>
          </div>
        ) : (
          <p className="mt-5 pt-5">
            <br />
            Pulse <b>Validar</b> para asignar o <b>Cancelar</b> para anular el
            proceso.
          </p>
        )}
      </div>
    </AlertModal>
  );
};

export default SetTerrryModal;
