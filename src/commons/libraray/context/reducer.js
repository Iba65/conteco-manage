const reducer = (state, action) => {
  switch (action.type) {
    case "FIELD_ACTIVE":
      return {
        ...state,
        fieldActive: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
