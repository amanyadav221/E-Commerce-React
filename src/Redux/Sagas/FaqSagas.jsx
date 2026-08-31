import { put, take, takeEvery } from "redux-saga/effects"
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_ALL_FAQ, GET_ALL_FAQ_RED, GET_FAQ_BY_NAME, GET_FAQ_BY_NAME_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../Constrants";
import { createRecord, deletedByName, getAllRecord, getByName, updateRecord } from "./Services/FaqIndex";

function* createSaga(action) {
    let res = yield createRecord("/add", action.payload)
    yield put({ type: CREATE_FAQ_RED, payload: res })
}
function* getAllSaga() {
    let res = yield getAllRecord("/get-all")

    yield put({ type: GET_ALL_FAQ_RED, payload: res })
}
function* getSagaByName(action) {
    let res = yield getByName("/get", action.payload)
    yield put({ type: GET_FAQ_BY_NAME_RED, payload: res })
}
function* updateSaga(action) {
    let res = yield updateRecord(`/update/${action.id}`, action.payload)
    yield put({ type: UPDATE_FAQ_RED, payload: res.data })
}
function* deleteSaga(action) {

    let res = yield deletedByName("/del", action.payload)
    yield put({ type: DELETE_FAQ_RED, payload: action.payload.id })
}
export default function* FaqSaga() {
    yield takeEvery(CREATE_FAQ, createSaga)         //watcher
    yield takeEvery(GET_ALL_FAQ, getAllSaga)
    yield takeEvery(GET_FAQ_BY_NAME, getSagaByName)
    yield takeEvery(UPDATE_FAQ, updateSaga)
    yield takeEvery(DELETE_FAQ, deleteSaga)
}