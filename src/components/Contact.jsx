import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAllSetting } from '../Redux/ActionCreators/SettingActionCreators';
import FormValidator from '../Validators/FormValidator';
import { createContactUs } from '../Redux/ActionCreators/NewsletterActionCreator';

export default function Contact() {
    const setting = useSelector(state => state.SettingStateData);
    let [siteSetting, setSetting] = useState()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSetting());
    }, [dispatch]);

    useEffect(() => {
        (() => {
            setSetting(setting)
        })()
    }, [setting])

    let [postMsg, setPostMsg] = useState()

    let [show, setShow] = useState(false)

    let dataOption = {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    }
    let errorOption = {
        name: "Name is Mandatory",
        email: "Email is Mandatory",
        phone: "Phone is Mandatory",
        subject: "Subject is Mandatory",
        message: "Message is Mandatory",
    }
    let [errorMessage, setErrorMessage] = useState(errorOption)
    let [data, setData] = useState(dataOption)
    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    }
    function postData(e) {
        e.preventDefault()

        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        } else {
            console.log(data)
            console.log(new Date())
            dispatch(createContactUs({ ...data, status: 'true', date: new Date() }))
            setData(dataOption)
            setShow(false)
            setErrorMessage(errorMessage)
            setPostMsg("Your message has been sent. Our team will contact you soon. Thank you!")
        }
    }
    return (
        <div>
            <main className="main">
                <section id="contact" className="contact section">
                    <div className="container section-title" data-aos="fade-up">
                        <h2>Contact</h2>
                        <p>“Get in touch with {siteSetting?.siteName ? siteSetting.siteName : import.meta.env.VITE_APP_SITENAME}  for any queries related to orders, returns, or products. Our dedicated support team is always ready to help you with a smooth shopping experience.”</p>
                    </div>
                    <div className="container" data-aos="fade-up" data-aos-delay="100">
                        <div className="row gy-4">
                            <div className="col-lg-6 ">
                                <div className="row gy-4">
                                    <div className=" col-lg-12">
                                        <div className="card shadow-lg info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                                            <Link to={import.meta.env.VITE_APP_MAP2} target='_blank' className="text-center text-dark bi bi-geo-alt">
                                                <h3>Address</h3>
                                                <p>{siteSetting?.addressOne ? siteSetting.addressOne : import.meta.env.VITE_APP_ADDRESS1} {siteSetting?.addressTwo ? siteSetting.addressTwo : import.meta.env.VITE_APP_ADDRESS2}</p>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card shadow-lg  info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                                            <Link to={`tel:${import.meta.env.VITE_APP_PHONE}`} className="text-center text-dark bi bi-telephone">
                                                <h3>Call Us</h3>
                                                <p>+91 {siteSetting?.phone ? siteSetting.phone : import.meta.env.VITE_APP_PHONE}</p>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="info-item card shadow-lg  d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                                            <Link to={`mailto:${import.meta.env.VITE_APP_EMAIL}`} className="text-center text-dark bi bi-envelope">
                                                <h3>Email Us</h3>
                                                <p>{siteSetting?.email ? siteSetting.email : import.meta.env.VITE_APP_EMAIL}</p>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="info-item card shadow-lg  d-flex flex-column justify-content-center align-items-center" >
                                            <i class=" border-dark text-dark bi bi-at"></i>
                                            <h3>Social Media</h3>
                                            <div className=" d-flex mt-1 text-dark">
                                                <Link className='text-dark  border-dark mx-2' target='_blank' to={`https://wa.me/${setting?.whatsapp ? setting.whatsapp : import.meta.env.VITE_APP_WHATSAPP}`}><i className=" border-dark text-dark bi bi-whatsapp"></i></Link>
                                                <Link className='text-dark  border-dark mx-2' target='_blank' to={setting?.instagram ? setting.instagram : import.meta.env.VITE_APP_INSTAGRAM}><i className=" border-dark text-dark bi bi-instagram"></i></Link>
                                                <Link className='text-dark border-dark mx-2' target='_blank' to={setting?.gitHub ? setting.gitHub : import.meta.env.VITE_APP_GITHUB}><i className=" border-dark text-dark bi bi-github"></i></Link>
                                                <Link className='text-dark border-dark mx-2' target='_blank' to={setting?.linkedIn ? setting.linkedIn : import.meta.env.VITE_APP_LINKEDIN}><i className=" border-dark text-dark bi bi-linkedin"></i></Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className=" col-lg-6">
                                <form onSubmit={postData} className="card shadow-lg form-control pt-4" >
                                    <div className="row gy-4">
                                        {postMsg ? <p className='text-center text-success'>{postMsg}</p> : null}
                                        <div className="col-md-6">

                                            <label htmlFor='name' className='form-label'>Name*</label>
                                            <input onChange={(e) => getInputData(e)} value={data.name} type="text" name="name" id='name' className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`} placeholder="Your Name" required="" />
                                            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor='phone' className='form-label'>Phone*</label>
                                            <input value={data.phone} type='number' onChange={(e) => getInputData(e)} className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`} name="phone" id='phone' placeholder="Phone" required="" />
                                            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                        </div>
                                        <div className="col-md-6 ">
                                            <label htmlFor='email' className='form-label'>Email*</label>
                                            <input value={data.email} onChange={(e) => getInputData(e)} type="email" className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`} name="email" id='email' placeholder="Your Email" required="" />
                                            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                        </div>
                                        <div className="col-md-6 ">
                                            <label htmlFor='subject' className='form-label'>Subject*</label>
                                            <input value={data.subject} onChange={(e) => getInputData(e)} type="text" className={`form-control ${show && errorMessage.subject ? 'border-danger' : ''}`} name="subject" id='subject' placeholder="Your subject" required="" />
                                            {show && errorMessage.subject ? <p className='text-danger'>{errorMessage.subject}</p> : null}
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor='message' className='form-label'>Message*</label>
                                            <textarea value={data.message} onChange={(e) => getInputData(e)} type="text" className={`form-control ${show && errorMessage.message ? 'border-danger' : ''}`} row={2} id='message' name="message" placeholder="Message" required="" />
                                            {show && errorMessage.message ? <p className='text-danger'>{errorMessage.message}</p> : null}
                                        </div>

                                        <div className="col-md-12 text-center">
                                            <button className='btn btn-dark text-light mb-4' type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
