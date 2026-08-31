import { put, call, take, takeEvery } from "redux-saga/effects"
import { CREATE_PRODUCT, CREATE_PRODUCT_RED, DELETE_IMAGE, DELETE_IMAGE_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_ALL_PRODUCT, GET_ALL_PRODUCT_RED, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_RED, GET_PRODUCT_BY_NAME, GET_PRODUCT_BY_NAME_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_RED } from "../Constrants";
import { createRecord, deletedByName, getAllRecord, getByName, updateRecord, deleteProductImageApi, getById } from "./Services/ProductIndex";

function* createSaga(action) {
    let res = yield createRecord("/add", action.payload)
    yield put({ type: CREATE_PRODUCT_RED, payload: res })
}
function* getAllSaga() {

    let res = yield getAllRecord("/get-all")

    yield put({ type: GET_ALL_PRODUCT_RED, payload: res })
}
function* getSagaByName(action) {
    let res = yield getByName("/get", action.payload)
    yield put({ type: GET_PRODUCT_BY_NAME_RED, payload: res })
}
function* getSagaById(action) {
    let res = yield getById("/get", action.payload)
    yield put({ type: GET_PRODUCT_BY_ID_RED, payload: res })
}
function* updateSaga(action) {
    let res = yield updateRecord(`/update/${action.id}`, action.payload)
    yield put({ type: UPDATE_PRODUCT_RED, payload: res.data })
}
function* deleteSaga(action) {
    let res = yield deletedByName("/del", action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload.id })
}
export function* deleteImageSaga(action) {
    try {
        yield call(
            deleteProductImageApi,
            "/del-img",
            action.payload
        );

        yield put({
            type: DELETE_IMAGE_RED,
            payload: action.payload
        });

    } catch (error) {
        console.error("Delete image failed", error);
    }
}

export default function* ProductSaga() {
    yield takeEvery(CREATE_PRODUCT, createSaga)         //watcher
    yield takeEvery(GET_ALL_PRODUCT, getAllSaga)
    yield takeEvery(GET_PRODUCT_BY_NAME, getSagaByName)
    yield takeEvery(GET_PRODUCT_BY_ID, getSagaById)
    yield takeEvery(UPDATE_PRODUCT, updateSaga)
    yield takeEvery(DELETE_PRODUCT, deleteSaga)
    yield takeEvery(DELETE_IMAGE, deleteImageSaga)
}