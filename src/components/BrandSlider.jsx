import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrand } from '../Redux/ActionCreators/BrandActionCreators';
import { Link } from 'react-router-dom';
export default function BrandSlider() {
  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()
  useEffect(() => {
    (() => dispatch(getAllBrand()))()
  }, [BrandStateData.length])
  let options = {
    slidesPerView: 4,
    spaceBetween: 40,
    pagination: false,
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay]
  }
  return (
    <div>
      <main className="main">
        <section id="clients" className="clients section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <h2 className='text-center p-3'>Our Brands</h2>
            <div className="swiper init-swiper">
              <Swiper {...options}>
                {
                  BrandStateData?.filter(x => x.status == "true")?.map((pic) => {
                    return <SwiperSlide key={pic.id}>
                      <Link to={`/shop?br=${pic.name}`}>
                        <img
                          className='m-1'
                          src={`data:${pic.fileType};base64,${pic.file}`}
                          alt={pic.name}
                          height={50}
                          width={60}
                        />
                      </Link>
                      <Link to={`/shop?br=${pic.name}`}><h3>{pic.name} Product</h3></Link>
                    </SwiperSlide>
                  })
                }
              </Swiper>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
