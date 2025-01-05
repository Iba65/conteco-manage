import React from "react";
import { useTerryContext } from "./../../../commons/context/territorios/TerryContext";
import ListGenTerritories from "./listTerritories/ListGenTerritories";
import TerrrytoriesNewForm from "./formTerrys/TerrrytoriesNewForm";
import TerrrytoriesEditForm from "./formTerrys/TerrrytoriesEditForm";

const getTerryData = (indice, data) => {
  const findata = data.find((ter) => ter.idTD === indice);
  if (undefined !== findata) return findata;
  return {};
};
const TerritoriesComponent = ({ session }) => {
  const { hnosData, terryState, setArchive } = useTerryContext();
  //const [delUserModal, setDelUserModal] = React.useState(false);
  //const [userObjData, setUserObjData] = React.useState(initUser);
  const [modView, setModView] = React.useState(0);
  const [terryDataSel, setTerryDataSel] = React.useState();

  const handleAction = (ind, action) => {
    setTerryDataSel(getTerryData(ind, terryState));
    setModView(action);
  };

  return (
    <>
      <div className="GeneralListContiner">
        {modView === 0 ? (
          <ListGenTerritories
            terryState={terryState}
            hnosData={hnosData}
            setArchive={setArchive}
            session={session}
            handleAction={handleAction}
          />
        ) : null}
        {modView === 1 ? (
          <TerrrytoriesNewForm hnosData={hnosData} setModView={setModView} />
        ) : null}
        {modView === 2 ? (
          <TerrrytoriesEditForm
            terryDataSel={terryDataSel}
            hnosData={hnosData}
            setModView={setModView}
          />
        ) : null}
        {/*modView === 2 ? (
          <UsersManageForm
            session={session}
            terryDataSel={terryDataSel}
            userObjData={userObjData}
            setModView={setModView}
            setUserObjData={setUserObjData}
          />
        ) : null}
        {delUserModal ? (
          <DelUserModal
            TerryDataSel={TerryDataSel}
            setDelUserModal={setDelUserModal}
            setdelUser={setdelUser}
          />
        ) : null */}
      </div>
    </>
  );
};

export default TerritoriesComponent;
