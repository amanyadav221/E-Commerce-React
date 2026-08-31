import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { getAllSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import FormValidator from '../../../Validators/FormValidator'
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
  let [show, setshow] = useState(false)
  let [errorMessage, setErrorMessage] = useState({
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
    customer: "",
    refund: ""
  })
  function getInputData(e) {
    const { name, value } = e.target;

    setErrorMessage({
      ...errorMessage,
      [name]: FormValidator(e)
    });

    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }
  useEffect(() => {
    dispatch(getAllSetting())
    console.log("GETTING UPDATE DATA")
  }, [dispatch, updateSuccess]);

  useEffect(() => {
    if (setting) {
      console.log(setting)
      setData(setting);
      console.log(data)
    }
  }, [dispatch, setting, updateSuccess]);

  async function postData(e) {
    e.preventDefault()
    let errors = {
      siteName: FormValidator({ target: { name: "siteName", value: data.siteName } }),
      addressOne: FormValidator({ target: { name: "addressOne", value: data.addressOne } }),
      addressTwo: FormValidator({ target: { name: "addressTwo", value: data.addressTwo } }),
      mapOne: FormValidator({ target: { name: "mapOne", value: data.mapOne } }),
      mapTwo: FormValidator({ target: { name: "mapTwo", value: data.mapTwo } }),
      phone: FormValidator({ target: { name: "phone", value: data.phone } }),
      whatsapp: FormValidator({ target: { name: "whatsapp", value: data.whatsapp } }),
      email: FormValidator({ target: { name: "email", value: data.email } }),
      linkedIn: FormValidator({ target: { name: "linkedIn", value: data.linkedIn } }),
      gitHub: FormValidator({ target: { name: "gitHub", value: data.gitHub } }),
      instagram: FormValidator({ target: { name: "instagram", value: data.instagram } }),

    }
    let hasErr = Object.values(errors).some(err => err !== "")

    setErrorMessage(errors)
    setshow(true)

    if (hasErr) return
    dispatch(updateSetting(data))
    alert(`
          Setting Updated!!!!!!!!!!
          `)
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
                    <label>Site Name*</label>
                    <input
                      value={data.siteName ? data.siteName : undefined}
                      type="text"
                      name="siteName"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.siteName ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Site Name"
                    />
                    {show && errorMessage.siteName && (
                      <p className="text-danger">{errorMessage.siteName}</p>
                    )}
                  </div>

                  <div className="col-6 mb-3">
                    <label>Address One*</label>
                    <input
                      value={data.addressOne}
                      name="addressOne"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.addressOne ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Address One"
                    />
                    {show && errorMessage.addressOne && (
                      <p className="text-danger">{errorMessage.addressOne}</p>
                    )}

                  </div>
                  <div className="col-6 mb-3">
                    <label>Address Two*</label>
                    <input
                      value={data.addressTwo}
                      name="addressTwo"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.addressTwo ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Address Two"
                    />
                    {show && errorMessage.addressTwo && (
                      <p className="text-danger">{errorMessage.addressTwo}</p>
                    )}

                  </div>

                  <div className="col-12 mb-3">
                    <label>Map One*</label>
                    <input value={data.mapOne} type="url" name="mapOne" onChange={getInputData} className={`form-control ${show && errorMessage.mapOne ? 'border-3 border-danger' : 'border-2 border-dark'
                      }`} placeholder='Map One' />
                    {show && errorMessage.mapOne && (
                      <p className="text-danger">{errorMessage.mapOne}</p>
                    )}
                  </div>
                  <div className="col-12 mb-3">
                    <label>Map Two*</label>
                    <input value={data.mapTwo} type="url" name="mapTwo" onChange={getInputData} className={`form-control ${show && errorMessage.mapTwo ? 'border-3 border-danger' : 'border-2 border-dark'
                      }`} placeholder='Map Two' />
                    {show && errorMessage.mapTwo && (
                      <p className="text-danger">{errorMessage.mapTwo}</p>
                    )}
                  </div>

                  <div className="col-6 mb-3">
                    <label>Email*</label>
                    <input type='email'
                      value={data.email}
                      name="email"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.email ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Email"
                    />
                    {show && errorMessage.email && (
                      <p className="text-danger">{errorMessage.email}</p>
                    )}

                  </div>

                  <div className="col-6 mb-3">
                    <label>Phone*</label>
                    <input
                      value={data.phone}
                      name="phone"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.phone ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Phone"
                    />
                    {show && errorMessage.phone && (
                      <p className="text-danger">{errorMessage.phone}</p>
                    )}

                  </div>

                  <div className="col-6 mb-3">
                    <label>WhatsApp*</label>
                    <input
                      value={data.whatsapp}
                      name="whatsapp"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.whatsapp ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Whatsapp"
                    />
                    {show && errorMessage.whatsapp && (
                      <p className="text-danger">{errorMessage.whatsapp}</p>
                    )}

                  </div>

                  <div className="col-6 mb-3">
                    <label>LinkedIn*</label>
                    <input
                      value={data.linkedIn}
                      name="linkedIn"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.linkedIn ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="LinkedIn"
                    />
                    {show && errorMessage.linkedIn && (
                      <p className="text-danger">{errorMessage.linkedIn}</p>
                    )}

                  </div>

                  <div className="col-6 mb-3">
                    <label>GitHub*</label>
                    <input
                      value={data.gitHub}
                      name="gitHub"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.gitHub ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="GitHub"
                    />
                    {show && errorMessage.gitHub && (
                      <p className="text-danger">{errorMessage.gitHub}</p>
                    )}

                  </div>


                  <div className="col-6 mb-3">
                    <label>Instagram*</label>
                    <input
                      value={data.instagram}
                      name="instagram"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.instagram ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Instagram"
                    />
                    {show && errorMessage.instagram && (
                      <p className="text-danger">{errorMessage.instagram}</p>
                    )}

                  </div>




                  <div className="col-6 mb-3">
                    <label>Happy Customer*</label>
                    <input
                      type="number"
                      value={data.customer}
                      name="customer"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.customer ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Happy Customer"
                    />
                    {show && errorMessage.customer && (
                      <p className="text-danger">{errorMessage.customer}</p>
                    )}

                  </div>

                  <div className="col-6 mb-3">
                    <label>Refund Days*</label>
                    <input
                      type="number"
                      value={data.refund}
                      name="refund"
                      onChange={getInputData}
                      className={`form-control ${show && errorMessage.refund ? 'border-3 border-danger' : 'border-2 border-dark'
                        }`}
                      placeholder="Refund Days"
                    />
                    {show && errorMessage.refund && (
                      <p className="text-danger">{errorMessage.refund}</p>
                    )}

                  </div>
                  <div className="col-12 mb-3">
                    <button className="btn btn-dark w-100" type="submit">Update</button>
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
