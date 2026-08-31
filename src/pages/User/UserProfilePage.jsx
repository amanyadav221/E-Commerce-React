import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import { Link, useSearchParams } from 'react-router-dom'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import ManageAddress from './ManageAddress'
import Wishlist from './Wishlist'
import Orders from './Orders'
import Cart from '../../components/Cart'

export default function UserProfilePage() {
  let [seacrhParams] = useSearchParams()
  let [option, setOption] = useState(1)
  let pages = ["Your Profile", "Update Profile", "Manage Address", "Your Wishlist", "Your Orders", "Your Cart Items"]
  useEffect(() => {
    setOption(parseInt(seacrhParams.get("option") ?? 1))
  }, [seacrhParams])
  return (
    <>
      <Hero title="User Profile Page" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-2">
            <ul className="list-group">
              <li className={`list-group-item ${option === 1 ? 'bg-dark text-light' : ''} `} onClick={() => setOption(1)} >Home</li>
              <li className={`list-group-item ${option === 2 ? 'bg-dark text-light' : ''} `} onClick={() => setOption(2)}>Update Profile</li>
              <li className={`list-group-item ${option === 3 ? 'bg-dark text-light' : ''} `} onClick={() => setOption(3)}>Manage Address</li>
              <li className={`list-group-item ${option === 4 ? 'bg-dark text-light' : ''} `} onClick={() => setOption(4)}>Wishlist</li>
              <li className={`list-group-item ${option === 5 ? 'bg-dark text-light' : ''} `} onClick={() => setOption(5)}>Orders</li>
              <li className={`list-group-item ${option == 6 ? 'bg-dark text-light' : ''} `} onClick={() => setOption(6)}>Cart</li>
              <li className={`list-group-item ${option === 7 ? 'bg-dark text-light' : ''} `} onClick={() => setOption(7)}>Checkouts</li>
            </ul>

          </div>

          <div className="col-md-10">
            <h5 className="bg-dark text-light p-2 text-center">{pages[option - 1]}</h5>
            {option === 1 ? <Profile /> : null}
            {option === 2 ? <UpdateProfile goHome={() => setOption(1)} /> : null}
            {option === 3 ? <ManageAddress /> : null}
            {option === 4 ? <Wishlist /> : null}
            {option === 5 ? <Orders /> : null}
            {option === 6 ? <Cart title="Cart" /> : null}

          </div>
        </div>
      </div>
    </>
  )
}
