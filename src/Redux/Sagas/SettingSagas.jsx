import { put, take, takeEvery } from "redux-saga/effects"
import { CREATE_SETTING, CREATE_SETTING_RED, GET_ALL_SETTING, GET_ALL_SETTING_RED, UPDATE_SETTING, UPDATE_SETTING_RED } from "../Constrants";
import { createRecord, getAllRecord, updateRecord } from "./Services/SettingIndex";

function* createSaga(action) {
    let res = yield createRecord("/add", action.payload)
    yield put({ type: CREATE_SETTING_RED, payload: res })
}


function* getAllSaga() {
    let res = yield getAllRecord("/get-all")
    yield put({ type: GET_ALL_SETTING_RED, payload: res })
}

function* updateSaga(action) {

    let res = yield updateRecord(`/setting/update`, action.payload)
    yield put({ type: UPDATE_SETTING_RED, payload: res.data })
}

export default function* SettingSaga() {
    yield takeEvery(CREATE_SETTING, createSaga)         //watcher
    yield takeEvery(GET_ALL_SETTING, getAllSaga)
    yield takeEvery(UPDATE_SETTING, updateSaga)
}