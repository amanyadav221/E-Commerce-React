import { put, take, takeEvery } from "redux-saga/effects"
import { CREATE_FEATURE, CREATE_FEATURE_RED, DELETE_FEATURE, DELETE_FEATURE_RED, GET_ALL_FEATURE, GET_ALL_FEATURE_RED, GET_FEATURE_BY_NAME, GET_FEATURE_BY_NAME_RED, UPDATE_FEATURE, UPDATE_FEATURE_RED } from "../Constrants";
import { createRecord, deletedByName, getAllRecord, getByName, updateRecord } from "./Services/FeatureIndex";

function* createSaga(action) {
    let res = yield createRecord("/add", action.payload)
    yield put({ type: CREATE_FEATURE_RED, payload: res })
}
function* getAllSaga() {
    let res = yield getAllRecord("/get-all")

    yield put({ type: GET_ALL_FEATURE_RED, payload: res })
}
function* getSagaByName(action) {
    let res = yield getByName("/get", action.payload)
    yield put({ type: GET_FEATURE_BY_NAME_RED, payload: res })
}
function* updateSaga(action) {

    let res = yield updateRecord(`/update/${action.id}`, action.payload)
    yield put({ type: UPDATE_FEATURE_RED, payload: res.data })
}
function* deleteSaga(action) {
    let res = yield deletedByName("/del", action.payload)
    yield put({ type: DELETE_FEATURE_RED, payload: action.payload.id })
}
export default function* FeatureSaga() {
    yield takeEvery(CREATE_FEATURE, createSaga)         //watcher
    yield takeEvery(GET_ALL_FEATURE, getAllSaga)
    yield takeEvery(GET_FEATURE_BY_NAME, getSagaByName)
    yield takeEvery(UPDATE_FEATURE, updateSaga)
    yield takeEvery(DELETE_FEATURE, deleteSaga)
}