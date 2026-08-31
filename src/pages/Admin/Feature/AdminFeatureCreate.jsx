import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import { getAllFeature, createFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function AdminFeatureCreate() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()
    let [category, setCategory] = useState([])
    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: "true"
    })
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory!!!",
        icon: "Icon Field is Mandatory!!!",
        shortDescription: "Short Description Field is Mandatory!!!"
    })
    useEffect(() => {
        (() => {
            dispatch(getAllFeature())
            if (FeatureStateData?.length) {
                setCategory(
                    FeatureStateData.map(item => item.name)
                )
            }
        })()
    }, [FeatureStateData.length])

    function getInputData(e) {
        let name = e.target.name
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
        let value = name === "status" ? e.target.value === "1" ? true : false : e.target.value
        setData({ ...data, [name]: value })

    }
    async function postData(e) {
        e.preventDefault()

        let hasErr = false
        let errors = { ...errorMessage }

        // duplicate check
        const exists = category.some(
            val => val.toLowerCase() === data.name.toLowerCase()
        )

        if (exists) {
            errors.name = "This Feature is already exists!"
            hasErr = true
        }

        // name required
        if (!data.name.trim()) {
            errors.name = "Name Field is Mandatory!!!"
            hasErr = true
        }

        // image required
        if (!data.icon) {
            errors.icon = "Icon is Mandatory!!!"
            hasErr = true
        }

        // update UI once
        setErrorMessage(errors)
        setShow(true)

        if (hasErr) return

        // no errors
        try {
            dispatch(createFeature(data))
        } catch (error) {
            console.log(error)
        }
        navigate("/admin/feature")
    }
    let [show, setShow] = useState(false)
    return (
        <div>
            <Hero title="Admin" />
            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSideBar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='bg-dark text-light text-center p-2'>Admin Feature Create
                            <Link to="/admin/feature"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
                        </h4>
                        <div className="col-12 border-3 border-dark card p-5 mt-4">
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Name*</label>
                                        <input type="text" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="name" placeholder='Feature  Name' />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label>Short Description*</label>
                                        <textarea row={3} onChange={getInputData} className={`form-control ${show && errorMessage.shortDescription ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="shortDescription" placeholder='Description' />
                                        {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                                    </div>

                                    <div className="col-6 mb-3">
                                        <label>Icon*</label>
                                        <input type="text" onChange={getInputData} className={`form-control ${show && errorMessage.icon ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="icon" placeholder='Icon' />
                                        {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
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
                                    <div className="col-12 mb-3">
                                        <button className="btn btn-dark w-100" type="submit">Create</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
