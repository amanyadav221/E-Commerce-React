import { combineReducers } from "@reduxjs/toolkit"
import MainCategoryReducers from "./MainCategoryReducers"
import SubCategoryReducers from "./SubCategoryReducers"
import BrandReducers from "./BrandReducers"
import FaqReducers from "./FaqReducers"
import FeatureReducers from "./FeatureReducers"
import ProductReducers from "./ProductReducers"
import SettingReducers from "./SettingReducers"
import SecurityCheckReducer from "./SecurityCheckReducer"
import loginStateReducer from "./loginStateReducer"
import AddressReducer from "./AddressReducer"
import CartReducer from "./CartReducer"
import WishlistReducer from "./WishlistReducer"
import CheckoutReducer from "./CheckoutReducer"
import NewsletterReducer from "./NewsletterReducer"
import ContactUsReducer from "./ContactUsReducer"
import GetAllUserReducer from "./GetAllUserReducer"
import TestimonialReducer from "./TestimonialReducer"
import PublicTestimonialReducer from "./PublicTestimonialReducer"
export default combineReducers({
    MainCategoryStateData: MainCategoryReducers,
    SubCategoryStateData: SubCategoryReducers,
    BrandStateData: BrandReducers,
    FaqStateData: FaqReducers,
    FeatureStateData: FeatureReducers,
    ProductStateData: ProductReducers,
    SettingStateData: SettingReducers,
    ProductImageStateData: ProductReducers,
    SecurityCheckStateData: SecurityCheckReducer,
    LoginStateData: loginStateReducer,
    AddressStateData: AddressReducer,
    CartReducerStateData: CartReducer,
    WishlistStateData:WishlistReducer,
    CheckoutStateData:CheckoutReducer,
    NewsletterStateData:NewsletterReducer,
    ContactUsStateData:ContactUsReducer,
    GetAllUserStateData:GetAllUserReducer,
    TestimonialStateData:TestimonialReducer,
    PublicTestimonialStateData:PublicTestimonialReducer,


})