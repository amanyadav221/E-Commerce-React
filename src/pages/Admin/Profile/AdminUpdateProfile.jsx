import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUsername, updateUser } from '../../../Redux/ActionCreators/SecurityCheckActionCreator';
import FormValidator from '../../../Validators/FormValidator';
import Hero from '../../../components/Hero';
import AdminSideBar from '../../AdminSideBar';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminUpdateProfile() {
    const { username } = useSelector(s => s.SecurityCheckStateData);
    let userData = useSelector(state => state.SecurityCheckStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let [data, setData] = useState({})

    let [errorMessage, setErrorMessage] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: ""
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
        if (error) {
            setShow(true)
        } else {
            console.log(data)
            dispatch(updateUser(data, username))
            navigate("/admin")
        }
    }
    console.log(userData)
    console.log(username)
    useEffect(() => {
        (() => {

            dispatch(getUserByUsername(userData.username))
            setData(userData)
        })()
    }, [])
    return (

        <div>
            <Hero title="Admin" />
            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSideBar />
                    </div>
                    <div className="col-md-9">
                        <div className="container-fluid my-3">
                            <div className="row ">
                                <div className="col-lg-12 m-auto card shadow">
                                    <h5 className="bg-dark text-light p-2 mt-2 text-center">Update Your Accont
                                        <Link to={"/admin"}><i className='float-end fs-4 bi bi-arrow-left text-light'></i></Link>
                                    </h5>
                                    <form onSubmit={postData}>
                                        <div className="row">
                                            <div className="col-md-6   b-3">
                                                <label htmlFor="fullName">Name*</label>
                                                <input value={data.fullName} type="text" id="fullName" name="fullName" className={`form-control ${show && errorMessage.fullName ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Full Name' />
                                                {show && errorMessage.fullName ? <p className='text-danger'>{errorMessage.fullName}</p> : null}
                                            </div>

                                            <div className="col-md-6   b-3">
                                                <label htmlFor='phone'>Phone*</label>
                                                <input value={data.phone} type="number" id="phone" name="phone" className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Phone Number' />
                                                {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                            </div>

                                            <div className="col-md-6   b-3">
                                                <label htmlFor='username'>UserName*</label>
                                                <input value={data.username} type="text" id="username" name="username" className={`form-control ${show && errorMessage.username ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Enter Username' />
                                                {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                            </div>

                                            <div className="col-md-6   b-3">
                                                <label htmlFor='email'>Email*</label>
                                                <input value={data.email} type="email" id="email" name="email" className={`form-control ${show && errorMessage.email ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Enter Email' />
                                                {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                            </div>
                                            <div className="col-12 mb-3">
                                                <button className='btn btn-dark w-100 mt-4' type="submit">Update</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
