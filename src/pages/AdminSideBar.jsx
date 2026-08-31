import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminSideBar() {
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "list-group-item list-group-item-action bg-dark text-white fw-bold active border-secondary"
      : "list-group-item list-group-item-action text-dark"

  return (
    <div>
      <div className="list-group shadow-sm">
        <NavLink to="/admin" end className={getNavLinkClass}>
          <i className="bi bi-house fs-5"></i><span className="float-end mt-2">Home</span>
        </NavLink>

        <NavLink to="/admin/main-category" className={getNavLinkClass}>
          <i className="bi bi-bookmark-plus fs-5"></i><span className="float-end mt-2">Main Category</span>
        </NavLink>

        <NavLink to="/admin/sub-cat" className={getNavLinkClass}>
          <i className="bi bi-list fs-5"></i><span className="float-end mt-2">Sub Category</span>
        </NavLink>

        <NavLink to="/admin/brand" className={getNavLinkClass}>
          <i className="bi bi-tags fs-5"></i><span className="float-end mt-2">Brand</span>
        </NavLink>

        <NavLink to="/admin/product" className={getNavLinkClass}>
          <i className="bi bi-bookmark-star fs-5"></i><span className="float-end mt-2">Products</span>
        </NavLink>

        <NavLink to="/admin/testimonials" className={getNavLinkClass}>
          <i className="bi bi-star fs-5"></i><span className="float-end mt-2">Testimonials</span>
        </NavLink>

        <NavLink to="/admin/feature" className={getNavLinkClass}>
          <i className="bi bi-check-circle fs-5"></i><span className="float-end mt-2">Features</span>
        </NavLink>

        <NavLink to="/admin/faq" className={getNavLinkClass}>
          <i className="bi bi-question-circle fs-5"></i><span className="float-end mt-2">FAQ</span>
        </NavLink>

        <NavLink to="/admin/setting" className={getNavLinkClass}>
          <i className="bi bi-gear fs-5"></i><span className="float-end mt-2">Settings</span>
        </NavLink>

        <NavLink to="/admin/user" className={getNavLinkClass}>
          <i className="bi bi-people fs-5"></i><span className="float-end mt-2">User</span>
        </NavLink>

        <NavLink to="/admin/newsletter" className={getNavLinkClass}>
          <i className="bi bi-envelope fs-5"></i><span className="float-end mt-2">Newsletter</span>
        </NavLink>

        <NavLink to="/admin/checkout" className={getNavLinkClass}>
          <i className="bi bi-bag-check-fill fs-5"></i><span className="float-end mt-2">Checkout</span>
        </NavLink>

        <NavLink to="/admin/contact-us" className={getNavLinkClass}>
          <i className="bi bi-headset fs-5"></i><span className="float-end mt-2">Contact Us</span>
        </NavLink>
      </div>
    </div>
  )
}
