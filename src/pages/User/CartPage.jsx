import React from 'react'
import Hero from '../../components/Hero'
import Cart from '../../components/Cart'

export default function CartPage() {
  return (
    <div>
      <Hero title="Cart"/>
      <div className='container-fluid'>
        <Cart title="Cart" selected={{}}/>
      </div>
    </div>
  )
}
