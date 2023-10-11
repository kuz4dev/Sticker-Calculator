import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import stickerReducer from "./stickerReducer";

const reducers = combineReducers({
    sticker: stickerReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware()));
window.__store__ = store;

export default store;