import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUsername } from '../../Redux/ActionCreators/SecurityCheckActionCreator'

export default function Profile() {
    const loginData = useSelector(s => s.LoginStateData);
    const userData = useSelector(state => state.SecurityCheckStateData);
    const dispatch = useDispatch();

    const username = loginData?.username || JSON.parse(localStorage.getItem("session") || "{}")?.username;

    useEffect(() => {
        if (username) {
            dispatch(getUserByUsername(username));
        }
    }, [dispatch, username]);

    const displayFullName = userData?.fullName || loginData?.fullName || JSON.parse(localStorage.getItem("session") || "{}")?.fullName || "User";
    const displayUsername = userData?.username || username || "N/A";
    const displayEmail = userData?.email || "N/A";
    const displayPhone = userData?.phone || "N/A";

    return (
        <div className="card p-4 shadow-sm border-0">
            <h4 className="border-bottom pb-3 mb-4 text-dark font-weight-bold">
                <i className="bi bi-person-circle me-2 text-primary"></i>Profile Details
            </h4>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <th style={{ width: "30%" }}>Full Name</th>
                        <td className="fw-bold">{displayFullName}</td>
                    </tr>
                    <tr>
                        <th>Username</th>
                        <td>{displayUsername}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{displayEmail}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{displayPhone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
