import React from 'react'
import Faq from '../components/Faq'
import Hero from '../components/Hero'

export default function FaqPage() {
    return (
        <div>
            <main className="main">
                <Hero title="Faq" />
                <Faq />
            </main>
        </div>
    )
}
