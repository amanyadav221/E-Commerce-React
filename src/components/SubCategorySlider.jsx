import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useDispatch, useSelector } from 'react-redux';
import { getAllSubCategory } from '../Redux/ActionCreators/SubCategoryActionCreators';
import { Link } from 'react-router-dom';

export default function SubCategorySlider() {
  let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
  let dispatch = useDispatch()
  useEffect(() => {
    (() => dispatch(getAllSubCategory()))()
  }, [SubCategoryStateData.length])
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
            <h2 className='text-center p-3'>Our Sub-Categories</h2>
            <div className="swiper init-swiper">
              <Swiper {...options}>
                {
                  SubCategoryStateData?.filter(x => x.status == "true")?.map((pic) => {
                    return <SwiperSlide key={pic.id}>
                      <Link to={`/shop?sc=${pic.name}`}>
                        <img
                          className='m-1'
                          src={`data:${pic.fileType};base64,${pic.file}`}
                          alt={pic.name}
                          height={120}
                          width={150}
                        />
                      </Link>
                      <Link to={`/shop?sc=${pic.name}`}><h3 className=''>{pic.name} Product</h3></Link>
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
