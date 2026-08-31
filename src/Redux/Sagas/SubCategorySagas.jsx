import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_ALL_SUBCATEGORY, GET_ALL_SUBCATEGORY_RED, GET_SUBCATEGORY_BY_NAME, GET_SUBCATEGORY_BY_NAME_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constrants";
import { createRecord, deletedByName, getAllRecord, getByName, updateRecord } from "./Services/SubCategoryIndex";

function* createSaga(action) {
    let res = yield createRecord("/add", action.payload)
    yield put({ type: CREATE_SUBCATEGORY_RED, payload: res })
}
function* getAllSaga() {
    let res = yield getAllRecord("/get-all")
    yield put({ type: GET_ALL_SUBCATEGORY_RED, payload: res })
}
function* getSagaByName(action) {
    let res = yield getByName("/get", action.payload)
    yield put({ type: GET_SUBCATEGORY_BY_NAME_RED, payload: res })
}
function* updateSaga(action) {
    let res = yield updateRecord(`/update/${action.id}`, action.payload)
    console.log(res)
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: res.data })
}
function* deleteSaga(action) {
    let res = yield deletedByName("/del", action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload.id })
}
export default function* SubCategorySaga() {
    yield takeEvery(CREATE_SUBCATEGORY, createSaga)         //watcher
    yield takeEvery(GET_ALL_SUBCATEGORY, getAllSaga)
    yield takeEvery(GET_SUBCATEGORY_BY_NAME, getSagaByName)
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)
}