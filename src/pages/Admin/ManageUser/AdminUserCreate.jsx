import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import { useDispatch, useSelector } from 'react-redux'
export default function AdminUserCreate() {

    let dispatch = useDispatch()
    const { message } = useSelector(state => state.SecurityCheckStateData);
    let [data, setData] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        role: ""
    })
    let [errorMessage, setErrorMessage] = useState({
        fullName: "Name is Mandatory",
        username: "Username is Mandatory",
        email: "Email is Mandatory",
        password: "Password is Mandatory",
        phone: "Phone is Mandatory",
        cpassword: "Confirm password is Mandatory"
    })
    let [show, setShow] = useState(false)
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
        setData({ ...data, [name]: value })
    }
    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        console.log(data)
        if (error) {
            setShow(true)
        } else if (data.password != data.cpassword) {
            setErrorMessage({ ...errorMessage, 'password': "Password and Confirm Password doesn't match" })

        } else {
            dispatch(registerUserByAdmin(data))
        }
    }

    return (
        <>
            <Hero title="SignUp - Create Your Account" />
            <div className="container-fluid my-3">
                <div className="row ">
                    <div className="col-lg-8 m-auto card shadow">
                        <h5 className="bg-dark text-light p-2 mt-2 text-center">Create Your Accont </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6   b-3">
                                    <label htmlFor="name">Name*</label>
                                    <input type="text" id="fullName" name="fullName" className={`form-control ${show && errorMessage.fullName ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Full Name' />
                                    {show && errorMessage.fullName ? <p className='text-danger'>{errorMessage.fullName}</p> : null}
                                </div>

                                <div className="col-md-6   b-3">
                                    <label htmlFor='phone'>Phone*</label>
                                    <input type="number" id="phone" name="phone" className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Phone Number' />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6   b-3">
                                    <label htmlFor='username'>UserName*</label>
                                    <input type="text" id="username" name="username" className={`form-control ${show && errorMessage.username ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Enter Username' />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6   b-3">
                                    <label htmlFor='email'>Email*</label>
                                    <input type="email" id="email" name="email" className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Enter Email' />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>


                                <div className="col-md-6   b-3">
                                    <label htmlFor='password'>Password*</label>
                                    <input type="text" id="password" name="password" className={`form-control ${show && errorMessage.password ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Enter Password' />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>

                                <div className="col-md-6   b-3">
                                    <label htmlFor='cpassword'>Confirm Password*</label>
                                    <input type="text" id="cpassword" name="cpassword" className={`form-control ${show && errorMessage.cpassword ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Enter Confirm Password' />
                                    {show && errorMessage.cpassword ? <p className='text-danger'>{errorMessage.cpassword}</p> : null}
                                </div>


                                <div className="col-md-6   b-3">
                                    <label htmlFor='role'>ROLE</label>
                                    <select name="role" onChange={getInputData} className='form-select border-dark'>
                                        <option value={"USER"} >USER</option>
                                        <option value={"ADMIN"}>ADMIN</option>
                                        <option value={"SUPER ADMIN"}>SUPER ADMIN</option>
                                    </select>
                                </div>

                                <div className="col-6 mb-3">
                                    <label>Status*</label>
                                    <select name="status" onChange={getInputData} className='form-select border-dark'>
                                        <option value={"true"}>
                                            Active
                                        </option>
                                        <option value={"false"}>
                                            In-Active
                                        </option>
                                    </select>
                                </div>
                                {message && (
                                    <div className={`col-12 text-center mb-2 ${message.toLowerCase().includes("success") ? "text-success" : "text-danger"}`}>
                                        <b>{message}</b>
                                    </div>
                                )}
                                <div className="col-12 mb-3">
                                    <button className='btn btn-dark w-100 mt-4' type="submit">Create</button>
                                </div>
                                <Link className='text-dark text-center mb-3' to="/login">Already have account? Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
