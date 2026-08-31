import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import FeaturesPage from './pages/FeaturesPage'
import TestimonialPage from './pages/TestimonialPage'
import FaqPage from './pages/FaqPage'
import ContactUsPage from './pages/ContactUsPage'
import ErrorPage from './pages/ErrorPage'

import LoginPage from './pages/User/LoginPage'
import SignUpPage from './pages/User/SignUpPage'



/* ADMIN PAGES */
import AdminHomePage from './pages/Admin/AdminHomePage'
import AdminMainCategoryPage from './pages/Admin/MainCategory/AdminMainCategoryPage'
import AdminMainCategoryCreate from './pages/Admin/MainCategory/AdminMainCategoryCreate'
import AdminMainCategoryUpdate from './pages/Admin/MainCategory/AdminMainCategoryUpdate'
import AdminSubCategoryPage from './pages/Admin/SubCategory/AdminSubCategoryPage'
import AdminSubCategoryCreate from './pages/Admin/SubCategory/AdminSubCategoryCreate'
import AdminSubCategoryUpdate from './pages/Admin/SubCategory/AdminSubCategoryUpdate'
import AdminBrandPage from './pages/Admin/Brand/AdminBrandPage'
import AdminBrandCreate from './pages/Admin/Brand/AdminBrandCreate'
import AdminBrandUpdate from './pages/Admin/Brand/AdminBrandUpdate'
import AdminFeaturePage from './pages/Admin/Feature/AdminFeaturePage'
import AdminFeatureCreate from './pages/Admin/Feature/AdminFeatureCreate'
import AdminFeatureUpdate from './pages/Admin/Feature/AdminFeatureUpdate'
import AdminFaqPage from './pages/Admin/Faq/AdminFaqPage'
import AdminFaqCreate from './pages/Admin/Faq/AdminFaqCreate'
import AdminFaqUpdate from './pages/Admin/Faq/AdminFaqUpdate'
import AdminProductPage from './pages/Admin/Product/AdminProductPage'
import AdminProductCreate from './pages/Admin/Product/AdminProductCreate'
import AdminProductUpdate from './pages/Admin/Product/AdminProductUpdate'
import AdminSettingPage from './pages/Admin/Setting/AdminSettingPage'
import UserRoute from './Routes/UserRoute'
import AdminRoute from './Routes/AdminRoute'
import PublicRoute from './Routes/PublicRoute'
import ProfilePage from './pages/User/UserProfilePage'
import UserProfilePage from './pages/User/UserProfilePage'
import AdminProfilePage from './pages/Admin/Profile/AdminProfilePage'
import CartPage from './pages/User/CartPage'
import CheckoutPage from './pages/User/CheckoutPage'
import OrderConfirmation from './pages/User/OrderConfirmation'
import AdminNewsletter from './pages/Admin/Newsletter/AdminNewsletter'
import AdminContactUs from './pages/Admin/ContactUs/AdminContactUs'
import AdminCheckout from './pages/Admin/Checkout/AdminCheckout'
import AdminUserCreate from './pages/Admin/ManageUser/AdminUserCreate'
import AdminUserPage from './pages/Admin/ManageUser/AdminUserPage'
import AdminUpdateProfile from './pages/Admin/Profile/AdminUpdateProfile'

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>

        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop-page" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/testimonials" element={<TestimonialPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Route>

        {/* USER */}
        <Route element={<UserRoute />}>
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path='/confirmation' element={<OrderConfirmation />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/my-account" element={<AdminUpdateProfile />} />
          <Route path="/admin/main-category" element={<AdminMainCategoryPage />} />
          <Route path="/admin/main-category/create" element={<AdminMainCategoryCreate />} />
          <Route path="/admin/main-category/update/:id" element={<AdminMainCategoryUpdate />} />

          <Route path="/admin/sub-cat" element={<AdminSubCategoryPage />} />
          <Route path="/admin/sub-cat/create" element={<AdminSubCategoryCreate />} />
          <Route path="/admin/sub-cat/update/:id" element={<AdminSubCategoryUpdate />} />

          <Route path="/admin/brand" element={<AdminBrandPage />} />
          <Route path="/admin/brand/create" element={<AdminBrandCreate />} />
          <Route path="/admin/brand/update/:id" element={<AdminBrandUpdate />} />

          <Route path="/admin/feature" element={<AdminFeaturePage />} />
          <Route path="/admin/feature/create" element={<AdminFeatureCreate />} />
          <Route path="/admin/feature/update/:id" element={<AdminFeatureUpdate />} />

          <Route path="/admin/faq" element={<AdminFaqPage />} />
          <Route path="/admin/faq/create" element={<AdminFaqCreate />} />
          <Route path="/admin/faq/update/:id" element={<AdminFaqUpdate />} />

          <Route path="/admin/product" element={<AdminProductPage />} />
          <Route path="/admin/product/create" element={<AdminProductCreate />} />
          <Route path="/admin/product/update/:id" element={<AdminProductUpdate />} />

          <Route path="/admin/newsletter" element={<AdminNewsletter />} />

          <Route path="/admin/setting" element={<AdminSettingPage />} />
          <Route path="/admin/contact-us" element={<AdminContactUs />} />
          <Route path='/admin/checkout' element={<AdminCheckout />} />

          <Route path="admin/user" element={<AdminUserPage />} />
          {/* all admin routes */}
        </Route>

        <Route path="/*" element={<ErrorPage />} />

      </Routes>




      <Footer />
    </BrowserRouter>
  )
}

export default App

