import { put, takeEvery } from "redux-saga/effects"
import { ADD_CART_ITEM, ADD_CART_ITEM_RED, GET_MY_CART, GET_MY_CART_RED, ADD_WISHLIST_RED, ADD_WISHLIST, GET_ALL_WISHLIST_RED, GET_ALL_WISHLIST, DELETE_WISHLIST_RED, DELETE_WISHLIST, DELETE_CART_ITEM, DELETE_CART_ITEM_RED, CREATE_CHECKOUT, CREATE_CHECKOUT_RED, DELETE_CART_ITEM_BY_PRODUCT_ID, GET_ALL_CHECKOUT, GET_ALL_CHECKOUT_RED, UPDATE_CART_ITEM_RED, UPDATE_CART_ITEM, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED, CREATE_TESTIMONIAL_RED, CREATE_TESTIMONIAL, GET_TESTIMONIAL_BY_NAME, GET_TESTIMONIAL_BY_NAME_RED, UPDATE_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONAIL_BY_PRODUCT_ID_RED, GET_TESTIMONAIL_BY_PRODUCT_ID, GET_ALL_TESTIMONIAL_PUBLIC, GET_ALL_TESTIMONIAL_PUBLIC_RED } from "../Constrants"
import { addCartItemIndex, getMyCartIndex, addWishlistIndex, getAllWishlistIndex, deletewishlistIndex, deleteCartItemIndex, createCheckoutIndex, deleteCartItemByProductIdIndex, getAllCheckoutIndex, updateCartItemIndex, adminGetAllCheckoutIndex, updateCheckoutIndex, createTestimonialsIndex, getMyTestimonialIndex, updateMyTestimonialIndex, deleteTestimonialIndex, getTestimonialByProductIdIndex, gettingAllTestimonialPublicIndex } from "./Services/CartIndex"

function* getMySaga() {
    let res = yield getMyCartIndex("/cart/get")
    yield put({
        type: GET_MY_CART_RED,
        payload: res
    })
}
function* addCartItemSaga(action) {
    let res = yield addCartItemIndex("/cart/add", action.payload)
    yield put({
        type: ADD_CART_ITEM_RED,
        payload: res
    })
}
function* addWishlistSaga(action) {
    let res = yield addWishlistIndex("/wishlist/add", action.payload)
    yield put({
        type: ADD_WISHLIST_RED,
        payload: res
    })
}
function* getAllWishlistSaga() {
    let res = yield getAllWishlistIndex("/wishlist/get-all")
    yield put({
        type: GET_ALL_WISHLIST_RED,
        payload: res
    })
}
function* deleteWishlistSaga(action) {
    let res = yield deletewishlistIndex("/wishlist/del", action.payload)
    yield put({
        type: DELETE_WISHLIST_RED,
        payload: res
    })
}
function* deleteCartItemSaga(action) {
    let res = yield deleteCartItemIndex("/cart/del", action.payload)
    yield put({
        type: DELETE_CART_ITEM_RED,
        payload: res
    })
}
function* createCheckoutSaga(action) {
    let res = yield createCheckoutIndex("/checkout/add", action.payload)
    yield put({
        type: CREATE_CHECKOUT_RED,
        payload: res
    })
}
function* deleteCartItemByProductIdSaga(action) {
    let res = yield deleteCartItemByProductIdIndex("/cart/del/pId", action.payload)
    yield put({
        type: DELETE_CART_ITEM_RED,
        payload: res
    })
}
function* getAllCheckoutSaga() {
    let res = yield getAllCheckoutIndex("/checkout/get-all")
    yield put({
        type: GET_ALL_CHECKOUT_RED,
        payload: res
    })
}
function* adminGetAllCheckoutSaga() {
    let res = yield adminGetAllCheckoutIndex("/checkout/get-all")
    yield put({
        type: GET_ALL_CHECKOUT_RED,
        payload: res
    })
}
function* updateCartItemSaga(action) {
    let res = yield updateCartItemIndex("/cart/update", action.payload, action.itemId)
    yield put({
        type: UPDATE_CART_ITEM_RED,
        payload: res
    })
}
function* updateCheckoutSaga(action) {
    let res = yield updateCheckoutIndex("/checkout/update", action.payload, action.checkoutId)
    yield put({
        type: UPDATE_CHECKOUT_RED,
        payload: res
    })
}
function* createTestimonials(action) {
    let res = yield createTestimonialsIndex("/testimonials/add", action.payload)
    yield put({
        type: CREATE_TESTIMONIAL_RED,
        payload: res
    })
}
function* getMyTestimonialSaga() {
    let res = yield getMyTestimonialIndex("/testimonials/get")
    yield put({
        type: GET_TESTIMONIAL_BY_NAME_RED,
        payload: res
    })
}
function* updateMyTestimonialSaga(action) {
    let res = yield updateMyTestimonialIndex("/testimonials/update", action.payload)
    yield put({
        type: UPDATE_TESTIMONIAL_RED,
        payload: res
    })
}
function* deleteTestimonialSaga(action) {
    let res = yield deleteTestimonialIndex("testimonials/del", action.payload)
    yield put({
        type: DELETE_TESTIMONIAL_RED,
        payload: res
    })
}
function* getTestimonialByProductIdSaga(action) {
    let res = yield getTestimonialByProductIdIndex("/testimonials/get-by-pId", action.payload)
    yield put({
        type: GET_TESTIMONAIL_BY_PRODUCT_ID_RED,
        payload: res
    })
}
function* gettingAllTestimonialPublicSaga() {
    let res = yield gettingAllTestimonialPublicIndex("/testimonials/get-all")
    yield put({
        type: GET_ALL_TESTIMONIAL_PUBLIC_RED,
        payload: res
    })

}
export default function* CartSaga() {

    yield takeEvery(GET_MY_CART, getMySaga)
    yield takeEvery(ADD_CART_ITEM, addCartItemSaga)
    yield takeEvery(ADD_WISHLIST, addWishlistSaga)
    yield takeEvery(GET_ALL_WISHLIST, getAllWishlistSaga)
    yield takeEvery(DELETE_WISHLIST, deleteWishlistSaga)
    yield takeEvery(DELETE_CART_ITEM, deleteCartItemSaga)
    yield takeEvery(CREATE_CHECKOUT, createCheckoutSaga)
    yield takeEvery(GET_ALL_CHECKOUT, getAllCheckoutSaga)
    yield takeEvery(GET_ALL_CHECKOUT + "ADMIN", adminGetAllCheckoutSaga)
    yield takeEvery(DELETE_CART_ITEM_BY_PRODUCT_ID, deleteCartItemByProductIdSaga)
    yield takeEvery(UPDATE_CART_ITEM, updateCartItemSaga)
    yield takeEvery(UPDATE_CHECKOUT, updateCheckoutSaga)
    yield takeEvery(CREATE_TESTIMONIAL, createTestimonials)
    yield takeEvery(GET_TESTIMONIAL_BY_NAME, getMyTestimonialSaga)
    yield takeEvery(UPDATE_TESTIMONIAL, updateMyTestimonialSaga)
    yield takeEvery(DELETE_TESTIMONIAL, deleteTestimonialSaga)
    yield takeEvery(GET_TESTIMONAIL_BY_PRODUCT_ID, getTestimonialByProductIdSaga)
    yield takeEvery(GET_ALL_TESTIMONIAL_PUBLIC, gettingAllTestimonialPublicSaga)
}     