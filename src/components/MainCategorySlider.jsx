import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useDispatch, useSelector } from 'react-redux';
import { getAllMainCategory } from '../Redux/ActionCreators/MainCategoryActionCreators';
import { Link } from 'react-router-dom';

export default function MainCategorySlider() {
  let MainCategoryStateData = useSelector(state => state.MainCategoryStateData)
  let dispatch = useDispatch()
  useEffect(() => {
    (() => dispatch(getAllMainCategory()))()
  }, [MainCategoryStateData.length])
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
            <h3 className='text-center p-3'>Our Main-Categories</h3>
            <div className="swiper init-swiper">
              <Swiper {...options}>
                {
                  MainCategoryStateData?.filter(x => x.status == "true")?.map((pic) => {
                    return <SwiperSlide key={pic.id}>
                      <Link to={`/shop?mc=${pic.name}`}>
                        <img
                          className='m-1'
                          src={`data:${pic.fileType};base64,${pic.file}`}
                          alt={pic.name}
                          height={80}
                          width={200}
                        />
                      </Link>
                      <Link to={`/shop?mc=${pic.name}`}><h3>{pic.name} Product</h3></Link>
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
