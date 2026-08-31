import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'
import { getAllBrand, createBrand } from "../../../Redux/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function AdminBrandCreate() {

    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()
    let [category, setCategory] = useState([])
    let [data, setData] = useState({
        name: "",
        pic: "",
        status: "true"
    })
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory!!!",
        pic: "Pic Field is Mandatory!!!"
    })
    useEffect(() => {
        (() => {
            dispatch(getAllBrand())
            if (BrandStateData?.length) {
                setCategory(
                    BrandStateData.map(item => item.name)
                )
                // console.log(category)
            }
        })()
    }, [BrandStateData.length])

    function getInputData(e) {
        let name = e.target.name
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidator(e) : FormValidator(e) })
        let value = name === "pic" ? (e.target.files[0]) : (name === "status" ? e.target.value === "1" ? true : false : e.target.value)
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
            errors.name = "This Main category already exists!"
            hasErr = true
        }

        // name required
        if (!data.name.trim()) {
            errors.name = "Name Field is Mandatory!!!"
            hasErr = true
        }

        // image required
        if (!data.pic) {
            errors.pic = "Pic Field is Mandatory!!!"
            hasErr = true
        }

        //  update UI once
        setErrorMessage(errors)
        setShow(true)

        if (hasErr) return

        //  no errors
        createData()
        navigate("/admin/brand")
    }
    function createData() {
        const formData = new FormData()
        const Brand = {
            name: data.name,
            status: data.status
        }
        formData.append("brand", new Blob([JSON.stringify(Brand)], { type: "application/json" })
        )
        formData.append("file", data.pic)
        try {
            dispatch(createBrand(formData))
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
                        <h4 className='bg-dark text-light text-center p-2'>Admin Brand Create
                            <Link to="/admin/brand"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
                        </h4>
                        <div className="col-12 border-3 border-dark card p-5 mt-4">
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Name*</label>
                                        <input type="text" onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="name" placeholder='Brand Name' />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>

                                    <div className="col-6 mb-3">
                                        <label>Picture*</label>
                                        <input type="file" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="pic" />
                                        {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
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
