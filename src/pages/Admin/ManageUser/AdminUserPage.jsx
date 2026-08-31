import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserByAdmin, getAllUser, updateUserStatus } from '../../../Redux/ActionCreators/SecurityCheckActionCreator'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { toast, ToastContainer } from 'react-toastify'

export default function AdminUserPage() {
    let dispatch = useDispatch()
    let UserStateData = useSelector(state => state.GetAllUserStateData)
    let [data, setData] = useState()
    let [id, setId] = useState()
    let [showForm, setShowForm] = useState()
    let [status, setStatus] = useState()
    let [role, setRole] = useState()
    useEffect(() => {
        (() => {
            dispatch(getAllUser())
        })()
    }, [dispatch, UserStateData.updateSuccess, UserStateData.deleteSuccess])
    useEffect(() => {
        setData(UserStateData.user)
    }, [UserStateData])
    function handleUpdate(item) {
        setStatus(item.status)
        setRole(item.role)
        setShowForm(true)
        setId(item.id)
        console.log(item)
    }
    function postData(e) {
        e.preventDefault()
        console.log(status, role)
        let payload = {
            status: status,
            role: role
        }
        console.log(payload)
        dispatch(updateUserStatus(id, payload))
        setId("")
        setStatus("")
        setRole("")
        setShowForm(false)
        toast('Record Updated!!!')
    }
    function handleDelete(item) {
        if (window.confirm('Are you sure want to Delete?')) {
            console.log(item)
            dispatch(deleteUserByAdmin(item.id))

        }
    }

    return (
        <>
            <Hero title="Admin" />
            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSideBar />
                    </div>

                    <div className="col-md-9">
                        <h4 className="bg-dark text-light text-center p-2">
                            Admin User Control
                        </h4>
                        <div className='container-fluid mt-4 mx-0 p-0'>
                            <div className="card shadow">

                                <div className="col-md-12">

                                    <div className="table-responsive">
                                        <h4 className=" text-dark text-center p-1 mb-0">
                                            Registered User
                                        </h4>
                                        <table className="table">
                                            <tr className='border'>
                                                <th className='border text-center'>Id</th>
                                                <th className='border text-center'>Full Name</th>
                                                <th className='border text-center'>Username</th>
                                                <th className='border text-center'>Phone</th>
                                                <th className='border text-center'>Email</th>
                                                <th className='border text-center'>ROLE</th>
                                                <th className='border text-center'>Status</th>
                                                <th className='border text-center'>Action</th>

                                            </tr>
                                            {data?.map(item => {
                                                return <tr key={item.id}>
                                                    <td className='border text-center'>{item.id}</td>
                                                    <td className='border text-center'>{item.fullName}</td>
                                                    <td className='border text-center'>{item.username}</td>
                                                    <td className='border text-center'>{item.phone}</td>
                                                    <td className='border text-center'>{item.email}</td>
                                                    <td className='border text-center'>{item.role}</td>
                                                    <td className='border text-center'>{item.status === "true" ? 'Active' : 'In-Active'}</td>
                                                    <td className='border text-center'>
                                                        <i onClick={() => handleUpdate(item)} className='mx-1 bi bi-pen btn btn-dark'></i>
                                                        <i onClick={() => handleDelete(item)} className='bi bi-x btn btn-dark'></i>
                                                    </td>
                                                </tr>
                                            })}

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={` modal fade ${showForm ? 'show d-block' : ''}`} id="exampleModal" >
                <div className="modal-dialog modal-sm">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Updating User</h5>
                            <button onClick={() => setShowForm(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={postData}>
                                <div className="row">


                                    <div className="col-md-12 mb-4">
                                        <lable htmlFor='status' className={'mx-2 '}>Status</lable>
                                        <select
                                            id='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            className="w-100 mx-2 mt-1 form-select"
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">In-Action</option>
                                        </select>
                                    </div>
                                    <div className="col-lg-12 mb-4">
                                        <label className={'mx-2 '} htmlFor='role'>Role</label>
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-100 mx-2 form-select"
                                        >
                                            <option value="ROLE_USER">USER</option>
                                            <option value="ROLE_ADMIN">ADMIN</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={() => setShowForm(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="submit" className="btn btn-dark">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </>

    )
}
