import React, { useEffect, useRef, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'
import { deleteImage, getAllProduct, updateProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMainCategory } from '../../../Redux/ActionCreators/MainCategoryActionCreators'
import { getAllSubCategory } from '../../../Redux/ActionCreators/SubCategoryActionCreators'
import { getAllBrand } from '../../../Redux/ActionCreators/BrandActionCreators'
let rte

export default function AdminProductUpdate() {
    let { id } = useParams()
    let refdiv = useRef(null);
    let ProductStateData = useSelector(state => state.ProductStateData)
    let OldPics = useSelector(state =>
        state.ProductStateData.find(p => p.id == id)
    )
    let dispatch = useDispatch()

    let color = ["Red", "Blue", "White", "Green", "Gray", "Purple", "Pink", "Yellow", "Orange", "Cyan", "SkyBlue", "Black"]
    let size = ["XXXL", "XXL", "XL", "LG", "MD", "SM", "XS", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "Free Size"]
    let [data, setData] = useState({
        name: "",
        mainCategory: "",
        subCategory: "",
        brand: "",
        basePrice: "",
        discount: "",
        finalPrice: "",
        description: "",
        stock: "",
        stockQuantity: "",
        pic: [],
        color: [],
        size: [],
        status: "true"
    })
    let MainCategoryStateData = useSelector(state => state.MainCategoryStateData)
    let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: ""
    })
    useEffect(() => {
        (() => {
            dispatch(getAllMainCategory())
        })()
    }, [MainCategoryStateData.length])
    useEffect(() => {
        (() => {
            dispatch(getAllSubCategory())
        })()
    }, [SubCategoryStateData.length])
    useEffect(() => {
        (() => {
            dispatch(getAllBrand())
        })()
    }, [BrandStateData.length])

    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
    }, [])
    useEffect(() => {
        let time = (() => {
            dispatch(getAllProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => id == x.id)
                if (item) {
                    setData({ ...data, ...item })
                    rte.setHTMLCode(item.description);
                } else {
                    navigate("/admin/product")
                }
            }
        })()
        return () => clearTimeout(time)

    }, [ProductStateData.length])
    function getInputData(e) {
        const { name, value, files } = e.target

        let val

        if (name === "pic") {
            val = data.pic.concat(Array.from(files))
        } else if (name === "mainCategory") {
            val = MainCategoryStateData.find(x => x.name === value);
        }
        else if (name === "subCategory") {
            val = SubCategoryStateData.find(x => x.name === value);
        }
        else if (name === "brand") {
            val = BrandStateData.find(x => x.name === value);
        } else if (
            name === "basePrice" ||
            name === "discount" ||
            name === "stockQuantity"
        ) {
            val = value === "" ? "" : Number(value)
        } else if (name === "status" || name === "stock") {
            val = value === "true"
        } else {
            val = value
        }
        //  UPDATE STATE (THIS WAS MISSING)
        setData(prev => ({
            ...prev,
            [name]: val
        }))

        //  Validation (optional but recommended)
        setErrorMessage(prev => ({
            ...prev,
            [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
        }))
    }
    function getInputCheckBox(field, value) {
        const temp = data[field]  //  works for color & size

        let updated;

        if (temp.includes(value)) {
            updated = temp.filter(x => x !== value)  // remove
        } else {
            updated = [...temp, value]              // add
        }

        setData({
            ...data,
            [field]: updated
        });
        setErrorMessage(prev => ({
            ...prev,
            [field]: updated.length === 0
                ? `Please select atleast one ${field}!!!`
                : ""
        }))
    }

    function postData(e) {
        e.preventDefault()

        let hasErr = false
        const exists = ProductStateData.some(
            val => val.id == data.id && val.id != id
        )
        if (exists) {
            setErrorMessage({ ...errorMessage, name: "This Product Name is already exists!!!!!!" })
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
                navigate("/admin/product")
            } catch (e) {

            }

        }
    }
    async function UpdateData() {
        const formData = new FormData();
        let bp = parseInt(data.basePrice)
        let d = parseInt(data.discount)
        let finalP = parseInt(bp - bp * d / 100)
        let stockQntt = parseInt(data.stockQuantity)
        //  full product object (JSON)
        const product = {
            name: data.name,
            mainCategory: data.mainCategory ? data.mainCategory.name : MainCategoryStateData[0].name,
            subCategory: data.subCategory ? data.subCategory.name : SubCategoryStateData[0].name,
            brand: data.brand ? data.brand.name : BrandStateData[0].name,
            basePrice: bp,
            discount: d,
            finalPrice: finalP,
            description: rte.getHTMLCode(),
            stock: data.stock,
            stockQuantity: stockQntt,
            color: data.color,
            size: data.size,
            status: data.status
        }
        formData.append(
            "product",
            new Blob([JSON.stringify(product)], { type: "application/json" })
        );

        data.pic.forEach(file => {
            formData.append("files", file);
        });
        try {
            dispatch(updateProduct(id, formData))
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = ((imageId) => {
        if (window.confirm("Are you sure you want to delete?")) {
            dispatch(deleteImage({
                imageId: imageId,
                productId: id
            }))
        }
    })
    let [show, setShow] = useState(false)
    return (

        <div>
            <div>
                <Hero title="Admin" />
                <div className="container-fluid my-2">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminSideBar />
                        </div>
                        <div className="col-md-9">
                            <h4 className='bg-dark text-light text-center p-2'>Admin Product Update
                                <Link to="/admin/product"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
                            </h4>
                            <div className="col-12 border-3 border-dark card p-5 mt-4">
                                <form onSubmit={postData}>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label className='form-label'>Name*</label>
                                            <input type="text" value={data.name} onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="name" placeholder='Product Name' />
                                            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label className='form-label' for="mainCategory">Main Category*</label>
                                            <select value={data.mainCategory.name} name="mainCategory" onChange={getInputData} className='form-select form-control'>{MainCategoryStateData.map(item => {
                                                return <option key={item.name}>{item.name}</option>
                                            })}</select>
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label className='form-label' for="subCategory">Sub Category*</label>
                                            <select value={data.subCategory.name} name="subCategory" onChange={getInputData} className='form-select form-control'>{SubCategoryStateData.map(item => {
                                                return <option key={item.name}>{item.name}</option>
                                            })}</select>
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label className='form-label' for="brand">Brand*</label>
                                            <select value={data.brand.name} name="brand" onChange={getInputData} className='form-select form-control'>{BrandStateData.map(item => {
                                                return <option key={item.name}>{item.name}</option>
                                            })}</select>
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label className='form-label'>Stock*</label>
                                            <select name="stock" onChange={getInputData} className='form-select border-dark'>
                                                <option value={"true"}>
                                                    In Stock
                                                </option>
                                                <option value={"false"}>
                                                    Out of Stock
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="color" className="form-label">
                                                Color*
                                            </label>
                                            <div className="row border-dark border-1 border mx-1 rounded p-2">
                                                {color.map((item, index) => {
                                                    return <div className="col-xl-2 col-lg-3 col-md-4">
                                                        <input onChange={() => getInputCheckBox('color', item)} type="checkbox" name={item.name} id="color" className='form-check-input border-dark' checked={data.color.includes(item)} />
                                                        <label>&nbsp;&nbsp;{item}</label>
                                                    </div>

                                                })}

                                            </div>
                                        </div>
                                        {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}


                                        <div className="col-12 mb-3">
                                            <label htmlFor="size" className="form-label">
                                                Size*
                                            </label>
                                            <div className="row border-dark border-1 border mx-1 rounded p-2">
                                                {size.map((item, index) => {
                                                    return <div className="col-xl-2 col-lg-3 col-md-4">
                                                        <input onChange={() => getInputCheckBox('size', item)} type="checkbox" name={item.name} id="size" className='form-check-input border-dark' checked={data.size.includes(item)} />
                                                        <label>&nbsp;&nbsp;{item}</label>
                                                    </div>
                                                })}
                                            </div>
                                            {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                                        </div>

                                        <div className="col-6 mb-3">
                                            <label className='form-label'>Base Price*</label>
                                            <input value={data.basePrice} type="number" onChange={getInputData} className={`form-control ${show && errorMessage.basePrice ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="basePrice" placeholder='Base price' />
                                            {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                        </div>


                                        <div className="col-6 mb-3">
                                            <label className='form-label'>Discount*</label>
                                            <input value={data.discount} type="number" onChange={getInputData} className={`form-control ${show && errorMessage.discount ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="discount" placeholder='Discount' />
                                            {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                        </div>

                                        <div className="col-12 mb-3">
                                            <label className='form-label'>Description*</label>
                                            <div className='border border-dark' ref={refdiv}></div>

                                            {show && errorMessage.description && (
                                                <p className="text-danger">{errorMessage.description}</p>
                                            )}
                                        </div>


                                        <div className="col-6 mb-3">
                                            <label className='form-label'>Stock Quantity*</label>
                                            <input value={data.stockQuantity} type="number" onChange={getInputData} className={`form-control ${show && errorMessage.stockQuantity ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="stockQuantity" placeholder='Product Stock Quantity' />
                                            {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                        </div>

                                        <div className="col-6 mb-4">
                                            <label className='form-label'>Status*</label>
                                            <select value={data.status} name="status" onChange={getInputData} className='form-select border-dark'>
                                                <option value={"true"}>
                                                    Active
                                                </option>
                                                <option value={"false"}>
                                                    In-Active
                                                </option>
                                            </select>
                                        </div>
                                        <div className="col-6 mb-4">
                                            <label className='form-label'>Picture*</label>
                                            <input type="file" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-3 border-danger' : 'border-2 border-dark'}`} name="pic" />
                                            {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
                                        </div>

                                        <div className="col-6 mb-4">
                                            <label>Old Pic</label>
                                            <div style={{ width: 400 }}>
                                                {OldPics?.pics?.map((pic) => {
                                                    return <img key={id} onClick={() => handleDelete(pic.id)}
                                                        className='m-1'
                                                        src={`data:${pic.fileType};base64,${pic.base64}`}
                                                        alt={pic.name}
                                                        height={50}
                                                        width={60}
                                                    />
                                                })

                                                }
                                            </div>
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
        </div>
    )
}
