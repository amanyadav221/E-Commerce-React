import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getAllSetting } from '../Redux/ActionCreators/SettingActionCreators'
import { createNewsLetter, getAllNewsLetter } from '../Redux/ActionCreators/NewsletterActionCreator'
import { toast, ToastContainer } from 'react-toastify'

export default function Footer() {

  const dispatch = useDispatch();
  let [emails, setEmail] = useState([])
  const { setting, updateSuccess } = useSelector(state => state.SettingStateData);
  const newsletters = useSelector(
    state => state.NewsletterStateData.newsletters
  );

  const [data, setData] = useState({ email: "" });
  const [msg, setMsg] = useState({ type: "", message: "" });

  useEffect(() => {
    dispatch(getAllSetting());
    dispatch(getAllNewsLetter());
  }, [dispatch, updateSuccess]);

  useEffect(() => {
    (() => {
      setEmail((newsletters || [])
        .filter(n => n && n.email)
        .map(n => n.email.toLowerCase().trim()))
    })()
  }, [newsletters])

  function handleChange(e) {
    setData({ email: e.target.value });
  }

  function postData(e) {
    e.preventDefault();
    const inputEmail = data.email.toLowerCase().trim();

    if (!inputEmail) {
      toast.error("Email is required!");
      return;
    }

    if (emails.includes(inputEmail)) {
      toast.error("Email already Registered!");
      setMsg({
        type: "error",
        message: "Email already Registered!"
      });
      return
    }

    dispatch(createNewsLetter({ email: inputEmail }));
    toast.success("Thanks for subscribing to our Newsletter!");
    setMsg({
      type: "success",
      message: "Thanks for subscribing to our Newsletter!"
    });
    setData({ email: "" })
  }

  return (
    <footer className="footer bg-dark text-light mt-5 pt-5 pb-4 border-top border-secondary" id="footer">
      <div className="container">
        <div className="row gy-4 text-light">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="col-12 col-md-6 col-lg-3">
            <NavLink to="/" className="text-white text-decoration-none d-inline-block mb-3">
              <i className="fs-2 fas fa-shopping-cart text-light me-2"></i>
              <span className="fs-4 fw-bolder text-white">{setting?.siteName ? setting.siteName : (import.meta.env.VITE_APP_SITE_NAME || "E-Mart Shoping")}</span>
            </NavLink>
            <div className="footer-contact fs-6">
              <p className="mb-2">
                <i className="bi bi-geo-alt me-2 text-light fs-5" />
                <Link className='text-light text-decoration-none' to={import.meta.env.VITE_APP_MAP2 || "#"} target='_blank'>
                  {setting?.addressOne ? setting.addressOne : (import.meta.env.VITE_APP_ADDRESS1 || "D1-244 Sultanpuri")}
                  {setting?.addressTwo ? `, ${setting.addressTwo}` : ""}
                </Link>
              </p>
              <p className="mb-2">
                <i className='bi bi-phone me-2 text-light fs-5' />
                <Link className='text-light text-decoration-none' to={`tel:${setting?.phone ? setting.phone : import.meta.env.VITE_APP_PHONE}`}>
                  {setting?.phone ? setting.phone : (import.meta.env.VITE_APP_PHONE || "+91 8948726393")}
                </Link>
              </p>
              <p className="mb-2">
                <i className='bi bi-envelope me-2 text-light fs-5' />
                <Link className='text-light text-decoration-none' to={`mailto:${setting?.email ? setting.email : import.meta.env.VITE_APP_EMAIL}`}>
                  {setting?.email ? setting.email : (import.meta.env.VITE_APP_EMAIL || "yadavaman6940@gmail.com")}
                </Link>
              </p>
              <p className="mb-3">
                <i className='bi bi-whatsapp me-2 text-light fs-5'></i>
                <Link className='text-light text-decoration-none' to={`https://wa.me/${setting?.whatsapp ? setting.whatsapp : import.meta.env.VITE_APP_WHATSAPP}`} target='_blank'>
                  {setting?.whatsapp ? setting.whatsapp : (import.meta.env.VITE_APP_WHATSAPP || "+91 8948726393")}
                </Link>
              </p>
              <div className="social-links d-flex gap-3 mt-3 fs-5">
                <Link className='text-light' to={setting?.gitHub ? setting.gitHub : "#"}><i className="bi bi-github"></i></Link>
                <Link className='text-light' to={setting?.instagram ? setting.instagram : "#"}><i className="bi bi-instagram"></i></Link>
                <Link className='text-light' to={setting?.linkedIn ? setting.linkedIn : "#"}><i className="bi bi-linkedin"></i></Link>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="col-12 col-md-6 col-lg-3 footer-links">
            <h4 className='text-white mb-3 fs-5 border-bottom border-secondary pb-2 d-inline-block'>Useful Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="/">Home</NavLink></li>
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="/about">About Us</NavLink></li>
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="/shop-page">Shop</NavLink></li>
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="/features">Features</NavLink></li>
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="/product">Products</NavLink></li>
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="/faq">FAQ</NavLink></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="col-12 col-md-6 col-lg-3 footer-links">
            <h4 className='text-white mb-3 fs-5 border-bottom border-secondary pb-2 d-inline-block'>Our Services</h4>
            <ul className="list-unstyled">
              <li className="mb-2"><Link className='text-light text-decoration-none' to="/contact-us">Contact Us</Link></li>
              <li className="mb-2"><Link className='text-light text-decoration-none' to="/testimonials">Testimonials</Link></li>
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="#">Privacy Policy</NavLink></li>
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="#">Terms & Conditions</NavLink></li>
              <li className="mb-2"><NavLink className='text-light text-decoration-none' to="#">Refund Policy</NavLink></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-12 col-md-6 col-lg-3 footer-newsletter">
            <h4 className='text-white mb-3 fs-5 border-bottom border-secondary pb-2 d-inline-block'>Our Newsletter</h4>
            <p className='text-light small mb-3'>Subscribe to our newsletter and receive the latest news about our products!</p>
            <form onSubmit={postData}>
              <div className="input-group mb-3">
                <input type="email" className="form-control bg-dark text-light border-secondary" placeholder="Your Email" value={data.email} onChange={handleChange} required />
                <button className="btn btn-secondary fw-bold" type="submit">Subscribe</button>
              </div>
            </form>
            {msg.type ? <p className={msg.type === "error" ? 'text-danger small' : 'text-success small'}>{msg.message}</p> : null}
          </div>

        </div>

        <hr className="my-4 border-secondary" />

        <div className="row align-items-center">
          <div className="col-12 text-center text-secondary small">
            &copy; {new Date().getFullYear()} <strong className="text-white">{setting?.siteName ? setting.siteName : "E-Mart Shoping"}</strong>. All Rights Reserved. Designed & Developed for E-Commerce.
          </div>
        </div>

        <ToastContainer />
      </div>
    </footer>
  )
}
