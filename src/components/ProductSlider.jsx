import React from 'react'

import { Autoplay, Navigation, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'

let options = {
  speed: 400,
  parallex: true,
  //slidesPerView: "auto",
  autoplay:{delay: 2000, disableOnInteraction: false },
  spaceBetween: 20,
  modules: [Autoplay],
 // navigation: true,
  breakpoints: {
    0: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 4 }
  },
}


export default function ProductSlider(props) {
  return (
    <div>
      <section id="team" className="team section section-bg dark-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>{props.title === "Related Products" ? props.title : `Our Latest Products For ${props.title}`}</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        <div className="container">

          <div className="gy-4">
            <Swiper{...options}>
              {
                props.data.map(item => {
                  // console.log(item)
                  // console.log("Hello World")
                  return <SwiperSlide key={item.id}>
                    <div className="d-flex align-items-stretch">
                      <div className="team-member">
                        <div className="member-img">
                          <img src={`data:${item.pics[0].fileType};base64,${item.pics[0].base64}`}
                            style={{ height: 250, width: "100%", objectFit: "cover" }}
                            alt={item.pics[0].name} className="img-fluid" />
                          <div className="social">
                            <a href=""><i className="bi bi-twitter-x"></i></a>
                            <a href=""><i className="bi bi-facebook"></i></a>
                            <a href=""><i className="bi bi-instagram"></i></a>
                            <a href=""><i className="bi bi-linkedin"></i></a>
                          </div>
                        </div>
                        <div className="member-info">
                          <h4 className='text-center'>{item.name}</h4>
                          <span className='text-center fs-6 p-2'><del>&#8377;{item.basePrice}</del>&#8377;{item.finalPrice}<sup>{item.discount}% off</sup></span>
                          <Link to={`/product/${item.id}`}
                            className='btn btn-dark mt-2 d-block text-light text-center w-100'
                            style={{ bottom: 5, right: 2, width: 290 }}
                          >
                            Add To Cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                })
              }
            </Swiper>
          </div>

        </div>

      </section>
    </div>
  )
}
