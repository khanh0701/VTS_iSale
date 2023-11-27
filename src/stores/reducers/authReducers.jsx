import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false,
  token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_DSDULIEU:
      return state;

    // case actionTypes.LOADING:
    //   return {
    //     ...state,
    //     isLoading: action.flag,
    //   };

    default:
      return state;
  }
};

export default authReducer;
