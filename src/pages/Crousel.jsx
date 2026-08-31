import React from 'react'
import { Autoplay, Navigation, Pagination, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
export default function Crousel() {

  let options = {
    speed: 600,
    parallex: true,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    loop: true,
    pagination: {
      clickable: true
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Parallax, Pagination, Navigation, Autoplay]
  }

  return (
    <div>
      <main className="main">

        <Swiper {...options}>
          <SwiperSlide>
            <section id="hero" className="hero section">

              <img src="assets/img/banner1.jpeg" alt="" />

              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 >Bettter digital experience with E-Mart</h2>
                    <p >We are team of talented designers making websites with Bootstrap</p>
                    <div className="d-flex mt-4" >
                      <Link href="/about" className="btn-get-started">Get Started</Link>

                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>

          <SwiperSlide>
            <section id="hero" className="hero section">

              <img src="assets/img/banner2.jpeg" alt="" />

              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 >Bettter digital experience with E-Mart</h2>
                    <p >We are team of talented designers making websites with Bootstrap</p>
                    <div className="d-flex mt-4">
                      <Link href="/about" className="btn-get-started">Get Started</Link>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section id="hero" className="hero section">

              <img src="assets/img/banner3.jpeg" alt="" />

              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 >Bettter digital experience with E-Mart</h2>
                    <p >We are team of talented designers making websites with Bootstrap</p>
                    <div className="d-flex mt-4">
                      <Link href="/about" className="btn-get-started">Get Started</Link>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>
          <SwiperSlide>
            <section id="hero" className="hero section">

              <img src="assets/img/banner4.jpeg" alt="" />

              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 >Bettter digital experience with E-Mart</h2>
                    <p  >We are team of talented designers making websites with Bootstrap</p>
                    <div className="d-flex mt-4" >
                      <Link href="/about" className="btn-get-started">Get Started</Link>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>

          <SwiperSlide>
            <section id="hero" className="hero section">

              <img src="assets/img/banner5.jpeg" alt="" />

              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 >Bettter digital experience with E-Mart</h2>
                    <p >We are team of talented designers making websites with Bootstrap</p>
                    <div className="d-flex mt-4" >
                      <Link href="#about" className="btn-get-started">Get Started</Link>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>

        </Swiper>

      </main>
    </div >
  )
}
