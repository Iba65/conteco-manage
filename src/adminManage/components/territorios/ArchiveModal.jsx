import React from "react";
import {
  invertirFecha,
  getDateToday,
  getZona,
} from "./../../../commons/utils/functionsLibrary";
import AlertModal from "./../../../commons/libraray/modals/AlertModal";
import ImagenConRespaldo from "./../ImagenConRespaldo";

const ArchiveModal = ({ data, functs }) => {
  const { terSelect, imgTerr, rejectDate, selectedDate } = data;
  const { closeModal, setValidar, setRejectDate, setSelectedDate } = functs;
  return (
    <AlertModal
      options={{ actionBack: false, width: 400, height: 580 }}
      data={{ title: "Archivar Territorio" }}
      functions={{
        closefunc: closeModal,
        validfunc: setValidar,
      }}
    >
      <div className="contenbody">
        <p>
          Va a dar entrada al territorio <b>{terSelect.idTD}</b> con los
          siguientes datos:
        </p>
        <ul>
          <li>
            <b>Zona:</b>
            <div className="lizon">{getZona(parseInt(terSelect.grupoTD))}</div>
          </li>
          <li>
            <b>Hermano/a:</b>
            <div className="lihno">{terSelect.hnohasTD}</div>
          </li>
          <li>
            <b>Fecha Salida:</b>
            <div className="lifsa">{invertirFecha(terSelect.fecstateTD)}</div>
          </li>
          <li>
            {rejectDate ? (
              <>
                <b>Fecha Entrada:</b>
                <div className="lifen">
                  <input
                    style={{
                      fontSize: "16px",
                      fontFamily:
                        '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',
                      fontWeight: "100",
                      color: "#686767",
                    }}
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <img
                  className="icono-xs"
                  src={`iconos/Acctions/intercambio.png`}
                  onClick={() => setRejectDate(false)}
                />
              </>
            ) : (
              <>
                <b>Fecha Entrada:</b>
                <div className="lifen">{invertirFecha(getDateToday())}</div>
                <img
                  className="icono-xs"
                  src={`iconos/Acctions/intercambio.png`}
                  onClick={() => setRejectDate(true)}
                />
              </>
            )}
          </li>
        </ul>
        <p>
          Pulse <b>Validar</b> para archivar o <b>Cancelar</b> para anular el
          proceso.
        </p>
      </div>
      <div className="mapContainer">
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
    </AlertModal>
  );
};

export default ArchiveModal;
