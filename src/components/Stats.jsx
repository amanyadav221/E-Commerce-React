import React, { useEffect, useState } from 'react'
import Countup from 'react-countup'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSetting } from '../Redux/ActionCreators/SettingActionCreators'

export default function Stats() {
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()
    let [data, setData] = useState({})

    useEffect(() => {
        dispatch(getAllSetting());
    }, [dispatch])

    useEffect(() => {
        if (SettingStateData) {
            setData(SettingStateData.setting);
        }
    }, [SettingStateData.setting])

    return (
        <section id="stats" className="stats section py-5 bg-light">
            <div className="container">
                <div className="row gy-4 justify-content-center text-center">
                    
                    <div className="col-6 col-md-3">
                        <div className="p-3 bg-white shadow-sm rounded">
                            <i className="bi bi-emoji-smile fs-1 text-primary mb-2 d-block"></i>
                            <h3 className="fw-bold mb-1">
                                <Countup end={data?.customer || 0} duration={2} />+
                            </h3>
                            <p className="text-muted mb-0 small fw-semibold">Happy Customers</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="p-3 bg-white shadow-sm rounded">
                            <i className="bi bi-card-list fs-1 text-primary mb-2 d-block"></i>
                            <h3 className="fw-bold mb-1">
                                <Countup end={data?.products || 0} duration={2} />+
                            </h3>
                            <p className="text-muted mb-0 small fw-semibold">Products</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="p-3 bg-white shadow-sm rounded">
                            <i className="bi bi-shield-check fs-1 text-primary mb-2 d-block"></i>
                            <h3 className="fw-bold mb-1">
                                <Countup end={data?.brands || 0} duration={2} />+
                            </h3>
                            <p className="text-muted mb-0 small fw-semibold">Brands</p>
                        </div>
                    </div>

                    <div className="col-6 col-md-3">
                        <div className="p-3 bg-white shadow-sm rounded">
                            <i className="bi bi-arrow-counterclockwise fs-1 text-primary mb-2 d-block"></i>
                            <h3 className="fw-bold mb-1">
                                <Countup end={data?.refund || 0} duration={2} /> Days
                            </h3>
                            <p className="text-muted mb-0 small fw-semibold">Refund Policy</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
