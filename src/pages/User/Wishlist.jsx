import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWishlist, getAllWishlist } from '../../Redux/ActionCreators/CartActionCreator'
import { getAllProduct } from '../../Redux/ActionCreators/ProductActionCreators'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Wishlist() {
  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let { deleteSuccess, addSuccess } = useSelector(state => state.WishlistStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let [data, setData] = useState()
  const wishlistIds = WishlistStateData.ids || [];
  let dispatch = useDispatch()
  useEffect(() => {
    (() => {
      dispatch(getAllWishlist())
      dispatch(getAllProduct())
    })()
  }, [deleteSuccess, addSuccess])
  useEffect(() => {
    setData(ProductStateData.filter(p => wishlistIds.includes(p.id)))
  }, [ProductStateData])

  function handleDelete(id) {
    if (window.confirm('Are you sure want to remove from wishlist!!!')) {
      dispatch(deleteWishlist(id))
      toast('Item removed from Wishlist!!!')
    }
  }
  return (
    <div>
      <div className='table table-responsive'>
        {
          data?.length ? <table className='table table-bordered'>
            <tr className='border-2 text-center'>
              <th className=' border-2'>Name</th>
              <th className=' border-2'>Main Category</th>
              <th className=' border-2'>Sub Category</th>
              <th className=' border-2'>Brand</th>
              <th className=' border-2'>Picture</th>
              <th className=' border-2'>Price</th>
              <th className=' border-2'>Discount</th>
              <th className=' border-2'>Final Price</th>
              <th className='border-2'>Add to Cart</th>
              <th className='border-2'>Remove</th>
            </tr>

            {data?.map(item => {
              return <tr key={item.id} className='text-center'>
                <td className=' border-2'>{item.name}</td>
                <td className=' border-2'>{item.mainCategory?.name}</td>
                <td className=' border-2'>{item.subCategory?.name}</td>
                <td className=' border-2'>{item.brand?.name}</td>
                <td className='d-flex '> {item?.pics?.map((pic, index) => (

                  <img key={index}
                    className="mx-1 p-0"
                    src={`data:${pic.fileType};base64,${pic.base64}`}
                    alt={pic.name}
                    style={{ width: "20%", height: 60, objectFit: "contain" }}
                  />

                ))}</td>
                <td className=' border-2'>&#8377;{item.basePrice}</td>
                <td className=' border-2'>{item.discount}%</td>
                <td className=' border-2'>&#8377;{item.finalPrice}</td>
                <td className='border-2'><Link className={`${item.stockQuantity > 0 ? 'bi bi-cart' : ''} btn btn-dark`} to={`/product/${item.id}`}></Link></td>
                <td className='border-2'><i onClick={() => handleDelete(item.id)} className={`bi bi-x btn btn-dark`}></i ></td>
              </tr>
            })}

            <Link to='/shop-page' className='btn btn-dark w-100 m-auto my-2'>Shop More</Link>
          </table>

            : <div className='card p-5 text-center'>
              <h3>Wishlist is Empty!!!!</h3>
              <Link to='/shop-page' className='btn btn-dark w-50 m-auto my-2'>Shop Now</Link>
            </div>
        }
        <ToastContainer />
      </div>
    </div>
  )
}
