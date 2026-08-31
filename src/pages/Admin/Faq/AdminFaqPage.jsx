import React, { useEffect } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link } from 'react-router-dom'
import { getAllFaq, deleteFaq } from "../../../Redux/ActionCreators/FaqActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function AdminFaqPage() {
  const FaqStateData = useSelector(
    state => state.FaqStateData
  )
  const dispatch = useDispatch()
  // Fetch data once
  useEffect(() => {
    dispatch(getAllFaq())
  }, [dispatch])
  const handleDelete = (name) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteFaq({ id: name }))
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
              Admin Faq
              <Link to="/admin/faq/create">
                <i className="bi bi-plus text-light float-end fs-3"></i>
              </Link>
            </h4>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr className="text-center">
                    <th>Id</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {FaqStateData.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No Records Found
                      </td>
                    </tr>
                  )}
                  {FaqStateData.map(val => (

                    <tr key={val.id} className="text-center">
                      <td>{val.id}</td>
                      <td>{val.question}</td>
                      <td>{val.answer}</td>
                      <td>
                        {val.status === "true" ? "Active" : "In-active"}
                      </td>

                      <td>
                        <Link
                          to={`/admin/faq/update/${val.id}`}
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
    </div>
  )
}
