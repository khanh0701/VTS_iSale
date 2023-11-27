import actionTypes from "../actions/actionTypes";

const initState = {
  home: [],
  test: "hello",
  data: null,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return state;
    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };

    // case actionTypes.LOADING:
    //   return {
    //     ...state,
    //     isLoading: action.flag,
    //   };

    default:
      return state;
  }
};

export default appReducer;
