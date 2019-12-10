import { createStore } from "redux";
import rootReducer from "./reducers";

import { persistStore, persistReducer } from "redux-persist";
// import AsyncStorage from "@react-native-community/async-storage"; // expo will be switching to this lib
import { AsyncStorage } from "react-native";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: []
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export let store = createStore(persistedReducer);
export let persistor = persistStore(store);
