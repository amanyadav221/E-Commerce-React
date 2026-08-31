import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getAllSetting } from '../Redux/ActionCreators/SettingActionCreators'
import { createNewsLetter, getAllNewsLetter } from '../Redux/ActionCreators/NewsletterActionCreator'
import { toast, ToastContainer } from 'react-toastify'

export default function Footer() {

  const dispatch = useDispatch();
  let [emails, setEmail] = useState([])
  // 🔹 Redux data
  const { setting, updateSuccess } = useSelector(state => state.SettingStateData);
  const newsletters = useSelector(
    state => state.NewsletterStateData.newsletters
  );

  // Local state
  const [data, setData] = useState({ email: "" });
  const [msg, setMsg] = useState({ type: "", message: "" });

  // Load data
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
  //  Input handler
  function handleChange(e) {
    setData({ email: e.target.value });
  }

  //  Submit handler
  function postData(e) {
    e.preventDefault();

    const inputEmail = data.email.toLowerCase().trim();

    if (!inputEmail) {
      toast.error("Email is required!");
      console.log(inputEmail)
      return;
    }
    console.log(emails, inputEmail)
    if (emails.includes(inputEmail)) {
      toast.error("Email already Registered!!!");
      setMsg({
        type: "error",
        message: "Email already Registered!!!"
      });
      return
    }

    dispatch(createNewsLetter({ email: inputEmail }));

    toast.success("Thanks for subscribing our Newsletter Service!!!");
    setMsg({
      type: "success",
      message: "Thanks for subscribing our Newsletter Service!!!"
    });

    setData({ email: "" })

  }

  return (
    <div className='footer' id="footer">
      <div className='fixed-bottom container footer-top' id="root"></div>
      <div className="container-fluidfixed-bottom  mt-5 copyright py-4">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 text-center text-md-start mb-md-0">
              <span className="text-white"><NavLink to="/" className="border-bottom text-white"><i
                className="fs-2 fas fa-copyright text-light me-2"></i><span className="fs-4 fw-bolder">{setting?.siteName ? setting.siteName : import.meta.env.VITE_APP_SITE_NAME}</span></NavLink></span>
            </div>
            <div className='d-flex justify-content-between text-light'>
              <div className="footer-contact fs-6 py-2">
                <span className="bi bi-geo-alt my-2  me-3" />
                <Link className='text-light' to={import.meta.env.VITE_APP_MAP2} target='_blank'>
                  {setting?.addressOne ? setting.addressOne : import.meta.env.VITE_APP_ADDRESS1}
                  <br />
                  {setting?.addressTwo ? setting.addressTwo : import.meta.env.VITE_APP_ADDRESS1}
                </Link>
                <p className="mt-2">
                  <strong className='bi bi-phone text-light  me-3' />
                  <Link className='text-light' to={`tel:${setting?.phone ? setting.phone : import.meta.env.VITE_APP_PHONE}`}>
                    {import.meta.env.VITE_APP_PHONE}
                  </Link>
                </p>
                <p>
                  <strong className='bi bi-envelope text-light me-3' />
                  <Link className='text-light' to={`mailto:${import.meta.env.VITE_APP_EMAIL}`}>
                    {setting?.email ? setting.email : import.meta.env.VITE_APP_EMAIL}
                  </Link>
                </p>
                <p><strong className='bi bi-whatsapp me-3'></strong>
                  <Link className='text-light' to={`https/wa.me/${import.meta.env.VITE_APP_WHATSAPP}`}>{setting?.whatsapp ? setting.whatsapp : import.meta.env.VITE_APP_WHATSAPP}
                  </Link>
                </p>
                <div className="social-links d-flex mt-5">
                  <Link className='text-light border-light' to={setting?.gitHub ? setting.gitHub : import.meta.env.VITE_APP_GITHUB}><i className="bi bi-github"></i></Link>
                  <Link className='text-light border-light' to={setting?.instagram ? setting.instagram : import.meta.env.VITE_APP_INSTAGRAM}><i className="bi bi-instagram"></i></Link>
                  <Link className='text-light border-light' to={setting?.linkedIn ? setting.linkedIn : import.meta.env.VITE_APP_LINKEDIN}><i className="bi bi-linkedin"></i></Link>
                </div>
              </div>




              <div className="col-lg-2 col-md-3 footer-links text-light">
                <h4 className='text-light fs-3'>Useful Links</h4>
                <ul >
                  <li><NavLink className='text-light' to="/">Home</NavLink></li>
                  <li><NavLink className='text-light' to="/about">About us</NavLink></li>
                  <li><NavLink className='text-light' to="/shop">Shop</NavLink></li>
                  <li><NavLink className='text-light' to="/features">Features</NavLink></li>
                  <li><NavLink className='text-light' to="/services">Services</NavLink></li>
                  <li><NavLink className='text-light' to="/faq ">Faq</NavLink></li>


                </ul>
              </div>


              <div className="col-lg-2 col-md-3 footer-links">
                <h4 className='text-light'>Our Services</h4>
                <ul>
                  <li><Link className='text-light' to="/contact-us">Contact Us</Link></li>
                  <li><Link className='text-light' to="/testimonials">Testimonials</Link></li>
                  <li><NavLink className='text-light' to="#">Privacy policy</NavLink></li>
                  <li><NavLink className='text-light' to="#">Terms of Condition</NavLink></li>
                  <li><NavLink className='text-light' to="#">Refund Policy</NavLink></li>
                  <li><NavLink className='text-light' to="#">Data Policy</NavLink></li>

                </ul>
              </div>
              <div className="col-lg-4 col-md-12 footer-newsletter pt-0">
                <h4 className='text-light'>Our Newsletter</h4>
                <p className='text-light'>Subscribe to our newsletter and receive the latest news about our products and services!</p>
                <form className="php-email-form my-0 py-0" onSubmit={postData}>

                  <div className="newsletter-form">
                    <input type="email" name="email" value={data.email} onChange={(e) => handleChange(e)} />
                    <input type="submit" value="Subscribe" /></div>

                </form>
                <div className='fs-4'>{msg.type ? <p className={msg.type === "error" ? 'text-danger' : 'text-success'}>{msg.message}</p> : null}</div>
              </div>

              <ToastContainer />
            </div>
          </div>
          <div className="mx-5 col-md-6 h5 text-center text-md-end text-white">
            Designed By <span className='fs-4'></span>
          </div>

          {/* Copyright End  */}
          {/* Back to Top  */}
          <a href="#" className="btn btn-dark btn-lg-square back-to-top"><i className="fa fa-arrow-up"></i></a>
        </div>
      </div>
    </div>
  )
}
