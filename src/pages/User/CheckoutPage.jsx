import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import Cart from '../../components/Cart'
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddress } from '../../Redux/ActionCreators/SecurityCheckActionCreator';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
    const { username } = useSelector(s => s.LoginStateData);
    let { address } = useSelector(state => state.AddressStateData)
    let dispatch = useDispatch()
    let [selected, setSelected] = useState({
        deliveryaddress: {},
        paymentMode: "COD"
    })
    useEffect(() => {
        (() => {
            dispatch(getAllAddress(username))
        })()
    }, [])
    useEffect(() => {
        if (address && address.length > 0) {
            setSelected(prev => ({
                ...prev,
                deliveryaddress: address[0]
            }))
        }
    }, [address])
    return (
        <div>
            <Hero title="Place Your Order" />
            {address?.length ? <div className="contailer-fluid my-3">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="mb-3">
                            {address.length == 1 ? null : <h5 className='bg-dark text-light text-center py-2'>Select Delivery Address</h5>}
                            {
                                address.map((item, index) => {
                                    return <div onClick={() => setSelected({ ...selected, 'deliveryaddress': item })} className={`mx-3 card p-3 mb-3 ${selected.deliveryaddress.id === item.id ? 'border-2  border-success shadow-lg' : ''}`}>
                                        {selected.deliveryaddress.id === item.id ? <i className='bi bi-check fs-1 position-absolute' style={{ left: "90%" }}></i> : null}
                                        <div className="row">

                                            <table className="table table-bordered mt-3 ">
                                                <tbody>
                                                    <th className='border-2 text-center' colSpan={2}>Address {index + 1}</th>
                                                    <tr><th>Name</th><td>{item.name}</td></tr>
                                                    <tr><th>Phone</th><td>{item.phone}</td></tr>
                                                    <tr><th>Area</th><td>{item.area}</td></tr>
                                                    <tr><th>City</th><td>{item.city}</td></tr>
                                                    <tr><th>State</th><td>{item.state}</td></tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                })
                            }
                        </div>

                        <div className="mb-3">
                            <h5 className="bg-dark p-2 text-center text-light mx-3">Select Payment Mode</h5>
                            <div onClick={() => setSelected({ ...selected, 'paymentMode': "COD" })} className={`mx-3 card p-1 mb-1 ${selected.paymentMode === "COD" ? 'border-2  border-success shadow-lg' : ''}`}>
                                <span className='pb-3'> {selected.paymentMode === "COD" ? <i className=' bi bi-check fs-2 position-absolute' style={{ left: "95%" }}></i> : null}</span>
                                <h6>Cash On Delivery</h6>
                            </div>

                            <div onClick={() => setSelected({ ...selected, 'paymentMode': "Net Banking" })} className={`mx-3 card p-1 mb-1 ${selected.paymentMode === "Net Banking" ? 'border-2  border-success shadow-lg' : ''}`}>
                                <span className='pb-3'> {selected.paymentMode === "Net Banking" ? <i className=' bi bi-check fs-2 position-absolute' style={{ left: "95%" }}></i> : null}</span>
                                <h6>Net Banking</h6>
                            </div>

                            <div onClick={() => setSelected({ ...selected, 'paymentMode': "UPI" })} className={`mx-3 card p-1 mb-1 ${selected.paymentMode === "UPI" ? 'border-2  border-success shadow-lg' : ''}`}>
                                <span className='pb-3'> {selected.paymentMode === "UPI" ? <i className=' bi bi-check fs-2 position-absolute' style={{ left: "95%" }}></i> : null}</span>
                                <h6>UPI/Card</h6>
                            </div>
                        </div>


                    </div>
                    <div className="col-lg-5">
                        <h5 className='bg-dark text-light text-center py-2'>Your Cart Items</h5>
                        <Cart title="Checkout" selected={selected} />
                    </div>
                </div>
            </div> :

                <div className="card p-5 text-center">
                    <h3>No address Found please add Delivery address to Place Order</h3>
                    <Link to="/profile?option=3" className="btn btn-dark">Add Address</Link>
                </div>

            }
        </div>
    )
}
