import React from 'react'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import About from '../components/About'
import Features from '../components/Features'

export default function AboutPage() {
    return (
        <main className="main">
            <Hero title="About Us" />
            <Stats />
            <Features />
            <About />

        </main>
    )
}
