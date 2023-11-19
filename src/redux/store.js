import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import rootSaga from "./sagas/root-saga";
const sagaMiddleWare = createSagaMiddleware();
export const store = createStore(() => ({}), applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);
