import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../../Redux/ActionCreators/SecurityCheckActionCreator'

export default function LoginPage() {
    let LoginStateData = useSelector(state => state.LoginStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [showPassword, setShowPassword] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        username: "",
        password: ""
    })
    useEffect(() => {
        if (LoginStateData.jwt) {
            navigate("/")
        }
    }, [LoginStateData.jwt])

    let [data, setData] = useState({
        username: "",
        password: ""
    })
    let [show, setShow] = useState(false)
    function getInputData(e) {
        let { name, value } = e.target
        console.log(name, value)
        setData({ ...data, [name]: value })
    }
    function postData(e) {
        e.preventDefault()
        console.log(data)
        if (!(data.username.length === 0 && data.password.length === 0)) {
            setShow(false)
        }
        if (data.username.length === 0 && data.password.length === 0) {
            console.log("both are ==")
            console.log(errorMessage.username)
            setErrorMessage({ ...errorMessage, 'username': "Username is Required", 'password': "Password is Required" })
            console.log(errorMessage.username)
            setShow(true)
            return
        } else if (data.username.length === 0) {
            console.log('data username', data)
            setErrorMessage({ ...errorMessage, 'username': "Username is Required", 'password': "" })
            setShow(true)
            return
        } else if (data.password.length === 0) {
            setErrorMessage({ ...errorMessage, 'password': "Password is Required", 'username': "" })
            setShow(true)
            return
        } else {
            dispatch(LoginUser(data))
        }
    }
    return (

        <div>
            <Hero title="Login - to your Account" />
            <div className="container-fluid mt-0 d-flex justify-content-center align-items-center ">
                <div className="card mt-4 p-2 shadow col-md-4">
                    <h5 className="bg-dark text-light mb-4 p-2 mt-2 text-center">Login - to your Account </h5>
                    <form onSubmit={postData} className="row g-3">
                        <div className="col-12">
                            <label htmlFor="username" className="form-label">Username*</label>
                            <input type="text" className={errorMessage.username ? 'form-control border-danger' : 'form-control'} id="username" name='username' onChange={getInputData} />
                            {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                            {LoginStateData.usernameError ? <p className='text-danger'>{LoginStateData.usernameError}</p> : null}
                        </div>

                        <div className="col-12">
                            <label htmlFor="password" className="form-label">Password*</label>
                            <div className="btn-group w-100 ">
                                <input type={showPassword ? 'text' : 'password'} className={errorMessage.password ? 'form-control border-danger' : 'form-control'} id="password" name='password' onChange={getInputData} />
                                <button type='button' onClick={() => setShowPassword(!showPassword)} className={errorMessage.password ? 'btn btn-dark border-danger' : 'btn btn-dark'}><i className={showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'}></i></button>
                            </div>
                            {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                            {LoginStateData.passwordError ? <p className='text-danger'>{LoginStateData.passwordError}</p> : null}
                        </div>

                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-dark w-50">Login</button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between">
                        <Link className='text-dark text-center my-2' to="/#">Forget Password?</Link>
                        <Link className='text-dark text-center my-2' to="/sign-up">Didn't have account? Create</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
