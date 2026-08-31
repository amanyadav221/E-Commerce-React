import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFaq } from '../Redux/ActionCreators/FaqActionCreators'

export default function Faq() {
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()
    let [target, setTarget] = useState(0)
    useEffect(() => {
        (() => {
            dispatch(getAllFaq())
        })()
    }, [FaqStateData.length])
    return (
        <div>
            <section id="faq" className="faq section">
                <div className="container section-title" data-aos="fade-up">
                    <h2>Frequently Asked Questions</h2>
                    <p>The FAQ section helps customers quickly find answers to common concerns, improving transparency, saving time, and creating a smooth and confident shopping experience across our platform.</p>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
                            <div className="faq-container">
                                {FaqStateData?.map((item, index) => {
                                    return <div onClick={() => index === target ? setTarget(-1) : setTarget(index)} key={item.question} className={`faq-item ${index === target ? 'faq-active' : ''}`}>
                                        <h3 >{item.question}?</h3>
                                        <div className="faq-content">
                                            <p>{item.answer}.</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right"></i>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
