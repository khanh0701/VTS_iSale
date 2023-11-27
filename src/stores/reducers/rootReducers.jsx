import appReducer from "./appReducers";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import authReducer from "./authReducers";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whilelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(authConfig, authReducer),
});
export default rootReducer;
