import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'
import axios from 'axios'
import { getAllBrand, getBrandByName, updateBrand } from '../../../Redux/ActionCreators/BrandActionCreators'
import { useDispatch, useSelector } from 'react-redux'
export default function AdminBrandUpdate() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "Please select Pic!!!!!!",
        status: "true"
    })
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })
    useEffect(() => {
        let time = (() => {
            dispatch(getAllBrand())
            if (BrandStateData.length) {
                let item = BrandStateData.find(x => x.name === id)
                if (item) {
                    setData({ ...data, ...item })
                } else {
                    navigate("/admin/brand")
                }
            }
        })()
        return () => clearTimeout(time)

    }, [BrandStateData.length])
    function getInputData(e) {
        let name = e.target.name
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidator(e) : FormValidator(e) })
        let value = name === "pic" ? (e.target.files[0]) : (name === "status" ? e.target.value === "true" ? "true" : "false" : e.target.value)
        setData({ ...data, [name]: value })


    }
    function postData(e) {
        e.preventDefault()

        let hasErr = false
        const exists = BrandStateData.some(
            val => val.name.toLowerCase() === data.name.toLowerCase() && val.name.toLowerCase() !== id.toLowerCase()
        )
        console.log("Exists : " + exists)

        if (exists) {
            setErrorMessage({ ...errorMessage, name: "This Main category Field is already exists!!!!!!" })
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
                UpdateData()
                navigate("/admin/brand")
            } catch (e) {

            }

        }
    }
    async function UpdateData() {
        const formData = new FormData()
        const Brand = {
            name: data.name,
            status: data.status
        }
        formData.append("brand", new Blob([JSON.stringify(Brand)], { type: "application/json" })
        )

        if (data.file) {
            formData.append("file", data.file);
        }

        try {
            dispatch(updateBrand(id, formData))
        } catch (error) {
            console.log(error)
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
                        <h4 className='bg-dark text-light text-center p-2'>Admin Main Category Update
                            <Link to="/admin/brand"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
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
                                            placeholder='Main Category Name' />
                                        {show && errorMessage.name ?
                                            <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>

                                    <div className="col-6 mb-3">
                                        <label>Picture*</label>
                                        <input type="file" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="pic" />
                                        {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
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
