import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import axios from "axios";
import * as api from "../config";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
  blacklist: ["countries", "controls", "details"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({
        client: axios,
        api,
      })
    )
  )
);

export let persistor = persistStore(store);
