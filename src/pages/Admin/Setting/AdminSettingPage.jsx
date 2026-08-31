import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { getAllSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function AdminSettingPage() {
  const dispatch = useDispatch()
  const { setting, updateSuccess } = useSelector(
    state => state.SettingStateData
  )

  let [data, setData] = useState({
    siteName: "",
    addressOne: "",
    addressTwo: "",
    mapOne: "",
    mapTwo: "",
    email: "",
    phone: "",
    whatsapp: "",
    linkedIn: "",
    gitHub: "",
    instagram: "",
    customer: 0,
    refund: 0
  })

  function getInputData(e) {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  useEffect(() => {
    dispatch(getAllSetting())
  }, [dispatch, updateSuccess]);

  useEffect(() => {
    if (setting) {
      setData(prev => ({
        ...prev,
        ...setting
      }));
    }
  }, [setting, updateSuccess]);

  async function postData(e) {
    e.preventDefault()
    dispatch(updateSetting(data))
    alert("Setting Updated Successfully!")
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
              Admin Setting
            </h4>
            <div className="col-12 border-3 border-dark card p-5 mt-4">
              <form onSubmit={postData}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label>Site Name</label>
                    <input
                      value={data.siteName || ""}
                      type="text"
                      name="siteName"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Site Name"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>Address One</label>
                    <input
                      value={data.addressOne || ""}
                      name="addressOne"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Address One"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>Address Two</label>
                    <input
                      value={data.addressTwo || ""}
                      name="addressTwo"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Address Two"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label>Map One</label>
                    <input
                      value={data.mapOne || ""}
                      type="url"
                      name="mapOne"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Map One URL"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label>Map Two</label>
                    <input
                      value={data.mapTwo || ""}
                      type="url"
                      name="mapTwo"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Map Two URL"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      value={data.email || ""}
                      name="email"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Email"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>Phone</label>
                    <input
                      value={data.phone || ""}
                      name="phone"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Phone"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>WhatsApp</label>
                    <input
                      value={data.whatsapp || ""}
                      name="whatsapp"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Whatsapp"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>LinkedIn</label>
                    <input
                      value={data.linkedIn || ""}
                      name="linkedIn"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="LinkedIn"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>GitHub</label>
                    <input
                      value={data.gitHub || ""}
                      name="gitHub"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="GitHub"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>Instagram</label>
                    <input
                      value={data.instagram || ""}
                      name="instagram"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Instagram"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>Happy Customer</label>
                    <input
                      type="number"
                      value={data.customer || 0}
                      name="customer"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Happy Customer"
                    />
                  </div>

                  <div className="col-6 mb-3">
                    <label>Refund Days</label>
                    <input
                      type="number"
                      value={data.refund || 0}
                      name="refund"
                      onChange={getInputData}
                      className="form-control border-2 border-dark"
                      placeholder="Refund Days"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <button className="btn btn-dark w-100" type="submit">Update Setting</button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
