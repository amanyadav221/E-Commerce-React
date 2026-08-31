import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { deleteCartItem, getMyCart, createCheckout, addToWishlistItem, deleteCartItemByProductId, addToCartItem, updateCartItem } from '../Redux/ActionCreators/CartActionCreator'
import { getAllProduct, getProductById } from '../Redux/ActionCreators/ProductActionCreators'


export default function Cart({ title, selected }) {
  const { items } = useSelector(state => state.CartReducerStateData)
  const ProductStateData = useSelector(state => state.ProductStateData)
  let { deleteSuccess, addSuccess } = useSelector(state => state.CartReducerStateData)
  const { username } = useSelector(s => s.LoginStateData);
  let [shipping, setShipping] = useState(0)
  const [grand, setGrand] = useState(0)
  let [total, setTotal] = useState(0)
  let navigate = useNavigate()
  let { message } = useSelector(state => state.CheckoutStateData)

  const [quantities, setQuantities] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyCart())
    dispatch(getAllProduct())

  }, [deleteSuccess, addSuccess, title])

  // Merge cart items with product data
  const mergedData = useMemo(() => {
    if (!items?.length || !ProductStateData?.length) return []

    return items.map(cartItem => {
      const product = ProductStateData.find(p => p.id === cartItem.productId)
      return {
        ...product,
        itemId: cartItem.id,
        color: cartItem.color,
        size: cartItem.size,
        quantity: cartItem.quantity
      }
    })
  }, [items, ProductStateData])

  // Calculate grand total
  useEffect(() => {
    let total = 0
    mergedData.forEach(item => {
      const q = quantities[item.itemId]
      total += q * item.finalPrice
    })
    setGrand(total)
    calculateTotal()
  }, [quantities, mergedData])
  useEffect(() => {
    const q = {}
    mergedData.forEach(p => {
      if (p.stockQuantity === 0) q[p.itemId] = 0
      else q[p.itemId] = p.quantity < 1 ? 1 : Math.min(p.quantity, p.stockQuantity)
    })
    setQuantities(q)
  }, [mergedData])

  const increment = item => {
    setQuantities(prev => {
      const current = prev[item.itemId]

      if (item.stockQuantity === 0) return prev
      if (current >= item.stockQuantity) return prev

      return { ...prev, [item.itemId]: current + 1 }
    })
  }

  const decrement = item => {
    setQuantities(prev => {
      const current = prev[item.itemId]

      if (item.stockQuantity === 0) return prev
      if (current <= 1) return prev

      return { ...prev, [item.itemId]: current - 1 }
    })
  }

  const handleDelete = id => {
    if (window.confirm('Remove item from cart?')) {
      dispatch(deleteCartItem(id))
      toast('Item removed from Cart')
    }
  }
  function calculateTotal() {
    if (grand < 1000) {
      setShipping(150)
      setTotal(grand + 150)
    } else {
      setShipping(0)
      setTotal(grand)
    }
  }
  function placeOrder() {

    let item = {
      username: username,
      addressId: selected.deliveryaddress.id,
      paymentMode: selected.paymentMode,
      orderStatus: "Order is Placed",
      paymentStatus: "Pending",
      subTotal: grand,
      shipping: shipping,
      total: total,
      dateOfOrder: new Date(),
      productIds: mergedData.map(x => x.id),
      quantities: mergedData.map(x => x.quantity),
      color: mergedData.map(x => x.color),
      size: mergedData.map(x => x.size)

    }
    dispatch(createCheckout(item))

    mergedData.forEach(x => {
      console.log(x)
      dispatch(deleteCartItem(x.itemId))
    })

    navigate("/confirmation")

  }
  useEffect(() => {
    if (message === "success") {

      mergedData.forEach(x => {
        dispatch(deleteCartItem(x.itemId))
      })

      navigate("/confirmation")
    } else if (message === "Out Of Stock") {
      outOfStock()
    }
    mergedData.forEach(x => {
      dispatch(getProductById(x.id))
    })

  }, [message])


  console.log("item", items)
  console.log("merge data", mergedData)
  function outOfStock() {
    mergedData.forEach(x => {
      dispatch(getProductById(x.id))
    })

    toast('Some product is Out Of Stock!!!')
  }
  function moveToWishlist(productId) {
    const item = ProductStateData.find(x => x.id === productId);

    let data = {
      "productId": item.id,
      quantity: 1,
      color: item.color[0],
      size: item.size[0]
    }

    dispatch(addToWishlistItem(item))

    toast("Item moved to Wishlist!!!")
    dispatch(deleteCartItemByProductId(productId))
  }
  function proceedToCheckout() {

    mergedData.forEach(x => {

      let item = {
        productId: x.id,
        color: x.color,
        quantity: quantities[x.itemId],
        size: x.size
      }

      dispatch(updateCartItem(item, x.itemId))
      navigate("/checkout")
    }
    )
  }

  return (
    <div>
      {mergedData.length ? (
        <>
          <div className='table-responsive'>
            <table className="table table-responsive table-bordered mt-3">
              <thead>
                <tr className="text-center">
                  <th>Name</th>
                  <th>Brand</th>
                  {title === "Checkout" ? null : <th>Image</th>}
                  <th>Color</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Discount</th>
                  {title === "Checkout" ? null : <th>Final</th>}
                  {title === "Checkout" ? null : <th>Total</th>}
                  {title === "Checkout" ? null : <th>Move To Wishlist</th>}
                  {title === "Checkout" ? null : <th>Remove</th>}
                </tr>
              </thead>
              <tbody>
                {mergedData.map(item => (
                  <tr key={item.itemId} className="text-center">
                    <td>
                      {item.name}
                    </td>
                    <td>{item.brand?.name}</td>
                    {title === "Checkout" ? null : <td className="d-flex">
                      {item?.pics?.map((pic, i) => (
                        <img key={i} src={`data:${pic.fileType};base64,${pic.base64}`}
                          style={{ width: 60, height: 60, objectFit: 'contain' }} />
                      ))}
                    </td>}
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>
                      {title === "Checkout" ? null : <button onClick={() => decrement(item)} className="btn btn-sm btn-dark">-</button>}
                      <span className="mx-2">{quantities[item.itemId]}</span>

                      {title === "Checkout" ? null : <button onClick={() => increment(item)} className="btn btn-sm btn-dark">+</button>}
                    </td>

                    <td>₹{item.basePrice}</td>
                    <td>{item.discount}%</td>
                    {title === "Checkout" ? null : <td>₹{item.finalPrice}</td>}
                    {title === "Checkout" ? null : <td>₹{(quantities[item.itemId] ?? item.quantity) * item.finalPrice}</td>}

                    {title === "Checkout" ? null : <td>
                      <button className="btn btn-dark" onClick={() => moveToWishlist(item.id)}>Move To Wishlist</button>
                    </td>}
                    {title === "Checkout" ? null : <td>
                      <button onClick={() => handleDelete(item.itemId)} className="btn btn-danger">X</button>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-md-6"></div>
            <div className={`${title === 'Checkout' ? 'col-md-12' : 'col-md-6'}`}>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Grand Total</th>
                    <td>&#8377;{grand}</td>
                  </tr>
                  <tr>
                    <th>Shipping Amt</th>
                    <td>&#8377;{shipping}</td>
                  </tr>
                  <tr>
                    <th>Total Amt</th>
                    <td>&#8377;{total}</td>
                  </tr>

                  <tr>
                    <td colSpan={2}>
                      {title === "Checkout"
                        ? <button onClick={placeOrder} className='btn btn-dark w-100'>Place Order</button>
                        : <button className='btn btn-dark w-100' onClick={proceedToCheckout} >Proceed To Checkout</button>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {title === "Checkout" ? null : <Link to="/shop-page" className="btn btn-dark w-100">Shop More</Link>}
        </>
      ) : (
        <div className="card p-5 text-center">
          <h3>Cart is Empty</h3>
          <Link to="/shop-page" className="btn btn-dark">Shop Now</Link>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
