import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import { getAllFeature, updateFeature } from '../../../Redux/ActionCreators/FeatureActionCreators'
import { useDispatch, useSelector } from 'react-redux'
export default function AdminFeatureUpdate() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: "true"
    })
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        icon: "",
        shortDescription: ""
    })

    useEffect(() => {
        (() => {
            dispatch(getAllFeature())

        })()
    }, [dispatch])
    useEffect(() => {
        (() => {
            if (FeatureStateData.length) {
                console.log(FeatureStateData, id)
                let item = FeatureStateData.find(x => x.id == id)
                if (item) {
                    setData({ ...data, ...item })
                } else {
                    navigate("/admin/feature")
                }
            }
        })()
    }, [FeatureStateData])
    function getInputData(e) {
        let name = e.target.name
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
        let value = name === "status" ? e.target.value === "true" ? "true" : "false" : e.target.value
        setData({ ...data, [name]: value })
    }
    function postData(e) {
        e.preventDefault()

        let hasErr = false
        const exists = FeatureStateData.some(
            val => val.name.toLowerCase() === data.name.toLowerCase() && val.name.toLowerCase() !== id.toLowerCase()
        )
        if (exists) {
            setErrorMessage({ ...errorMessage, name: "This Feature is already exists!!!!!!" })
            hasErr = true
        }
        let err = Object.values(errorMessage).find(x => x !== "")
        if (err) {
            hasErr = true
            return
        }
        if (hasErr) {
            setShow(true)
            return
        } else {
            try {
                dispatch(updateFeature(id, data))
                navigate("/admin/feature")
            } catch (e) {

            }
        }
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
                        <h4 className='bg-dark text-light text-center p-2'>Update Feature
                            <Link to="/admin/feature"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
                        </h4>
                        <div className="col-12 border-3 border-dark card p-5 mt-4">
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Name*</label>
                                        <input type="text"
                                            value={data.name}
                                            onChange={getInputData}
                                            className={`form-control 
                                         ${show && errorMessage.name ? 'border-3 border-danger' : 'border-2 border-dark'}`}
                                            name="name"
                                            placeholder='Feature' />
                                        {show && errorMessage.name ?
                                            <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label>Short Description*</label>
                                        <textarea value={data.shortDescription} row={3} onChange={getInputData} className={`form-control ${show && errorMessage.shortDescription ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="shortDescription" placeholder='Description' />
                                        {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                                    </div>

                                    <div className="col-6 mb-3">
                                        <label>Icon*</label>
                                        <input type="text" value={data.icon} onChange={getInputData} className={`form-control ${show && errorMessage.icon ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="icon" placeholder='Icon' />
                                        {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>Status*</label>
                                        <select name="status" value={data.status} onChange={getInputData} className='form-select border-dark'>
                                            <option value={"true"}>
                                                Active
                                            </option>
                                            <option value={"false"}>
                                                In-Active
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button className="btn btn-dark w-100" type="submit">Update</button>
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
