import { call, put, takeEvery } from "redux-saga/effects"
import { ADD_ADDRESS, ADD_ADDRESS_RED, DELETE_ADDRESS, DELETE_ADDRESS_RED, DELETE_USER_BY_ADMIN, DELETE_USER_BY_ADMIN_RED, GET_ADDRESS, GET_ADDRESS_RED, GET_ALL_USER, GET_ALL_USER_RED, LOGIN_USER, LOGIN_USER_RED, LOGOUT, LOGOUT_RED, REGISER_USER, REGISTER_USER_RED, UPDATE_ADDRESS, UPDATE_ADDRESS_RED, UPDATE_USER, UPDATE_USER_RED, UPDATE_USER_STATUS, UPDATE_USER_STATUS_RED, USER_INFO, USER_INFO_RED } from "../Constrants"
import { addNewAddressIndex, adminGetAllAddress, deleteAddressIndex, deleteUserByAdminIndex, getAllAddressIndex, getAllUserForAdminIndex, getUserIndex, loginUser, registerUser, updateAddressIndex, updateUserIndex, updateUserStatusIndex } from "./Services/SecurityCheckIndex"

function* registerSaga(action) {
    let res = yield call(registerUser, "/add", action.payload)
    yield put({
        type: REGISTER_USER_RED,
        payload: res
    })
}
function* loginSaga(action) {
    const res = yield call(loginUser, "/login", action.payload)
    if (res?.jwt) {
        localStorage.setItem("session", JSON.stringify({
            jwt: res.jwt,
            role: res.role,
            username: res.username,
            fullName: res.fullName
        }));
    }
    localStorage.setItem("jwt", res?.jwt || "");
    localStorage.setItem("user", JSON.stringify({
        role: res?.role || "",
        username: res?.username || ""
    }))

    yield put({
        type: LOGIN_USER_RED,
        payload: res
    })
}
function* getSagaByUsername(action) {
    let res = yield call(getUserIndex, "/get", action.payload)
    yield put({
        type: USER_INFO_RED,
        payload: res
    })
}
function* updateSaga(action) {
    let res = yield call(updateUserIndex, `/update/${action.username}`, action.payload)
    yield put({
        type: UPDATE_USER_RED,
        payload: res
    })
}
function* addNewAddressSaga(action) {
    let res = yield call(addNewAddressIndex, '/add-adrs', action.payload)
    yield put({
        type: ADD_ADDRESS_RED,
        payload: res
    })
}
function* getAllAddressSaga(action) {
    let res = yield call(getAllAddressIndex, "/get-all-adrs", action.payload)
    yield put({
        type: GET_ADDRESS_RED,
        payload: res
    })
}
function* adminGetAllAddressSaga() {
    let res = yield call(adminGetAllAddress, "/checkout/get-all-adrs")
    yield put({
        type: GET_ADDRESS_RED,
        payload: res
    })
}
function* deleteAddressSaga(action) {
    let res = yield call(deleteAddressIndex, "/del-adrs", action.payload)
    yield put({
        type: DELETE_ADDRESS_RED,
        payload: res
    })



}
function* updateAddressSaga(action) {
    let res = yield call(updateAddressIndex, "/update-adrs", action.payload, action.addressId)
    yield put({
        type: UPDATE_ADDRESS_RED,
        payload: res
    })
}
function* getAllUserSaga() {
    let res = yield call(getAllUserForAdminIndex, "/user/get-all")
    yield put({
        type: GET_ALL_USER_RED,
        payload: res
    })
}
function* updateUserStatusSaga(action) {
    let res = yield call(updateUserStatusIndex, "/user/update", action.payload, action.userId)
    yield put({
        type: UPDATE_USER_STATUS_RED,
        payload: res
    })
}
function* deleteUserByAdminSaga(action) {
    let res = yield call(deleteUserByAdminIndex, "/user/del", action.payload)
    yield put({
        type: DELETE_USER_BY_ADMIN_RED,
        payload: res
    })
}
export default function* SecurityCheckSaga() {
    yield takeEvery(REGISER_USER, registerSaga)
    yield takeEvery(LOGIN_USER, loginSaga)
    yield takeEvery(USER_INFO, getSagaByUsername)
    yield takeEvery(UPDATE_USER, updateSaga)
    yield takeEvery(ADD_ADDRESS, addNewAddressSaga)
    yield takeEvery(GET_ADDRESS, getAllAddressSaga)
    yield takeEvery(DELETE_ADDRESS, deleteAddressSaga)
    yield takeEvery(UPDATE_ADDRESS, updateAddressSaga)
    yield takeEvery("GET_ALL_ADRS_ADMIN", adminGetAllAddressSaga)
    yield takeEvery(GET_ALL_USER, getAllUserSaga)
    yield takeEvery(UPDATE_USER_STATUS, updateUserStatusSaga)
    yield takeEvery(DELETE_USER_BY_ADMIN, deleteUserByAdminSaga)
}