import React from "react";
import "./../../../UpdateHistoric.css";
import { usuarios } from "./../../../commons/utils/fixed";
import SelectComponent from "./../../../commons/libraray/selectComponent/SelectComponent";
import ButtonGroup from "./../../../commons/libraray/buttons/ButtonGroup";

const UpdateHistoricModal = ({
  territory,
  historic,
  indi,
  setUphisModal,
  setHistoric,
}) => {
  const [fecExit, setFecExit] = React.useState({
    dayFE: "",
    mounthFE: "",
    yearFE: "",
  });
  const [fecInter, setFecInter] = React.useState({
    dayFI: "",
    mounthFI: "",
    yearFI: "",
  });
  const [lisHnosFix, setLisHnosFix] = React.useState([]);
  const [hnohasTerry, setHnohasTerry] = React.useState();
  const [listHnos, setListHnos] = React.useState([]);
  const [idDespl, setIsDespl] = React.useState(false);
  const modal = React.useRef();
  //console.log(territory, historic, indi);

  React.useEffect(() => {
    let newlist = [];
    usuarios.map((hno) => {
      newlist.push({
        key: hno.id,
        text: hno.nombre,
        value: hno.nombre,
      });
    });
    setListHnos(newlist);
    setLisHnosFix(newlist);
  }, [usuarios]);
  React.useEffect(() => {
    historic.map((lih, index) => {
      if (index === indi) {
        setFecExit({
          dayFE: lih.fecsalHTD.substring(8),
          mounthFE: lih.fecsalHTD.substring(5, 7),
          yearFE: lih.fecsalHTD.substring(0, 4),
        });
        setFecInter({
          dayFI: lih.fecentHTD.substring(8),
          mounthFI: lih.fecentHTD.substring(5, 7),
          yearFI: lih.fecentHTD.substring(0, 4),
        });
        setHnohasTerry(lih.hnohasHTD);
      }
    });
  }, [historic]);

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
  const handleFormButton = (evento) => {
    if (evento === "aceptar") {
      // crear funcion de validar y si cambia fecha salida cambiar id por nuevo id de fecha salida
      if (fecExit.length >= 8 && fecInter.length >= 8 && hnohasTerry !== "") {
        const newHist = setHistoric.map((his, index) => {
          if (index === indi) {
            return {
              idHTD: his.idHTD,
              fecsalHTD: `${fecExit.yearFE}-${fecExit.mounthFE}-${fecExit.dayFE}`,
              fecentHTD: `${fecInter.yearFI}-${fecInter.mounthFI}-${fecInter.dayFI}`,
              hnohasHTD: hnohasTerry,
            };
          } else {
            return his;
          }
        });
        setHistoric(newHist);
      }
    }
    if (evento === "cancelar") {
    }
    setUphisModal(false);
  };
  return (
    <div className="uphistFormContiner">
      <div ref={modal} className={idDespl ? "uphistForm" : "uphistFormShort"}>
        <div className="uphistformHeader">
          <img
            className="icono-small"
            src="iconos/Black/abrirMenu.png"
            alt="menu"
          />
          <h1>Edicion de historico</h1>
          <img
            className="icono-small w40"
            src="iconos/Black/cerrarBoton.png"
            alt="menu"
            onClick={() => setUphisModal(false)}
          />
        </div>
        <div className={idDespl ? "uphistformBody" : "uphistformBodyShort"}>
          <div className="fieldsFecContiner">
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
          <div className="fieldsFecContiner">
            <label>Fecha Entrada</label>
            <div className="uphistfieldContainer">
              <input
                id="dayFI"
                type="text"
                value={fecInter.dayFI}
                maxLength={2}
                onChange={(e) => handleNumberChange(e)}
              />
              <span>/</span>
              <input
                id="mounthFI"
                type="text"
                value={fecInter.mounthFI}
                maxLength={2}
                onChange={(e) => handleNumberChange(e)}
              />
              <span>/</span>
              <input
                id="yearFI"
                type="text"
                value={fecInter.yearFI}
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
          <div className="customFieldContiner">
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
              top={83}
              valini={hnohasTerry}
              valfin={hnohasTerry}
              object={false}
              size={15}
              disabled={false}
              setState={setHnohasTerry}
              setuplist={handleList}
              setStatelist={setIsDespl}
            />
            <div className="marginSpace"></div>
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
  );
};

export default UpdateHistoricModal;
