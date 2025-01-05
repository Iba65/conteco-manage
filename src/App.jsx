import React, { useEffect, useState } from "react";
import "./App.css";
import "./general.css";
import { TerryProvider } from "./commons/context/territorios/TerryContext.jsx";
import { LibreriaProvider } from "./commons/libraray/context/LibreriaContext.jsx";
import { GeneralProvider } from "./commons/context/GeneralContext.jsx";
import Home from "./pages/Home";
import LayoutApp from "./pages/LayoutApp.jsx";

function App() {
  return (
    <GeneralProvider>
      <LibreriaProvider>
        <TerryProvider>
          <LayoutApp>
            <Home />
          </LayoutApp>
        </TerryProvider>
      </LibreriaProvider>
    </GeneralProvider>
  );
}

export default App;
