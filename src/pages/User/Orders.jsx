import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTestimonials, deleteMyTestimonials, getAllCheckout, getMyTestimonial, updateMyTestimonial } from '../../Redux/ActionCreators/CartActionCreator'
import { getAllProduct } from '../../Redux/ActionCreators/ProductActionCreators'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Orders() {
  const { orders } = useSelector(state => state.CheckoutStateData)
  const ProductStateData = useSelector(state => state.ProductStateData)
  const dispatch = useDispatch()
  const [finalOrders, setFinalOrders] = useState([])
  let [showForm, setShowForm] = useState(false)
  let [btnOp, setBtnOp] = useState("Create")
  let Testimonial = useSelector(state => state.TestimonialStateData)
  let [myReview, setReview] = useState()
  let reviewDataOption = {
    message: "",
    rating: 5,
    pId: '',
    checkoutId: ''
  }
  let [reviewData, setReviewData] = useState(reviewDataOption)

  useEffect(() => {
    dispatch(getAllCheckout())
    dispatch(getAllProduct())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMyTestimonial())
  }, [Testimonial.addSuccess, Testimonial.updateSuccess, Testimonial.deleteSuccess])

  useEffect(() => {
    setReview(Testimonial.item)
  }, [Testimonial])
  useEffect(() => {
    if (!orders?.length || !ProductStateData?.length) return
    const normalized = orders.map(o => {
      const items = o.productId.map((pid, i) => {
        const product = ProductStateData.find(p => p.id === pid)
        return {
          ...product,
          color: o.color[i],
          size: o.size[i],
          quantity: o.quantity[i],
          price: o.price[i],
          totalPrice: o.totalPrice[i]
        }
      })
      return {
        checkoutId: o.checkoutId,
        dateOfOrder: o.dateOfOrder,
        orderStatus: o.orderStatus,
        paymentMode: o.paymentMode,
        paymentStatus: o.paymentStatus,
        shipping: o.shipping,
        subTotal: o.subTotal,
        total: o.total,
        items
      }
    })
    setFinalOrders(normalized)
  }, [orders, ProductStateData])
  function checkReview(pId, id) {
    let item = myReview?.find(x => x.checkoutId == id && x.pId === pId)
    return item ? true : false
  }
  function getInputData(e) {
    let { name, value } = e.target
    setReviewData({ ...reviewData, [name]: value })
  }

  function writeReview(id, checkoutId) {
    setBtnOp("Create")
    setReviewData({ ...reviewData, pId: id, checkoutId: checkoutId })
    checkReview(id, checkoutId)
    setShowForm(true)
  }
  function postData(e) {
    e.preventDefault()
    if (btnOp === "Create") {
      dispatch(createTestimonials(reviewData))
      toast('Review Submitted!!!')
    } else {
      dispatch(updateMyTestimonial(reviewData))
      toast('Review Updated!!!')
    }
    setShowForm(false)
    setReviewData(reviewDataOption)
  }
  function editReview(id) {
    setBtnOp("Update")
    let item = myReview.find(x => x.pId == id)
    setReviewData(item)
    setShowForm(true)
  }
  function handleCloseModal() {
    setShowForm(false)
    setReviewData(reviewDataOption)
  }
  function deleteReview(id) {
    let item = myReview.find(x => x.pId == id)
    if (item) {
      if (window.confirm('Are you sure want to delete Review?')) {
        dispatch(deleteMyTestimonials(item.pId))
        toast('Review Deleted...')
      }
      else
        return
    } else {
      toast('No review found for this product. Please write review')
    }
  }
  return (
    <div className="container my-4">
      {finalOrders.map(order => (
        <div key={order.checkoutId} className="card shadow-lg p-3 mb-4">
          {/* ORDER HEADER */}
          <div className="row border-bottom pb-2 mb-3">
            <div className="col-md-4">
              <b>Order ID:</b> {order.checkoutId}<br />
              <b>Date:</b> {new Date(order.dateOfOrder).toLocaleString()}<br />
              <b>Status:</b> {order.orderStatus}
            </div>

            <div className="col-md-4">
              <b>Payment:</b> {order.paymentMode}<br />
              <b>Payment Status:</b> {order.paymentStatus}<br />
              <b>Shipping:</b> ₹{order.shipping}
            </div>

            <div className="col-md-4 text-end">
              <b>Sub Total:</b> ₹{order.subTotal}<br />
              <b>Total:</b> ₹{order.total}
            </div>
          </div>

          {/* PRODUCTS */}
          {order.items.map((p, i) => (
            <div key={i} className="row align-items-center border-bottom py-1">
              <div className="col-md-1">
                <img
                  src={`data:${p.pics[0].fileType};base64,${p.pics[0].base64}`}
                  className="img-fluid"
                  style={{ maxHeight: 80 }}
                />
              </div>
              {console.log(order)}
              <div className="col-md-3 ">
                <h6>{p.name}</h6>
                <small>{p.brand?.name}</small>
              </div>

              <div className="col-md-2">
                Color: {p.color}<br />
                Size: {p.size}
              </div>

              <div className="col-md-1 text-center">
                Qty: {p.quantity}
              </div>

              <div className="col-md-2 text-center">
                ₹{p.totalPrice}
              </div>

              <div className="col-md-2 d-flex justify-content-end">

                <Link to={`/product/${p.id}`} className="btn btn-sm btn-outline-dark">
                  Buy Again
                </Link>
              </div>
              {order.orderStatus === "Delivered" && (
                <div className="col-md-3 mt-2 d-flex mx-5 justify-content-end">
                  {console.log(order)}
                  {checkReview(p.id, order.checkoutId) ? (
                    <div className="btn-group">
                      <button
                        onClick={() => editReview(p.id)}
                        className="btn mx-2 btn-outline-dark"
                      >
                        Edit Review
                      </button>

                      <button
                        onClick={() => deleteReview(p.id)}
                        className="btn btn-outline-danger"
                      >
                        Delete Review
                      </button>
                    </div>
                  ) : (

                    <button
                      onClick={() => writeReview(p.id, order.checkoutId)}
                      className="btn mx-5 btn-sm btn-outline-dark"
                    >
                      Review
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      <div className={` modal fade ${showForm ? 'show d-block' : ''}`} id="exampleModal" >
        <div className="modal-dialog">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title text-center w-100" id="exampleModalLabel">{btnOp} Review</h5>
              <button onClick={handleCloseModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postData}>
                <div className="row">

                  <div className="col-lg-12 mb-4">
                    <label className={'mx-1 pb-1 '} htmlFor='message'>Write Review*</label>
                    <textarea onChange={getInputData} value={reviewData.message} placeholder='Please write your review for this product.' className='form-control' id='message' name='message' rows={5}></textarea>
                  </div>
                  <div className="col-md-12 mb-4">
                    <lable htmlFor='rating' className={'mx-2 '}>Rating*</lable>
                    <select
                      id='rating'
                      name='rating'
                      value={reviewData.rating}
                      onChange={getInputData}
                      className="w-100 mx-2 mt-1 form-select"
                    >
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-dark">{btnOp === "Create" ? 'Submit' : 'Update'}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}
