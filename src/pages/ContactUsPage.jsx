import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Contact from '../components/Contact'

export default function ContactUsPage() {
    return (
        <div>
            <main className="main">
                <Hero title="Contact-Us" />
                <Contact />
                <About />
            </main>
        </div>
    )
}
