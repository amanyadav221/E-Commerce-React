import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  return (
    <>
      <div className='container my-5'>
        <div className="card p-5 text-center ">
          <h1>Thank you!!!</h1>
          <h6>Your Order has been placed!!</h6>
          <h3>To track your Order please visit Profile Page</h3>
          <div className="btn-group w-50 m-auto ">
            <Link className='btn btn-dark text-light' to="/shop-page">Shop More</Link>
            <Link className='btn btn-success text-light' to="/profile?option=5">Orders</Link>
          </div>
        </div>
      </div>
    </>
  )
}
