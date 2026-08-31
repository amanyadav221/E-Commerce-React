import { call, put, takeEvery } from "redux-saga/effects";
import { 
    CREATE_CONTACT_US, CREATE_CONTACT_US_RED, 
    CREATE_NEWSLETTER, CREATE_NEWSLETTER_RED, 
    DELETE_CONTACT_US, DELETE_CONTACT_US_RED, 
    DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, 
    GET_ALL_CONTACT_US, GET_ALL_CONTACT_US_RED, 
    GET_ALL_NEWSLETTER, GET_ALL_NEWSLETTER_RED, 
    UPDATE_CONTACT_US, UPDATE_CONTACT_US_RED, 
    UPDATE_NEWSLETTER, UPDATE_NEWSLETTER_RED 
} from "../Constrants";
import { 
    createContactUsIndex, createNewsletterIndex, 
    deleteContactUsIndex, deleteNewsletterIndex, 
    getAllContactUsIndex, getAllNewsletterIndex, 
    updateContactUsIndex, updateNewsletterIndex 
} from "./Services/NewsletterIndex";

function* createNewsletterSaga(action) {
    let res = yield call(createNewsletterIndex, "/newsletter/create", action.payload)
    yield put({
        type: CREATE_NEWSLETTER_RED,
        payload: res
    })
}

function* getAllNewsletterSaga() {
    try {
        let res = yield call(getAllNewsletterIndex, "/newsletter/get")
        yield put({
            type: GET_ALL_NEWSLETTER_RED,
            payload: res || []
        })
    } catch (error) {
        console.log(error)
    }
}

function* createContactUsSaga(action) {
    let res = yield call(createContactUsIndex, "/contact-us/create", action.payload)
    yield put({
        type: CREATE_CONTACT_US_RED,
        payload: res
    })
}

function* updateNewsletterSaga(action) {
    let res = yield call(updateNewsletterIndex, "/newsletter/update", action.payload)
    yield put({
        type: UPDATE_NEWSLETTER_RED,
        payload: res
    })
}

function* deleteNewsletterSaga(action) {
    let res = yield call(deleteNewsletterIndex, "/newsletter/del", action.payload)
    yield put({
        type: DELETE_NEWSLETTER_RED,
        payload: action.payload
    })
}

function* getAllContactUsSaga() {
    let res = yield call(getAllContactUsIndex, "/contact-us/get")
    yield put({
        type: GET_ALL_CONTACT_US_RED,
        payload: res || []
    })
}

function* updateContactUsSaga(action) {
    let res = yield call(updateContactUsIndex, "/contact-us/update", action.payload)
    yield put({
        type: UPDATE_CONTACT_US_RED,
        payload: res
    })
}

function* deleteContactUsSage(action) {
    let res = yield call(deleteContactUsIndex, "/contact-us/del", action.payload)
    yield put({
        type: DELETE_CONTACT_US_RED,
        payload: action.payload
    })
}

export default function* NewsletterSaga() {
    yield takeEvery(CREATE_NEWSLETTER, createNewsletterSaga)
    yield takeEvery(GET_ALL_NEWSLETTER, getAllNewsletterSaga)
    yield takeEvery(CREATE_CONTACT_US, createContactUsSaga)
    yield takeEvery(UPDATE_NEWSLETTER, updateNewsletterSaga)
    yield takeEvery(DELETE_NEWSLETTER, deleteNewsletterSaga)
    yield takeEvery(GET_ALL_CONTACT_US, getAllContactUsSaga)
    yield takeEvery(UPDATE_CONTACT_US, updateContactUsSaga)
    yield takeEvery(DELETE_CONTACT_US, deleteContactUsSage)
}