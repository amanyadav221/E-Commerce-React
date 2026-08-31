import { all } from "redux-saga/effects";
import MainCategorySaga from "./MainCategorySagas";
import SubCategorySaga from "./SubCategorySagas";
import BrandSaga from "./BrandSagas";
import FaqSaga from "./FaqSagas";
import FeatureSaga from "./FeatureSagas";
import ProductSaga from "./ProductSagas";
import SettingSaga from "./SettingSagas";
import SecurityCheckSaga from "./SecurityCheckSaga";
import CartSaga from "./CartSaga";
import NewsletterSaga from "./NewsletterSaga";
export default function* RootSaga() {
    yield all([
        MainCategorySaga(),
        SubCategorySaga(),
        BrandSaga(),
        FaqSaga(),
        FeatureSaga(),
        ProductSaga(),
        SettingSaga(),
        SecurityCheckSaga(),
        CartSaga(),
        NewsletterSaga(),
    ])
}