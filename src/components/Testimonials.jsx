import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getAllTestimonialPublic } from "../Redux/ActionCreators/CartActionCreator";
import { useDispatch, useSelector } from "react-redux";

export default function Testimonials({ title, pId }) {
  const dispatch = useDispatch();
  const PublicTestimonialStateData = useSelector(
    (state) => state.PublicTestimonialStateData
  );

  const [review, setReview] = useState([]);

  useEffect(() => {
    dispatch(getAllTestimonialPublic());
  }, []);

  useEffect(() => {
    if (!PublicTestimonialStateData) return;

    let data = PublicTestimonialStateData?.item || [];

    if (title === "Product") {
      data = data.filter((x) => x.productId == pId);
    }

    setReview(data);
  }, [PublicTestimonialStateData, title, pId]);

  return (
    <section className="py-5 bg-light">
      <div className="container text-center mb-4">
        <h2 className="fw-bold">Customer Testimonials</h2>
      </div>

      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
          }}
        >
          {review?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card shadow-sm border-0 h-100 p-4 text-center">

                <h5 className="fw-bold">{item.fullName}</h5>

                <div className="text-warning mb-2">
                  {Array.from({ length: item.rating || 0 }, (_, i) => (
                    <i key={i} className="bi bi-star-fill me-1"></i>
                  ))}
                </div>

                <p className="text-secondary">
                  "{item.message}"
                </p>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
