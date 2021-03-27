export const initialState = {
  properties: null,
  price: null,
};

const reducer = (state, action) => {
  //   console.log(action);

  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        properties: action.properties,
      };
    default:
      return state;
  }
};

export default reducer;
