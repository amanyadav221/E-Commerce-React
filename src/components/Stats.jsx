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
            console.log(SettingStateData)
            setData(SettingStateData.setting);
        }
    }, [SettingStateData.setting])
    return (
        <div>
            <main className="main ">
                <section id="stats" className="stats section  ">

                    <div className="container d-flex flex-wrap justify-content-center">
                        <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center px-3" >
                            <i className="bi bi-emoji-smile fs-1"></i>
                            <div className="stats-item">
                                <span ><Countup className='d-inline' end={data?.customer} duration={2} />+</span>
                                <h5>Happy Customer</h5>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center px-3 ">
                            <i className="bi bi-card-list fs-1"></i>
                            <div className="stats-item">
                                <span ><Countup className='d-inline' end={data?.products} duration={2} />+</span>
                                <h5>Products</h5>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center px-3 ">
                            <i className="bi bi-shield-check fs-1"></i>
                            <div className="stats-item">
                                <span ><Countup className='d-inline' end={data?.brands} duration={2} />+</span>
                                <h5>Brands</h5>
                            </div>
                        </div>


                        <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center px-3 ">
                            <i className="bi bi-arrow-counterclockwise fs-1"></i>
                            <div className="stats-item">
                                <span ><Countup className='d-inline' end={data?.refund} duration={2} />Days</span>
                                <h5>Refund Policy</h5>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

        </div>
    )
}
