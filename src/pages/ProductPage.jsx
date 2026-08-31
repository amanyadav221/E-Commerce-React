import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../Redux/ActionCreators/ProductActionCreators'
import { Autoplay, Pagination, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import ProductSlider from '../components/ProductSlider'
import {
    addToCartItem,
    addToWishlistItem,
    getMyCart,
    getTestimonialByProductId
} from '../Redux/ActionCreators/CartActionCreator'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Testimonials from '../components/Testimonials'

export default function ProductPage() {
    const { items } = useSelector(state => state.CartReducerStateData)
    let { deleteSuccess, addSuccess } = useSelector(state => state.CartReducerStateData)
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const ProductStateData = useSelector(state => state.ProductStateData)
    const TestimonialStateData = useSelector(state => state.TestimonialStateData)

    const [data, setData] = useState(null)
    const [relatedProduct, setRelatedProduct] = useState([])
    const [selected, setSelected] = useState({
        quantity: 1,
        color: '',
        size: ''
    })
    const [review, setReview] = useState({
        data: [],
        stats: {},
        total: 0,
        average: 0
    })
    useEffect(() => {
        dispatch(getMyCart())
    }, [dispatch, deleteSuccess, addSuccess])
    /* ================= LOAD DATA ================= */
    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(getTestimonialByProductId(id))
    }, [dispatch, id, TestimonialStateData.addSuccess])
    /* ================= SET PRODUCT ================= */
    useEffect(() => {
        if (!Array.isArray(ProductStateData) || ProductStateData.length === 0) return

        const productId = Number(id)
        const item = ProductStateData.find(p => p.id === productId)

        if (!item) {
            navigate('/shop-page')
            return
        }
        setData(item)
        setSelected(prev => ({
            ...prev,
            color: item.color?.[0] || '',
            size: item.size?.[0] || ''
        }))

        setRelatedProduct(
            ProductStateData.filter(
                p => p.mainCategory?.name === item.mainCategory?.name && p.id !== productId
            )
        )
    }, [ProductStateData, id, navigate])

    /* ================= REVIEWS ================= */
    useEffect(() => {
        if (!TestimonialStateData?.item || !data?.id) return

        const filtered = TestimonialStateData.item.filter(r => r.pId === data.id)
        if (!filtered.length) return
        let stats = {}
        let sum = 0

        filtered.forEach(r => {
            stats[r.rating] = (stats[r.rating] || 0) + 1
            sum += r.rating
        })
        setReview({
            data: filtered,
            stats,
            total: filtered.length,
            average: (sum / filtered.length).toFixed(1)
        })
    }, [TestimonialStateData, data?.id])

    /* ================= ACTIONS ================= */
    function addToCart() {
        dispatch(addToCartItem({ productId: data.id, ...selected }))
        toast.success('Item added to cart!')
        navigate('/cart')
    }

    function addToWishlist() {
        dispatch(addToWishlistItem({ productId: data.id, ...selected }))
        toast.success('Item added to wishlist!')
        navigate('/profile?option=4')
    }
    function checkInCart(id) {
        let flag = false
        items?.forEach(element => {
            console.log(element.productId, id)
            if (element.productId === id)
                flag = true
        })
        return flag
    }

    if (!data) return null

    /* ================= UI ================= */
    return (
        <div>
            <main className="main">
                <Hero title={data.name} />

                <div className="container-fluid my-3">
                    <div className="row">

                        {/* IMAGE SLIDER */}
                        <div className="col-lg-6 py-5">
                            <Swiper
                                speed={600}
                                loop
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                pagination={{ clickable: true }}
                                modules={[Parallax, Pagination, Autoplay]}
                            >
                                {data.pics?.map((pic, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={`data:${pic.fileType};base64,${pic.base64}`}
                                            alt={pic.name}
                                            style={{ width: '100%', height: 600, objectFit: 'contain' }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="col-lg-6">
                            <table className="table border">
                                <tbody>

                                    <tr><th>Name</th><td>{data.name}</td></tr>
                                    <tr><th>Main Category</th><td>{data.mainCategory?.name}</td></tr>
                                    <tr><th>Sub Category</th><td>{data.subCategory?.name}</td></tr>
                                    <tr><th>Brand</th><td>{data.brand?.name}</td></tr>

                                    <tr>
                                        <th>Price</th>
                                        <td>
                                            <del className="text-danger">₹{data.basePrice}</del>{' '}
                                            ₹{data.finalPrice}{' '}
                                            <sup>{data.discount}% off</sup>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Stock</th>
                                        <td className={data.stockQuantity ? '' : 'text-danger'}>
                                            {data.stockQuantity ? `${data.stockQuantity} items left` : 'Out of Stock'}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Color</th>
                                        <td>
                                            {data.color?.map((c, i) => (
                                                <button
                                                    key={i}
                                                    className={`btn btn-sm mx-1 ${selected.color === c ? 'btn-dark' : 'btn-outline-secondary'}`}
                                                    onClick={() => setSelected(prev => ({ ...prev, color: c }))}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Size</th>
                                        <td>
                                            {data.size?.map((s, i) => (
                                                <button
                                                    key={i}
                                                    className={`btn btn-sm mx-1 ${selected.size === s ? 'btn-dark' : 'btn-outline-secondary'}`}
                                                    onClick={() => setSelected(prev => ({ ...prev, size: s }))}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2}>
                                            <div className="d-flex">
                                                {
                                                    checkInCart(data.id) ?
                                                        <Link
                                                            className="btn btn-dark me-2"
                                                            disabled={!data.stockQuantity}
                                                            to="/cart"
                                                        >
                                                            (already in cart) View Cart
                                                        </Link>
                                                        :
                                                        <button
                                                            className="btn btn-dark me-2"
                                                            disabled={!data.stockQuantity}
                                                            onClick={addToCart}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                }

                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={addToWishlist}
                                                >
                                                    Add to Wishlist
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Description</th>
                                        <td dangerouslySetInnerHTML={{ __html: data.description }} />
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* REVIEWS */}

                    <div className="container my-3">
                        <div className="row my-5" >
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className=" card p-3  text-center col-lg-5">
                                        <h6>Customer Reviews</h6>
                                        <h3> {review.average}⭐  </h3>
                                        <h5>({review.total} reviews)</h5>
                                    </div>

                                    <div className="card p-3 col-lg-6">
                                        <div className="row">
                                            <div className="col-4">
                                                <h5>5 ⭐ ({review.stats[5] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role='progressbar' aria-label='Basic example' aria-valuenow={review.stats[5] / review.total * 100} aria-valuemax='100'>
                                                    <div className="progress-bar" style={{ width: `${review.stats[5] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4">
                                                <h5>4 ⭐ ({review.stats[4] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role='progressbar' aria-label='Basic example' aria-valuenow={review.stats[4] / review.total * 100} aria-valuemax='100'>
                                                    <div className="progress-bar" style={{ width: `${review.stats[4] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4">
                                                <h5>3 ⭐ ({review.stats[3] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role='progressbar' aria-label='Basic example' aria-valuenow={review.stats[3] / review.total * 100} aria-valuemax='100'>
                                                    <div className="progress-bar" style={{ width: `${review.stats[3] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4">
                                                <h5>2 ⭐ ({review.stats[2] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role='progressbar' aria-label='Basic example' aria-valuenow={review.stats[2] / review.total * 100} aria-valuemax='100'>
                                                    <div className="progress-bar" style={{ width: `${review.stats[2] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-4">
                                                <h5>1 ⭐ ({review.stats[1] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role='progressbar' aria-label='Basic example' aria-valuenow={review.stats[1] / review.total * 100} aria-valuemax='100'>
                                                    <div className="progress-bar" style={{ width: `${review.stats[1] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <Testimonials title='Product' pId={id} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* RELATED PRODUCTS */}
                    <ProductSlider title="Related Products" data={relatedProduct} />
                    <ToastContainer />
                </div>
            </main>
        </div>
    )
}
