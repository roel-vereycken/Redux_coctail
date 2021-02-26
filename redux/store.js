import * as redux from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import counterReducer from "./counter";
import coctailReducer from "./coctail";

const rootReducer = redux.combineReducers({
  counterState: counterReducer,
  coctailState: coctailReducer,
});

const store = redux.createStore(
  rootReducer,
  redux.applyMiddleware(logger, thunk)
);

export default store;
