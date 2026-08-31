
import React, { useEffect } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNewsletter, getAllNewsLetter, updateNewsletter } from '../../../Redux/ActionCreators/NewsletterActionCreator'
export default function AdminNewsletter() {
  const newsletters = useSelector(state => state.NewsletterStateData.newsletters)
  const updateSuccess = useSelector(state => state.NewsletterStateData.updateSuccess)
  const deleteSuccess = useSelector(state => state.NewsletterStateData.deleteSuccess)
  const dispatch = useDispatch()

  // Fetch data once
  useEffect(() => {
    dispatch(getAllNewsLetter())
  }, [dispatch, updateSuccess, deleteSuccess])

  function updateRecord(id) {
    if (window.confirm("Are you sure you want to change Status?")) {
      console.log(id)
      dispatch(updateNewsletter(id))
    }
  }
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to Delete?")) {
      console.log(id)
      dispatch(deleteNewsletter(id))

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
                Admin Newsletter
              </h4>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr className="text-center">
                      <th>Id</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletters.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No Newsletter Found
                        </td>
                      </tr>
                    )}
                    {newsletters.map(val => (
                      <tr key={val.id} className="text-center">
                        <td>{val.id}</td>
                        <td>{val.email}</td>
                        <td onClick={() => updateRecord(val.id)} style={{ cursor: 'pointer' }} title='Click to Change Status'>
                          {val.status === "true" ? "Active" : "In-active"}
                        </td>
                        <td><i onClick={() => handleDelete(val.id)} className='bi bi-x btn btn-dark'></i></td>

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
