
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from '../Redux/ActionCreators/SecurityCheckActionCreator'
import { getAllSetting } from "../Redux/ActionCreators/SettingActionCreators";

export default function NavBar() {
  const { setting, updateSuccess } = useSelector(state => state.SettingStateData);

  const collapseRef = useRef();
  const location = useLocation();
  const { jwt, role, fullName } = useSelector(s => s.LoginStateData);
  let [siteSetting, setSetting] = useState()
  const dispatch = useDispatch();
  let navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllSetting());
  }, [dispatch, updateSuccess]);

  useEffect(() => {
    (() => {
      setSetting(setting)
    })()
  }, [setting, updateSuccess])
  function handleLogout() {
    dispatch(logout());
    navigate("/login")
  }
  const closeMenu = () => {
    if (collapseRef.current?.classList.contains("show")) {
      collapseRef.current.classList.remove("show");
    }
  }
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  useEffect(() => {
    const handleClickOutside = e => {
      if (collapseRef.current && !collapseRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [])


  const navClass = ({ isActive }) =>
    isActive
      ? "nav-link fw-semibold text-warning"
      : "nav-link text-white"
  return (
    <header className="container-fluid p-0 sticky-top bg-dark">
  <div className="row gx-0 px-3 px-lg-5 align-items-center">
    <nav className="navbar navbar-expand-lg navbar-dark w-100">

          {/* LOGO */}
          <Link to="/" className="navbar-brand fw-bold fs-3 text-white">
            {siteSetting?.siteName ? siteSetting.siteName : import.meta.env.VITE_APP_SITE_NAME}
          </Link>

          {/* MOBILE TOGGLER */}
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* COLLAPSE */}
          <div ref={collapseRef} className="collapse navbar-collapse" id="navbarCollapse">


            {/* LINKS */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold">

              <li className="nav-item mx-2"><NavLink to="/" className={navClass}>Home</NavLink></li>
              <li className="nav-item mx-2"><NavLink to="/shop-page" className={navClass}>Shop</NavLink></li>
              <li className="nav-item mx-2"><NavLink to="/about" className={navClass}>About</NavLink></li>
              <li className="nav-item mx-2"><NavLink to="/features" className={navClass}>Features</NavLink></li>
              <li className="nav-item mx-2"><NavLink to="/product" className={navClass}>Product</NavLink></li>
              <li className="nav-item mx-2"><NavLink to="/cart" className={navClass}>Cart</NavLink></li>
              <li className="nav-item mx-2"><NavLink to="/profile?option=4" className={navClass}>Wishlist</NavLink></li>
              <li className="nav-item mx-2"><NavLink to="/profile?option=5" className={navClass}>Orders</NavLink></li>
            </ul>

            {/* RIGHT SIDE */}
            <div className="d-lg-flex align-items-center">

              {!jwt && (
                <>
                  <div className="btn-group">
                    <button className="btn"><NavLink className={`${navClass} text-light`} to="/login">Login</NavLink></button>
                    <button className="btn"><NavLink className={`${navClass} text-light`} to="/sign-up">Signup</NavLink></button>
                  </div>
                </>
              )}
              {jwt && role === "USER" && (
                <>
                  <div className="dropdown">
                    <NavLink to="#" className="dropdown-toggle text-white" data-bs-toggle="dropdown">
                      <i className="fa fa-user me-2"></i> {fullName}
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-end bg-light">
                      <li><Link to="/profile" className="dropdown-item">My Profile</Link></li>
                      <li><Link to="/profile?option=4" className="dropdown-item">Wishlist</Link></li>
                      <li><Link to="/profile?option=6" className="dropdown-item">My Cart</Link></li>
                      {/* <li><Link to="/account-setting" className="dropdown-item">Account Settings</Link></li> */}
                      <li><Link to="/" onClick={handleLogout} className="dropdown-item">Logout</Link></li>
                    </ul>
                  </div>
                </>
              )}

              {jwt && role === "ADMIN" && (
                <>
                  {/* ADMIN */}
                  <div className="dropdown">
                    <Link to="#" className="dropdown-toggle text-white" data-bs-toggle="dropdown">
                      <i className="fa fa-user me-2"></i> {fullName}
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><Link to="/admin" className="dropdown-item">Admin Dashboard</Link></li>
                      <li><Link to="/admin/my-account" className="dropdown-item">My Account</Link></li>
                      <li><Link onClick={handleLogout} className="dropdown-item">Logout</Link></li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
