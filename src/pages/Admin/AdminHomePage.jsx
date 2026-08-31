import React, { useEffect } from 'react'
import Hero from '../../components/Hero'
import AdminSideBar from '../AdminSideBar'
import { useDispatch, useSelector } from 'react-redux';
import { getUserByUsername } from '../../Redux/ActionCreators/SecurityCheckActionCreator'
import { Link } from 'react-router-dom'

export default function AdminHomePage() {
    const { username } = useSelector(s => s.LoginStateData);
    let userData = useSelector(state => state.SecurityCheckStateData)
    let dispatch = useDispatch()
    console.log(userData)
    useEffect(() => {
        (() => {
            dispatch(getUserByUsername(username))
        })()
    }, [])
    return (
        <div>
            <Hero title="Admin" />
            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSideBar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='bg-dark text-light text-center p-2'>Admin Profile
                            <Link to={"/admin/my-account"}><i className='float-end bi bi-pencil text-light'></i></Link>
                        </h4>

                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>
                                        Full-Name
                                    </th>
                                    <td>
                                        {userData.fullName}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <tr>Username</tr>
                                    </th>
                                    <td>
                                        {userData.username}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <tr>Email</tr>
                                    </th>
                                    <td>
                                        {userData.email}
                                    </td>
                                </tr>
                                <tr> <th>
                                    <tr>Phone</tr>
                                </th>
                                    <td>
                                        {userData.phone}
                                    </td></tr>
                                <tr>
                                    <th>
                                        <tr>Role</tr>
                                    </th>
                                    <td>
                                        {userData.role}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
