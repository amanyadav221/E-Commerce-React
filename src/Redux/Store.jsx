import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from 'redux-saga';
const savedUser = JSON.parse(localStorage.getItem("user"));

import RootSaga from "./Sagas/RootSaga"
import RootReducers from "./Reducers/RootReducers";
const Saga = createSagaMiddleware()
const Store = configureStore({
    reducer: RootReducers,
    middleware: () => [Saga]
})
export default Store
Saga.run(RootSaga)