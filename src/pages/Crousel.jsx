import React from 'react'
import { Autoplay, Navigation, Pagination, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'

export default function Crousel() {

  let options = {
    speed: 800,
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    loop: true,
    pagination: {
      clickable: true
    },
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    modules: [Parallax, Pagination, Navigation, Autoplay]
  }

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80",
      title: "Mega Shopping Deals at E-Mart",
      subtitle: "Discover top fashion, gadgets & accessories at up to 50% off."
    },
    {
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
      title: "Exclusive Fashion Collection",
      subtitle: "Upgrade your style with premium trendy apparel & footwear."
    },
    {
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
      title: "Latest Smart Electronics & Devices",
      subtitle: "Explore high performance smartphones, laptops & sound systems."
    }
  ]

  return (
    <div>
      <main className="main">
        <Swiper {...options}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <section id="hero" className="hero section relative" style={{ minHeight: "450px", position: "relative" }}>
                <img 
                  src={slide.img} 
                  alt={slide.title} 
                  style={{ width: "100%", height: "480px", objectFit: "cover", filter: "brightness(0.65)" }} 
                />
                <div className="container" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "5%", zIndex: 10 }}>
                  <div className="row">
                    <div className="col-lg-7 text-white">
                      <h1 className="fw-bold text-white mb-3" style={{ fontSize: "2.5rem", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
                        {slide.title}
                      </h1>
                      <p className="fs-5 text-light mb-4" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                        {slide.subtitle}
                      </p>
                      <div className="d-flex mt-3">
                        <Link to="/shop-page" className="btn btn-dark btn-lg fw-bold text-white border-secondary px-4 shadow">
                          Shop Now <i className="bi bi-arrow-right ms-2 text-white"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  )
}
