import React, { useEffect } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link } from 'react-router-dom'
import { getAllProduct, deleteProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function AdminProductPage() {

  const ProductStateData = useSelector(
    state => state.ProductStateData
  )

  const dispatch = useDispatch()

  // Fetch data once
  useEffect(() => {
    console.log("hello")
    dispatch(getAllProduct())
  }, [dispatch])

  const handleDelete = (name) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProduct({ id: name }))
    }
  }
  useEffect(() => {
    let time = (() => {
      let time = setTimeout(() => {
      }, 1000)
      return time
    })()
    return () => clearTimeout(time)
  })

  return (
    <div>
      <Hero title="Admin" />

      <div className="container-fluid my-2">
        <div className="row">

          <div className="col-md-3">
            <AdminSideBar />
          </div>

          <div className="col-md-9">
            <h4 className="bg-dark text-light text-center p-2">
              Admin Product
              <Link to="/admin/product/create">
                <i className="bi bi-plus text-light float-end fs-3"></i>
              </Link>
            </h4>
            <div className="table-responsive">
              <table className="table table-bordered table-striped ">
                <thead>
                  <tr className="text-center">
                    <th>Id</th>
                    <th>Name</th>
                    <th>MainCategory</th>
                    <th>SubCategory</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Base Price</th>
                    <th>Discount</th>
                    <th>Final Price</th>
                    <th>Stock</th>
                    <th>Stock Quantity</th>
                    <th>Pic</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ProductStateData.length === 0 && (
                    <tr>
                      <td colSpan="15" className="text-center">
                        No Records Found
                      </td>
                    </tr>
                  )}
                  {ProductStateData.map(val => (
                    <tr key={val.id} className="text-center">
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.mainCategory?.name}</td>
                      <td>{val.subCategory?.name}</td>
                      <td>{val.brand?.name}</td>
                      <td>{val.color?.join()}</td>
                      <td>{val.size?.join()}</td>
                      <td>&#8377;{val.basePrice}</td>
                      <td>{val.discount}</td>
                      <td>&#8377;{val.finalPrice}</td>
                      <td>{val.stockQuantity > 0 ? "In Stock" : "Out of Stock"}</td>
                      <td>{val.stockQuantity}</td>

                      <td>
                        <div style={{ width: 400 }}> {val.pics?.map((pic) => {
                          return <Link
                            to={`data:${pic.fileType};base64,${pic.base64}`}
                            target="_blank"
                          >
                            <img
                              className='m-1'
                              src={`data:${pic.fileType};base64,${pic.base64}`}
                              alt={pic.name}
                              height={50}
                              width={60}
                            />
                          </Link>
                        })

                        }</div>
                      </td>

                      <td>
                        {val.status === "true" ? "Active" : "In-active"}
                      </td>

                      <td>
                        <Link
                          to={`/admin/product/update/${val.id}`}
                          className="btn btn-dark"
                        >
                          <i className="bi bi-pen"></i>
                        </Link>

                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(val.name)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
