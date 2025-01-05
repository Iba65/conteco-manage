import React from "react";
import { useTerryContext } from "./../../../commons/context/territorios/TerryContext";
import { initUser } from "./../../../commons/utils/fixed";
import ListGenUsers from "./listUsers/ListGenUsers";
import UsersManageForm from "./formUsers/UsersManageForm";
import UsersNewForm from "./formUsers/UsersNewForm";
import DelUserModal from "./DelUserModal";
import AlertOkModal from "../../../commons/libraray/modals/AlertOkModal";
import { getUserById } from "../../../commons/utils/funcionsApp";
import {
  decryptData,
  obtenerDiaSemana,
  obtenerMesActual,
  obtenerNombreMes,
} from "../../../commons/utils/functionsLibrary";
import ListDateExhibView from "./ListDateExhibView";

const getHnoData = (indice, data) => {
  const findata = data.find((hno) => hno.id === indice);
  if (undefined !== findata) return findata;
  return {};
};
const UsersComponent = ({ session }) => {
  const { hnosData, setdelUser } = useTerryContext();
  const [modView, setModView] = React.useState(0);
  const [delUserModal, setDelUserModal] = React.useState(false);
  const [hnoDataSel, setHnoDataSel] = React.useState();
  const [nomHno, setNomHno] = React.useState("");
  const [userObjData, setUserObjData] = React.useState(initUser);
  const [infoDatexhModal, setInfoDatexhModal] = React.useState(false);
  const [hnosListDex, setHnosListDex] = React.useState([]);

  const handleAction = (ind, action) => {
    if (action === 8) {
      viewExhibDate(ind);
      return;
    }
    if (action === 9) {
      setHnoDataSel(getHnoData(ind, hnosData));
      setDelUserModal(true);
      return;
    }
    setHnoDataSel(getHnoData(ind, hnosData));
    setModView(action);
  };

  const viewExhibDate = (id) => {
    const lookforUser = getUserById(hnosData, id);
    if (Object.keys(lookforUser)) {
      setNomHno(
        decryptData(lookforUser.nombre, import.meta.env.VITE_APP_SEMILLA)
      );
      const result = lookforUser.historyExhib.filter(
        (us) => us.idHE.slice(4, -3) === obtenerMesActual()
      );
      if (result.length > 0) {
        const lisort = result.sort((a, b) => {
          return a.idHE.localeCompare(b.idHE);
        });
        const newlist = lisort.map((dat) => {
          return {
            idHE: `${obtenerDiaSemana(dat.idHE.slice(0, -1))} ${dat.idHE.slice(
              6,
              -1
            )}`,
            secdayHE: `por la ${dat.secdayHE}`,
          };
        });
        setHnosListDex(newlist);
        setInfoDatexhModal(true);
      }
    }
  };

  const handleActionAlert = () => {
    setNomHno("");
    setHnosListDex([]);
    setInfoDatexhModal(false);
  };

  return (
    <>
      <div className="GeneralListContiner">
        {modView === 0 ? (
          <ListGenUsers
            hnosData={hnosData}
            session={session}
            handleAction={handleAction}
          />
        ) : null}
        {modView === 1 ? <UsersNewForm setModView={setModView} /> : null}
        {modView === 2 ? (
          <UsersManageForm
            session={session}
            hnoDataSel={hnoDataSel}
            userObjData={userObjData}
            setModView={setModView}
            setUserObjData={setUserObjData}
          />
        ) : null}
        {delUserModal ? (
          <DelUserModal
            session={session}
            hnoDataSel={hnoDataSel}
            setDelUserModal={setDelUserModal}
            setdelUser={setdelUser}
          />
        ) : null}
        {infoDatexhModal ? (
          <AlertOkModal
            options={{ actionBack: false, width: 400, height: 330 }}
            data={{ title: "Citas para el Exhibidor" }}
            functions={{
              closefunc: setInfoDatexhModal,
              validfunc: handleActionAlert,
            }}
          >
            <div className="contenokbody">
              {hnosListDex.length > 0 ? (
                <ListDateExhibView
                  mes={obtenerNombreMes(obtenerMesActual())}
                  user={nomHno}
                  data={hnosListDex}
                />
              ) : null}
            </div>
          </AlertOkModal>
        ) : null}
      </div>
    </>
  );
};

export default UsersComponent;
