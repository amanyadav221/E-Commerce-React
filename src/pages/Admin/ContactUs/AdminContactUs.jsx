
import React, { useEffect } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContactUs, getAllContactUs, updateContactUs } from '../../../Redux/ActionCreators/NewsletterActionCreator'
export default function AdminContactUs() {
  const { contactUs, updateSuccess, deleteSuccess } = useSelector(state => state.ContactUsStateData)

  const dispatch = useDispatch()

  // Fetch data once
  useEffect(() => {
    dispatch(getAllContactUs())
  }, [dispatch, updateSuccess, deleteSuccess])
  useEffect(() => {
    console.log(contactUs)
  }, [contactUs])
  function updateRecord(id) {
    if (window.confirm("Are you sure you want to change Status?")) {
      console.log(id)
      dispatch(updateContactUs(id))
    }
  }
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to Delete?")) {
      console.log(id)
      dispatch(deleteContactUs(id))

    }
  }
  return (
    <>
      <div>
        <Hero title="Admin" />
        <div className="container-fluid my-2">
          <div className="row">
            <div className="col-md-3">
              <AdminSideBar />
            </div>

            <div className="col-md-9">
              <h4 className="bg-dark text-light text-center p-2">
                Admin Contact-Us
              </h4>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr className="text-center">
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactUs.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No Request Found
                        </td>
                      </tr>
                    )}
                    {contactUs.map(val => (
                      <tr key={val.id} className="text-center">
                        <td>{val.id}</td>
                        <td>{val.name}</td>
                        <td>{val.email}</td>
                        <td>{val.phone}</td>
                        <td>{new Date(val.date).toLocaleDateString()}</td>
                        <td>{val.subject}</td>
                        <td>{val.message}</td>
                        <td onClick={() => updateRecord(val.id)} style={{ cursor: 'pointer' }} title='Click to Change Status'>
                          {val.status === "true" ? "Active" : "In-active"}
                        </td>
                        <td>{val.status === 'false' ? <i onClick={() => handleDelete(val.id)} className='bi bi-x btn btn-dark'></i> : null}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
