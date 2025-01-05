import React from "react";
import AlertOkModal from "./../../commons/libraray/modals/AlertOkModal";

const AlertNewModal = ({ setNewuserAlert, handleCreateNewUser, name }) => {
  const handleAction = () => {
    setNewuserAlert(false);
    handleCreateNewUser();
  };
  return (
    <AlertOkModal
      options={{ actionBack: false, width: 400, height: 580 }}
      data={{ title: "Alerta de Uso" }}
      functions={{
        closefunc: setNewuserAlert,
        validfunc: handleAction,
      }}
    >
      <div className="contenbody">
        <p>Estimad@ {name}:</p>
        <p>
          Se esta dando de alta como usuario de la aplicacion{" "}
          <b>
            <code>GESTOR TERRITORIOS</code>
          </b>
          . Antes de poder usar la aplicación necesita el permiso del
          administrador. Espere a recibir una correo de confirmación para tener
          permiso de acceso a la aplicación. Para ello deberá de haber
          especificado un correo que exista.
        </p>
        <p>
          De no recibir un correo en unos días, como maximo, pongase en contacto
          con el adminitrador al 634447321.
        </p>
        <p>
          Una vez reciba el correo podrá usar su usuario y contraseña, indicado
          al crear la cuenta, para acceder.
        </p>
        <p className="mt-5 pt-3 ml-5">Muchas gracias por su comprensión.</p>
      </div>
    </AlertOkModal>
  );
};

export default AlertNewModal;
