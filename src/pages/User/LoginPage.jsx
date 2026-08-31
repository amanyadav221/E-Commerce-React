import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../Redux/ActionCreators/SecurityCheckActionCreator'
import { toast, ToastContainer } from 'react-toastify'

export default function LoginPage() {
    let LoginStateData = useSelector(state => state.LoginStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    
    let [showPassword, setShowPassword] = useState(false)
    let [errorMessage, setErrorMessage] = useState({ username: "", password: "" })
    let [data, setData] = useState({ username: "", password: "" })
    let [show, setShow] = useState(false)

    // Forgot Password State
    let [showForgotModal, setShowForgotModal] = useState(false);
    let [forgotStep, setForgotStep] = useState(1); // 1: Enter Email/Username, 2: Enter OTP & New Password
    let [forgotEmail, setForgotEmail] = useState("");
    let [generatedOtp, setGeneratedOtp] = useState("");
    let [userOtp, setUserOtp] = useState("");
    let [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (LoginStateData.jwt) {
            toast.success("Login Successful!");
            navigate("/")
        }
    }, [LoginStateData.jwt, navigate])

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    function postData(e) {
        e.preventDefault()
        let errs = {}
        if (!data.username.trim()) errs.username = "Username is required!";
        if (!data.password.trim()) errs.password = "Password is required!";

        if (Object.keys(errs).length > 0) {
            setErrorMessage(errs);
            setShow(true);
            return;
        }

        dispatch(LoginUser(data))
    }

    // Handle Forgot Password OTP Generation
    const handleSendOtp = (e) => {
        e.preventDefault();
        if (!forgotEmail.trim()) {
            toast.error("Please enter your registered Email or Username!");
            return;
        }
        // Generate random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setForgotStep(2);
        toast.info(`OTP sent to ${forgotEmail}! (Demo OTP: ${otp})`, { autoClose: 10000 });
    }

    // Handle Reset Password with OTP
    const handleResetPassword = (e) => {
        e.preventDefault();
        if (userOtp !== generatedOtp) {
            toast.error("Invalid OTP! Please check and try again.");
            return;
        }
        if (!newPassword || newPassword.length < 4) {
            toast.error("New Password must be at least 4 characters long!");
            return;
        }

        toast.success("Password Reset Successful! Please login with your new password.");
        setShowForgotModal(false);
        setForgotStep(1);
        setForgotEmail("");
        setUserOtp("");
        setNewPassword("");
    }

    return (
        <div>
            <Hero title="Login - to your Account" />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-8 card shadow-lg border-0 rounded-3 p-4">
                        <div className="text-center mb-4">
                            <h4 className="fw-bold text-dark">Login - to your Account</h4>
                            <p className="text-muted small">Welcome back! Please enter your credentials</p>
                        </div>

                        <form onSubmit={postData} className="row g-3">
                            <div className="col-12">
                                <label htmlFor="username" className="form-label fw-semibold text-dark">Username or Email*</label>
                                <input 
                                    type="text" 
                                    className={`form-control ${show && errorMessage.username ? 'is-invalid' : ''}`} 
                                    id="username" 
                                    name='username' 
                                    placeholder="Enter your username"
                                    onChange={getInputData} 
                                    value={data.username}
                                />
                                {show && errorMessage.username && <div className="invalid-feedback">{errorMessage.username}</div>}
                                {LoginStateData.usernameError && <div className="text-danger small mt-1">{LoginStateData.usernameError}</div>}
                            </div>

                            <div className="col-12">
                                <label htmlFor="password" className="form-label fw-semibold text-dark">Password*</label>
                                <div className="input-group">
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        className={`form-control ${show && errorMessage.password ? 'is-invalid' : ''}`} 
                                        id="password" 
                                        name='password' 
                                        placeholder="Enter your password"
                                        onChange={getInputData} 
                                        value={data.password}
                                    />
                                    <button 
                                        type='button' 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        className="btn btn-outline-dark"
                                    >
                                        <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                    </button>
                                </div>
                                {show && errorMessage.password && <div className="text-danger small mt-1">{errorMessage.password}</div>}
                                {LoginStateData.passwordError && <div className="text-danger small mt-1">{LoginStateData.passwordError}</div>}
                            </div>

                            <div className="col-12 mt-4">
                                <button type="submit" className="btn btn-dark w-100 py-2 fs-6 fw-bold shadow-sm">Login</button>
                            </div>
                        </form>

                        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                            <button 
                                type="button" 
                                className='btn btn-link text-decoration-none text-dark fw-semibold p-0' 
                                onClick={() => setShowForgotModal(true)}
                            >
                                Forgot Password?
                            </button>
                            <Link className='text-decoration-none text-dark fw-semibold' to="/sign-up">Didn't have account? Create</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg border-0">
                            <div className="modal-header bg-dark text-white">
                                <h5 className="modal-header-title mb-0 text-white">
                                    <i className="bi bi-shield-lock me-2"></i>Reset Password
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowForgotModal(false)}></button>
                            </div>
                            <div className="modal-body p-4">
                                {forgotStep === 1 ? (
                                    <form onSubmit={handleSendOtp}>
                                        <p className="text-muted small mb-3">Enter your registered Email or Username to receive a verification OTP.</p>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Email or Username*</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="example@gmail.com" 
                                                value={forgotEmail} 
                                                onChange={(e) => setForgotEmail(e.target.value)} 
                                                required 
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-dark w-100 fw-bold">Send OTP</button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleResetPassword}>
                                        <p className="text-success small mb-3">OTP sent to <b>{forgotEmail}</b>. Please check your inbox.</p>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Enter 6-digit OTP*</label>
                                            <input 
                                                type="text" 
                                                maxLength="6"
                                                className="form-control text-center fs-5 fw-bold" 
                                                placeholder="6-digit OTP" 
                                                value={userOtp} 
                                                onChange={(e) => setUserOtp(e.target.value)} 
                                                required 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">New Password*</label>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                placeholder="Enter New Password" 
                                                value={newPassword} 
                                                onChange={(e) => setNewPassword(e.target.value)} 
                                                required 
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-dark w-100 fw-bold">Update Password</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    )
}
