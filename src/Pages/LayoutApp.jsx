import React from "react";
import MenuPrincipal from "./MenuPrincipal";

const LayoutApp = ({ children }) => {
  return (
    <div className="appContainer">
      <MenuPrincipal />
      {children}
    </div>
  );
};

export default LayoutApp;
