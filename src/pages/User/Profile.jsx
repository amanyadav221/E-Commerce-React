import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUsername } from '../../Redux/ActionCreators/SecurityCheckActionCreator'

export default function Profile() {
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
            {userData ? <table className="table">
                <tr>
                    <th>Fullname</th>
                    <td>{userData.fullName}</td>
                </tr>
                <tr>
                    <th>
                        Username
                    </th>
                    <td>{userData.username}</td>
                </tr>
                <tr>
                    <th>
                        Email
                    </th>
                    <td>{userData.email}</td>
                </tr>
                <tr>
                    <th>
                        Phone
                    </th>
                    <td>{userData.phone}</td>
                </tr>
            </table> : ""}
        </div>
    )
}
