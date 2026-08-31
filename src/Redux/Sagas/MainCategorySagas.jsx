import { put, take, takeEvery } from "redux-saga/effects"
import { CREATE_MAINCATEGORY, CREATE_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_ALL_MAINCATEGORY, GET_ALL_MAINCATEGORY_RED, GET_MAINCATEGORY_BY_NAME, GET_MAINCATEGORY_BY_NAME_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constrants";
import { createRecord, deletedByName, getAllRecord, getByName, updateRecord } from "./Services/MainCategoryIndex";

function* createSaga(action) {
    let res = yield createRecord("/add", action.payload)
    yield put({ type: CREATE_MAINCATEGORY_RED, payload: res })
}
function* getAllSaga() {
    let res = yield getAllRecord("/get-all")

    yield put({ type: GET_ALL_MAINCATEGORY_RED, payload: res })
}
function* getSagaByName(action) {
    let res = yield getByName("/get", action.payload)
    yield put({ type: GET_MAINCATEGORY_BY_NAME_RED, payload: res })
}
function* updateSaga(action) {

    let res = yield updateRecord(`/update/${action.id}`, action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: res.data })
}
function* deleteSaga(action) {
    let res = yield deletedByName("/del", action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload.id })
}
export default function* MainCategorySaga() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)         //watcher
    yield takeEvery(GET_ALL_MAINCATEGORY, getAllSaga)
    yield takeEvery(GET_MAINCATEGORY_BY_NAME, getSagaByName)
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)
}