import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import albumReducer from "./albumReducer";
import playerReducer from "./playerReducer";
import sessionReducer from "./sessionReducer";
import songReducer from "./songReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songReducer,
  player: playerReducer,
  albums: albumReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
