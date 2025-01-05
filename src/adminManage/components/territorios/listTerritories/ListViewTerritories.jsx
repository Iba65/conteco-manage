import React from "react";
import ListTerriHeader from "./ListTerriHeader";
import { getDateToday } from "./../../../../commons/utils/functionsLibrary";
import ListTerriLine from "./ListTerriLine";
import ArchiveModal from "./../ArchiveModal";
import SetTerrryModal from "./../SetTerrryModal";

const ListViewTerritories = ({
  lisTerry,
  setArchive,
  handleAction,
  session,
  hnosData,
}) => {
  //const { terryState, terryData, setArchive } = React.useContext(TerryContext);
  const [qact, setQact] = React.useState("");
  const [imgTerr, setImgTerr] = React.useState("terrImg/PlanoElche.jpg");
  const [rejectDate, setRejectDate] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [archiModal, setArchiModal] = React.useState(false);
  const [seterModal, setSeterModal] = React.useState(false);
  const [terSelect, setTerSelect] = React.useState(0);

  const archiveTerritory = (action, data) => {
    setTerSelect(data);
    setImgTerr(data.planoTD);
    setQact(action);
    if (action === "archivar") {
      setArchiModal(true);
    }
    if (action === "asignar") {
      setSeterModal(true);
    }
  };
  const closeModal = () => {
    if (qact === "archivar") {
      setArchiModal(false);
      setRejectDate(false);
      setSelectedDate("");
    }
    if (qact === "asignar") {
      setSeterModal(false);
    }
  };

  const setValidar = (data = {}) => {
    if (qact === "archivar") {
      let daten = "";
      if (rejectDate) {
        if (selectedDate === "") return;
        daten = selectedDate.replaceAll("/", "-");
      } else {
        daten = getDateToday();
      }
      setArchiModal(false);
      setRejectDate(false);
      setSelectedDate("");
      setArchive("archivar", terSelect, daten);
    }
    if (qact === "asignar") {
      if (Object.keys(data).length > 0) {
        setSeterModal(false);
        setArchive(
          "asignar",
          { idTD: terSelect.idTD, hnoTD: data.hid !== "" ? data.hid : data.hno },
          data.date
        );
      }
    }
  };
  return (
    <>
      <div className="headerContainer">
        <ListTerriHeader />
      </div>
      <div className="dataContainer">
        {lisTerry.length > 0
          ? lisTerry.map((lit, index) => (
              <ListTerriLine
                key={lit.idTD}
                data={lit}
                index={index}
                lon={lisTerry.length}
                archiveTerritory={archiveTerritory}
                handleAction={handleAction}
                session={session}
                hnosData={hnosData}
              />
            ))
          : null}
      </div>
      {archiModal ? (
        <ArchiveModal
          data={{
            terSelect,
            imgTerr,
            rejectDate,
            selectedDate,
          }}
          functs={{
            closeModal,
            setValidar,
            setRejectDate,
            setSelectedDate,
          }}
        />
      ) : null}
      {seterModal ? (
        <SetTerrryModal
          data={{
            terSelect,
            imgTerr,
            session
          }}
          functs={{
            closeModal,
            setValidar,
          }}
        />
      ) : null}
    </>
  );
};

export default ListViewTerritories;
