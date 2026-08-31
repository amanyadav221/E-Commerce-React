import React, { useEffect, useState } from 'react'
import Countup from 'react-countup'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSetting } from '../Redux/ActionCreators/SettingActionCreators'

export default function Stats() {
    const { setting, updateSuccess } = useSelector(state => state.SettingStateData)
    const dispatch = useDispatch()
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(getAllSetting())
    }, [dispatch, updateSuccess])

    useEffect(() => {
        if (setting) {
            setData(setting)
        }
    }, [setting, updateSuccess])

    const customerCount = Number(data?.customer) || 150;
    const productsCount = Number(data?.products) || 0;
    const brandsCount = Number(data?.brands) || 0;
    const refundCount = Number(data?.refund) || 0;

    return (
        <div>
            <main className="main">
                <section id="stats" className="stats section py-4">
                    <div className="container d-flex flex-wrap justify-content-center">
                        <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center px-3 mb-3">
                            <i className="bi bi-emoji-smile fs-1 text-dark"></i>
                            <div className="stats-item text-center">
                                <span className="fs-2 fw-bold">
                                    <Countup key={`cust-${customerCount}`} end={customerCount} duration={2.5} />+
                                </span>
                                <h5 className="text-muted mt-1">Happy Customer</h5>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center px-3 mb-3">
                            <i className="bi bi-card-list fs-1 text-dark"></i>
                            <div className="stats-item text-center">
                                <span className="fs-2 fw-bold">
                                    <Countup key={`prod-${productsCount}`} end={productsCount} duration={2.5} />+
                                </span>
                                <h5 className="text-muted mt-1">Products</h5>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center px-3 mb-3">
                            <i className="bi bi-shield-check fs-1 text-dark"></i>
                            <div className="stats-item text-center">
                                <span className="fs-2 fw-bold">
                                    <Countup key={`brand-${brandsCount}`} end={brandsCount} duration={2.5} />+
                                </span>
                                <h5 className="text-muted mt-1">Brands</h5>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center px-3 mb-3">
                            <i className="bi bi-arrow-counterclockwise fs-1 text-dark"></i>
                            <div className="stats-item text-center">
                                <span className="fs-2 fw-bold">
                                    <Countup key={`ref-${refundCount}`} end={refundCount} duration={2.5} /> Days
                                </span>
                                <h5 className="text-muted mt-1">Refund Policy</h5>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    )
}
