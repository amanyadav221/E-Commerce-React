import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero({ title }) {
  return (
    <div>
      <section className="hero2-section mt-0">
        <h3>{title}</h3>
        <div className='items mt-3'>
          <Link to="/" className="text-light">Home</Link>
          <i className="bi bi-arrow-right mx-4"></i>
          <span>{title}</span>
        </div>
      </section>
    </div>
  )
}
