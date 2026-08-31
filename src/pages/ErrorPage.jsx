import React from 'react'
import Hero from '../components/Hero'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div>
            <main className="main">
                <Hero title="Error Page" />
                <div className="container">
                    <div className="my5 py-5 text-center">
                        <h1>error!! 404 Page Not Found!!!!!</h1>
                        <Link className='btn btn-dark px-5 my-4' to="/">Back To Home</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
