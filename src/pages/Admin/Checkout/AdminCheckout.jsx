import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminGetAllCheckout, updateCheckout } from '../../../Redux/ActionCreators/CartActionCreator'
import { getAllProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { adminGetAllAddress } from '../../../Redux/ActionCreators/SecurityCheckActionCreator'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'

export default function AdminCheckout() {

  const { orders, updateSuccess } = useSelector(state => state.CheckoutStateData)
  const ProductStateData = useSelector(state => state.ProductStateData)
  const { address } = useSelector(state => state.AddressStateData)
  let [data, setData] = useState()
  const dispatch = useDispatch()

  const [finalOrders, setFinalOrders] = useState([])
  const [showMore, setShowMore] = useState({})
  let [showForm, setShowForm] = useState()
  let [orderStatus, setOrderStatus] = useState()
  let [paymentStatus, setPaymentStatus] = useState()

  /* FETCH ALL DATA */
  useEffect(() => {
    dispatch(adminGetAllCheckout())
    dispatch(getAllProduct())
    dispatch(adminGetAllAddress())
  }, [dispatch, updateSuccess])

  /* NORMALIZE ONLY PRODUCT DATA (SAFE ON REFRESH) */
  useEffect(() => {
    console.log("Addressss", address)
    if (!orders?.length || !ProductStateData?.length) return

    const normalized = orders.map(o => {
      const items = o.productId.map((pid, i) => {
        const product = ProductStateData.find(p => p.id === pid)
        return {
          ...product,
          color: o.color[i],
          size: o.size[i],
          quantity: o.quantity[i],
          totalPrice: o.totalPrice[i]
        }
      })

      return {
        ...o,
        items
      }
    })

    setFinalOrders(normalized)
  }, [orders, ProductStateData])

  const toggleShowMore = (orderId) => {
    setShowMore(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }))
  }

  function handleUpdate(order) {
    setData(order)
    setShowForm(true)
    setOrderStatus(order.orderStatus)
    setPaymentStatus(order.paymentStatus)
    console.log(order.checkoutId)
    console.log(order.checkoutId)
    console.log(orderStatus)
    console.log(paymentStatus)
  }
  function postData(e) {
    e.preventDefault()
    let payload = {
      orderStatus: orderStatus,
      paymentStatus: paymentStatus
    }
    dispatch(updateCheckout(data.checkoutId, payload))
    setShowForm(false)
    setOrderStatus("")
    setPaymentStatus("")
  }
  return (



    <div>
      <Hero title="Admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSideBar />
          </div>
          <div className="col-md-9">
            <h4 className="bg-dark text-light text-center p-2">
              Admin Checkout Page
            </h4>
            <div className="container p-3 ">
              {finalOrders.length === 0 && (
                <div className="text-center text-muted">
                  Loading orders...
                </div>
              )}
              {finalOrders.map(order => (
                <div key={order.checkoutId} className="card shadow-lg p-3 mb-4">

                  {/* ================= ORDER HEADER ================= */}
                  <div className="row border-bottom pb-3 mb-3">

                    <div className="col-md-3">
                      <b>Order ID:</b> {order.checkoutId}<br />
                      <b>Date:</b> {new Date(order.dateOfOrder).toLocaleString()}<br />
                      <b>Status:</b> {order.orderStatus}

                    </div>

                    <div className="col-md-3">
                      <b>Payment:</b> {order.paymentMode}<br />
                      <b>Payment Status:</b> {order.paymentStatus}<br />
                      <b>Shipping:</b> ₹{order.shipping}
                    </div>

                    {/* ================= ADDRESS ================= */}
                    <div className="col-md-3">
                      <b>Delivery Address:</b><br />

                      {(() => {
                        const add = address?.find(
                          a => a.id === order.addressId
                        )

                        return add ? (
                          <>
                            {add.name}<br />
                            {add.hno}, {add.landmark}<br />
                            {add.city}, {add.state}<br />
                            {add.pincode}
                            📞 {add.phone}
                          </>
                        ) : (
                          <span className="text-muted">
                            Loading address...
                          </span>
                        )
                      })()}
                    </div>

                    <div className="col-md-3 text-end">
                      <b>Sub Total:</b> ₹{order.subTotal}<br />
                      <b>Total:</b> ₹{order.total}<br />{console.log(order)}

                      <div className="">
                        <button
                          className="btn btn-dark my-2"
                          onClick={() => toggleShowMore(order.checkoutId)}
                        >
                          {showMore[order.checkoutId]
                            ? 'Hide Products'
                            : 'Show Products'}
                        </button>
                        <br />
                        <button onClick={() => handleUpdate(order)} className='btn btn-dark px-3'>
                          Update Status
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* ================= PRODUCTS ================= */}
                  {showMore[order.checkoutId] &&
                    order.items.map((p, i) => (
                      <div key={i} className="row align-items-center border-bottom py-2">

                        <div className="col-md-2">
                          <img
                            src={`data:${p?.pics?.[0]?.fileType};base64,${p?.pics?.[0]?.base64}`}
                            className="img-fluid"
                            style={{ maxHeight: 80 }}
                            alt={p?.name}
                          />
                        </div>

                        <div className="col-md-4">
                          <h6>{p?.name}</h6>
                          <small>{p?.brand?.name}</small>
                        </div>

                        <div className="col-md-2">
                          Color: {p?.color}<br />
                          Size: {p?.size}
                        </div>

                        <div className="col-md-1 text-center">
                          Qty: {p?.quantity}
                        </div>

                        <div className="col-md-1 text-center">
                          ₹{p?.totalPrice}
                        </div>
                      </div>
                    ))
                  }

                </div>
              ))}
              <div className={`modal fade ${showForm ? 'show d-block' : ''}`} id="exampleModal" >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Updating Order</h5>
                      <button onClick={() => setShowForm(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={postData}>
                        <div className="row">


                          <div className="col-md-6 mb-4">
                            <b>Order ID:</b> {data?.checkoutId}<br />
                            <b>Date:</b> {new Date(data?.dateOfOrder).toLocaleString()}<br />
                            <b className='d-flex mt-1'><span className='mt-1'>Status:</span>
                              <select
                                value={orderStatus}
                                onChange={(e) => setOrderStatus(e.target.value)}
                                className="w-50 mx-2 form-select"
                              >
                                <option value="Order is Placed">Order is Placed</option>
                                <option value="Order is Packed">Order is Packed</option>
                                <option value="Order is Ready to ship">Order is Ready to ship</option>
                                <option value="Order is In Transit">Order is In Transit</option>
                                <option value="Order is Reached at the final Delivery Station">
                                  Order is Reached at the final Delivery Station
                                </option>
                                <option value="Order is Out for Delivery">Order is Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                              </select>

                            </b>
                          </div>
                          <div className="col-lg-6 mb-4">
                            <b>Payment:</b> {data?.paymentMode}<br />
                            <b className='d-flex mt-1'><span className='mt-1'>Payment Status:</span>
                              <select
                                value={paymentStatus}
                                onChange={(e) => setPaymentStatus(e.target.value)}
                                className="w-50 mx-2 form-select"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Success">Success</option>
                                <option value="Failed">Failed</option>
                              </select>

                            </b>
                            <b>Shipping:</b> ₹{data?.shipping}
                          </div>
                          <div className="modal-footer">
                            <button onClick={() => setShowForm(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-dark">Update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
