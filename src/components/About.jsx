import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getAllSetting } from '../Redux/ActionCreators/SettingActionCreators';

export default function About() {
    const setting = useSelector(state => state.SettingStateData);
    let [siteSetting, setSetting] = useState()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllSetting());
    }, [dispatch]);

    useEffect(() => {
        (() => {
            setSetting(setting)
        })()
    }, [setting])
    return (
        <div>
            <main className="main">
                <section id="about" className="about section section-bg dark-background">

                    <div className="container position-relative">

                        <div className="row gy-5">

                            <div className="content col-xl-5 d-flex flex-column" data-aos="fade-up" data-aos-delay="100">
                                <h3>Redifining Fashion For Every Generation</h3>
                                <p>
                                    At {siteSetting?.siteName ? siteSetting.siteName : import.meta.env.VITE_APP_SITE_NAME}, we believe style is more than just clothing---it's an expression of you who are you. From trendy men's collections to elegant women's wear and adorable kid's fashion, we bring you quality, comfort, nad confidence in every piece. Our mission is to make fashion accessible, inspiring, and enjoyabble for everyone.
                                </p>
                                {
                                    window.location.pathname !== "/about" ? <Link to="/about" className="about-btn align-self-center align-self-xl-start"><span>About us</span> <i className="bi bi-chevron-right"></i></Link> : null
                                }
                            </div>

                            <div className="col-xl-7" data-aos="fade-up" data-aos-delay="200">
                                <div className="row gy-4">

                                    <div className="col-md-6 icon-box position-relative">
                                        <i className="bi bi-bullseye"></i>
                                        <h4><a href="#!" className="stretched-link">Our Vision</a></h4>
                                        <p>We aim to make {siteSetting?.siteName ? siteSetting.siteName : import.meta.env.VITE_APP_SITE_NAME} a one stop destination for every fashion need---combining the latest trends,premium quality, and unbeatable prices to redefine the online shoping experience.</p>
                                    </div>

                                    <div className="col-md-6 icon-box position-relative">
                                        <i className="bi bi-shield-check"></i>
                                        <h4><a href="#!" className="stretched-link">Our Promises</a></h4>
                                        <p>We stand by trust, transparency, and timeless style. Every product we offer is crafted with care and delivered with love to ensure your satisfaction.</p>
                                    </div>

                                    <div className="col-md-6 icon-box position-relative">
                                        <i className="bi bi-bag-fill"></i>
                                        <h4><a href="#!" className="stretched-link">Our Collection</a></h4>
                                        <p>From men's essentials to women's elegance and kids' cuteness, our collection celebrates diversity in style - because fashion should firt every age and personality</p>
                                    </div>
                                    <div className="col-md-6 icon-box position-relative">
                                        <i className="bi bi-trophy "></i>
                                        <h4><a href="#!" className="stretched-link">Our Journey</a></h4>
                                        <p>Bom out of a passion for fashion, Shoppers started with a simple goal: to make everyone feel stylish and confident. Today, we continue to grow with our customers, inspired by your trust and loyalty.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>
            </main>
        </div>
    )
}
