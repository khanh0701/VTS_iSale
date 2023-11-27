import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const getDsDuLieu = () => async (dispatch) => {
  try {
    const response = await apis.dsDuLieu();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
