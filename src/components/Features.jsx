import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFeature } from '../Redux/ActionCreators/FeatureActionCreators'

export default function Services() {
  let FeatureStateData = useSelector(state => state.FeatureStateData)
  let dispatch = useDispatch()
  useEffect(() => {
    (() => {
      dispatch(getAllFeature())
    })()
  }, [FeatureStateData.length])
  return (
    <div>
      <section id="services" className="services section section-bg dark-background">

        <div className="container section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>Our platform offers powerful features designed to simplify your shopping experience. From easy navigation and fast checkout to secure payments and real-time order tracking, everything is built to give you speed, safety, and convenience.</p>
        </div>
        <div className="container">

          <div className="row gy-4">

            {
              FeatureStateData?.map((val) => {
                return <div key={val.name} className="col-md-6" data-aos="fade-up" data-aos-delay="100">
                  <div className="service-item d-flex position-relative h-100">
                    <span className='fs-2 me-2 icon flex-shrink-0' dangerouslySetInnerHTML={{ __html: val.icon }}></span>
                    <div>
                      <h4 className="title">{val.name}</h4>
                      <p className="description">{val.shortDescription}</p>
                    </div>
                  </div>
                </div>
              })
            }
          </div>

        </div>

      </section>
    </div>
  )
}
