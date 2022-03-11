import { combineReducers } from "redux";
import shellReducer from "./shell-reducer";
import bundleReducer from "./bundle-reducer";

const reducers = combineReducers({
  shells: shellReducer,
  bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
