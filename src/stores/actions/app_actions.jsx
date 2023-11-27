import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setData = (data) => ({
  type: "SET_DATA",
  payload: data,
});
