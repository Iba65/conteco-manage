import React, { useReducer } from "react";
import reducer from "./reducer.js";
import PropTypes from "prop-types";

export const LibreriaContext = React.createContext();

const initialState = {
  fieldActive: "",
};

export function LibreriaProvider(props) {
  const [libreriaState, libreriaDispatch] = useReducer(reducer, initialState);
  const value = React.useMemo(
    () => ({ libreriaState, libreriaDispatch }),
    [libreriaState]
  );

  return (
    <LibreriaContext.Provider value={value}>
      {props.children}
    </LibreriaContext.Provider>
  );
}

LibreriaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
