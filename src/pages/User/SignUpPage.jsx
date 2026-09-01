import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserNew } from '../../Redux/ActionCreators/SecurityCheckActionCreator'
import { toast, ToastContainer } from 'react-toastify'

export default function SignUpPage() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const { message } = useSelector(state => state.SecurityCheckStateData)

    let [data, setData] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    })

    let [errorMessage, setErrorMessage] = useState({})
    let [show, setShow] = useState(false)
    let [isSubmitting, setIsSubmitting] = useState(false)

    const validateField = (name, value, allData) => {
        let err = "";
        if (!value || value.trim() === "") {
            return `${name.charAt(0).toUpperCase() + name.slice(1)} is required!`;
        }
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                err = "Invalid Email Address!";
            }
        }
        if (name === "phone") {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value)) {
                err = "Enter valid 10-digit mobile number!";
            }
        }
        if (name === "cpassword" && value !== allData.password) {
            err = "Passwords do not match!";
        }
        return err;
    }

    function getInputData(e) {
        let { name, value } = e.target;
        const newData = { ...data, [name]: value };
        setData(newData);
        const err = validateField(name, value, newData);
        setErrorMessage(prev => ({ ...prev, [name]: err }));
    }

    useEffect(() => {
        if (message) {
            setIsSubmitting(false);
            if (message.toLowerCase().includes("success") || message.toLowerCase().includes("registered")) {
                toast.success("Account Created Successfully! Redirecting to Login...");
                setTimeout(() => {
                    navigate("/login");
                }, 1200);
            } else {
                toast.error(message);
            }
        }
    }, [message, navigate]);

    function postData(e) {
        e.preventDefault();
        let errors = {};
        Object.keys(data).forEach(key => {
            const err = validateField(key, data[key], data);
            if (err) errors[key] = err;
        });

        if (Object.keys(errors).length > 0) {
            setErrorMessage(errors);
            setShow(true);
            return;
        }

        setIsSubmitting(true);
        dispatch(registerUserNew(data));
    }

    return (
        <>
            <Hero title="SignUp - Create Your Account" />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-7 col-md-9 card shadow-lg border-0 rounded-3 p-4">
                        <div className="text-center mb-4">
                            <h4 className="fw-bold text-dark">Create Your Account</h4>
                            <p className="text-muted small">Join E-Mart for an amazing shopping experience</p>
                        </div>
                        <form onSubmit={postData}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="fullName" className="form-label fw-semibold text-dark">Full Name*</label>
                                    <input 
                                        type="text" 
                                        id="fullName" 
                                        name="fullName" 
                                        className={`form-control ${show && errorMessage.fullName ? 'is-invalid' : ''}`} 
                                        onChange={getInputData} 
                                        placeholder="John Doe" 
                                        value={data.fullName}
                                    />
                                    {show && errorMessage.fullName && <div className="invalid-feedback">{errorMessage.fullName}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="phone" className="form-label fw-semibold text-dark">Mobile Number*</label>
                                    <input 
                                        type="text" 
                                        id="phone" 
                                        name="phone" 
                                        maxLength="10"
                                        className={`form-control ${show && errorMessage.phone ? 'is-invalid' : ''}`} 
                                        onChange={getInputData} 
                                        placeholder="10-digit Mobile Number" 
                                        value={data.phone}
                                    />
                                    {show && errorMessage.phone && <div className="invalid-feedback">{errorMessage.phone}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="username" className="form-label fw-semibold text-dark">Username*</label>
                                    <input 
                                        type="text" 
                                        id="username" 
                                        name="username" 
                                        className={`form-control ${show && errorMessage.username ? 'is-invalid' : ''}`} 
                                        onChange={getInputData} 
                                        placeholder="Username" 
                                        value={data.username}
                                    />
                                    {show && errorMessage.username && <div className="invalid-feedback">{errorMessage.username}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label fw-semibold text-dark">Email Address*</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        className={`form-control ${show && errorMessage.email ? 'is-invalid' : ''}`} 
                                        onChange={getInputData} 
                                        placeholder="example@gmail.com" 
                                        value={data.email}
                                    />
                                    {show && errorMessage.email && <div className="invalid-feedback">{errorMessage.email}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label fw-semibold text-dark">Password*</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        className={`form-control ${show && errorMessage.password ? 'is-invalid' : ''}`} 
                                        onChange={getInputData} 
                                        placeholder="Enter Password" 
                                        value={data.password}
                                    />
                                    {show && errorMessage.password && <div className="invalid-feedback">{errorMessage.password}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cpassword" className="form-label fw-semibold text-dark">Confirm Password*</label>
                                    <input 
                                        type="password" 
                                        id="cpassword" 
                                        name="cpassword" 
                                        className={`form-control ${show && errorMessage.cpassword ? 'is-invalid' : ''}`} 
                                        onChange={getInputData} 
                                        placeholder="Confirm Password" 
                                        value={data.cpassword}
                                    />
                                    {show && errorMessage.cpassword && <div className="invalid-feedback">{errorMessage.cpassword}</div>}
                                </div>

                                {message && (
                                    <div className={`col-12 text-center mt-2 ${message.toLowerCase().includes("success") || message.toLowerCase().includes("registered") ? "text-success" : "text-danger"}`}>
                                        <b>{message}</b>
                                    </div>
                                )}

                                <div className="col-12 mt-4">
                                    <button className="btn btn-dark w-100 py-2 fs-6 fw-bold shadow-sm" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Creating Account...
                                            </>
                                        ) : "Create Account"}
                                    </button>
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <Link className="text-decoration-none text-dark fw-semibold" to="/login">Already have an account? Login</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
