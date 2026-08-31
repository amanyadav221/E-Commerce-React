import React, { useEffect } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link } from 'react-router-dom'
import { getAllMainCategory, deleteMainCategory } from "../../../Redux/ActionCreators/MainCategoryActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function AdminMainCategoryPage() {

  const MainCategoryStateData = useSelector(
    state => state.MainCategoryStateData
  )
  const dispatch = useDispatch()
  // Fetch data once
  useEffect(() => {
    dispatch(getAllMainCategory())
  }, [dispatch])

  const handleDelete = (name) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteMainCategory({ id: name }))
    }
  }

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
              Admin Main Category
              <Link to="/admin/main-category/create">
                <i className="bi bi-plus text-light float-end fs-3"></i>
              </Link>
            </h4>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr className="text-center">
                    <th>Name</th>
                    <th>Pic</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MainCategoryStateData.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No Records Found
                      </td>
                    </tr>
                  )}
                  {MainCategoryStateData.map(val => (
                    <tr key={val.name} className="text-center">
                      <td>{val.name}</td>

                      <td>
                        {val.fileType && val.file ? (
                          <Link
                            to={`data:${val.fileType};base64,${val.file}`}
                            target="_blank"
                          >
                            <img
                              src={`data:${val.fileType};base64,${val.file}`}
                              alt={val.name}
                              height={50}
                            />
                          </Link>
                        ) : (
                          <span className="badge bg-secondary">No Image</span>
                        )}
                      </td>

                      <td>
                        {val.status === "true" ? "Active" : "In-active"}
                      </td>

                      <td>
                        <Link
                          to={`/admin/main-category/update/${val.name}`}
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
