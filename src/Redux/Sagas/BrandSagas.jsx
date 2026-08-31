import { put, take, takeEvery } from "redux-saga/effects"
import { CREATE_BRAND, CREATE_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_ALL_BRAND, GET_ALL_BRAND_RED, GET_BRAND_BY_NAME, GET_BRAND_BY_NAME_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constrants";
import { createRecord, deletedByName, getAllRecord, getByName, updateRecord } from "./Services/BrandIndex";

function* createSaga(action) {
    let res = yield createRecord("/add", action.payload)
    yield put({ type: CREATE_BRAND_RED, payload: res })
}
function* getAllSaga() {
    let res = yield getAllRecord("/get-all")

    yield put({ type: GET_ALL_BRAND_RED, payload: res })
}
function* getSagaByName(action) {
    let res = yield getByName("/get", action.payload)
    yield put({ type: GET_BRAND_BY_NAME_RED, payload: res })
}
function* updateSaga(action) {
    let res = yield updateRecord(`/update/${action.id}`, action.payload)
    yield put({ type: UPDATE_BRAND_RED, payload: res.data })
}
function* deleteSaga(action) {
    let res = yield deletedByName("/del", action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload.id })
}
export default function* BrandSaga() {
    yield takeEvery(CREATE_BRAND, createSaga)
    yield takeEvery(GET_ALL_BRAND, getAllSaga)
    yield takeEvery(GET_BRAND_BY_NAME, getSagaByName)
    yield takeEvery(UPDATE_BRAND, updateSaga)
    yield takeEvery(DELETE_BRAND, deleteSaga)
}