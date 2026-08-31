import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function AdminSideBar() {
  return (
    <div>
      <div className="list-group bg-light">
        <NavLink to="/admin" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className="bi bi-house fs-5"></i><span className="float-end mt-2 ">Home</span>
        </NavLink>

        <NavLink to="/admin/main-category" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-bookmark-plus fs-5"></i><span className="float-end mt-2">Main Category</span>
        </NavLink>

        <NavLink to="/admin/sub-cat" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-list fs-5"></i><span className="float-end mt-2">Sub Category</span>
        </NavLink>


        <NavLink to="/admin/brand" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-tags fs-5"></i><span className="float-end mt-2">Brand</span>
        </NavLink>

        <NavLink to="/admin/product" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-bookmark-star fs-5"></i><span className="float-end mt-2">Products</span>
        </NavLink>

        <NavLink to="/admin/testimonials" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-star fs-5"></i><span className="float-end mt-2">Testimonials</span>
        </NavLink>

        <NavLink to="/admin/feature" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-check-circle fs-5"></i><span className="float-end mt-2">Features</span>
        </NavLink>
        <NavLink to="/admin/faq" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-question-circle fs-5"></i><span className="float-end mt-2">Faq</span>
        </NavLink>

        <NavLink to="/admin/setting" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-gear fs-5"></i><span className="float-end mt-2">Settings</span>
        </NavLink>

        <NavLink to="/admin/user" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-people fs-5"></i><span className="float-end mt-2">User</span>
        </NavLink>

        <NavLink to="/admin/newsletter" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-envelope fs-5"></i><span className="float-end mt-2">NewsLatter</span>
        </NavLink>

        <NavLink to="/admin/checkout" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-bag-check-fill fs-5"></i><span className="float-end mt-2">Checkout</span>
        </NavLink>

        <NavLink to="/admin/contact-us" className="list-group-item list-group-item-action " aria-current="true">
          <i className="bi bi-headset fs-5"></i><span className="float-end mt-2">ContactUs</span>
        </NavLink>
      </div>
    </div>
  )
}
