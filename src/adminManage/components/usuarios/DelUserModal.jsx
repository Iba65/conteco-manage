import React from "react";
import { useGeneralContext } from "../../../commons/context/GeneralContext";
import { converData } from "../../../commons/utils/funcionsApp";
import AlertModal from "./../../../commons/libraray/modals/AlertModal";

const DelUserModal = ({ session, hnoDataSel, setDelUserModal, setdelUser }) => {
  const { isSemOk, getSemola } = useGeneralContext();
  const [hnoDatView, setHnoDatView] = React.useState({});

  React.useEffect(() => {
    const semilla = import.meta.env.VITE_APP_SEMILLA;
    const keycry = getSemola(session.seed, import.meta.env.VITE_APP_SEMILLA);
    const resConvData = converData(hnoDataSel, semilla, keycry);
    setHnoDatView(resConvData);
  }, [hnoDataSel]);

  const closeModal = () => {
    setDelUserModal(false);
  };
  const setValidar = () => {
    if (undefined !== hnoDataSel.id && hnoDataSel.id.length > 0) {
      setdelUser(hnoDataSel.id);
    }
    setDelUserModal(false);
  };
  return (
    <>
      {Object.keys(hnoDatView).length > 0 ? (
        <AlertModal
          options={{ actionBack: false, width: 400, height: 380 }}
          data={{ title: "Borrar Usuario" }}
          functions={{
            closefunc: closeModal,
            validfunc: setValidar,
          }}
        >
          <div className="contenbody">
            <p>
              Va a dar de baja al usuario <b>{hnoDatView.id}</b> con los
              siguientes datos:
            </p>
            <ul>
              <li>
                <b>Nombre Personal:</b>
                <div className="lihno">{`${hnoDatView.nombre} ${hnoDatView.apellidos}`}</div>
              </li>
              <li>
                <b>Email:</b>
                <div className="lifsa">{hnoDatView.email}</div>
              </li>
              <li>
                <b>Whatsapp:</b>
                <div className="lifsa">{hnoDatView.whatsapp}</div>
              </li>
              <li>
                <b>Usuario:</b>
                <div className="lifsa">{hnoDatView.usuario}</div>
              </li>
            </ul>
            <p>
              Pulse <b>Validar</b> para borrar usuario o <b>Cancelar</b> para
              anular el proceso.
            </p>
          </div>
        </AlertModal>
      ) : null}
    </>
  );
};

export default DelUserModal;
