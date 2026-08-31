import React, { useEffect } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link } from 'react-router-dom'
import { getAllFeature, deleteFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function AdminFeaturePage() {

  const FeatureStateData = useSelector(
    state => state.FeatureStateData
  )

  const dispatch = useDispatch()

  // Fetch data once
  useEffect(() => {
    dispatch(getAllFeature())
  }, [dispatch])

  const handleDelete = (name) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteFeature({ id: name }))
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
              Admin Feature
              <Link to="/admin/feature/create">
                <i className="bi bi-plus text-light float-end fs-3"></i>
              </Link>
            </h4>
            <table className="table table-bordered table-striped">
              <thead>
                <tr className="text-center">
                  <th>Id</th>
                  <th>Name</th>
                  <th>Icon</th>
                  <th>Short Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {FeatureStateData.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Records Found
                    </td>
                  </tr>
                )}
                {FeatureStateData.map(val => (
                  <tr key={val.id} className="text-center">
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td><span className='fs-2 text-center text-dark' dangerouslySetInnerHTML={{ __html: val.icon }}></span></td>
                    <td>{val.shortDescription}</td>
                    <td>
                      {val.status === "true" ? "Active" : "In-active"}
                    </td>

                    <td>
                      <Link
                        to={`/admin/Feature/update/${val.id}`}
                        className="btn btn-dark"
                      >
                        <i className="bi bi-pen"></i>
                      </Link>

                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(val.id)}
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
  )
}
