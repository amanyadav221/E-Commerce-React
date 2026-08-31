import React from 'react'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'

export default function TestimonialPage() {
    return (
        <div>
            <main className="main">
                <Hero title="Testimonials" />
                <div className="container section-title mt-5" data-aos="fade-up">
                    <h2>Testimonials</h2>
                    <p>Here what our happy customers says about their shopping experience. Real review, genuine satisfaction and trusted voices that reflect the quality, service, and reliability E-Mart proudly delevers.</p>
                </div>
                <Testimonials />
            </main>
        </div>
    )
}
