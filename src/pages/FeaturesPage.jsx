import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'

export default function FeaturesPage() {
    return (
        <div>
            <main className="main">
                <Hero title="Features" />
                <Features />
            </main>
        </div>
    )
}
