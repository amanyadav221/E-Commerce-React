import React, { useEffect, useState } from 'react'
import FormValidator from '../../Validators/FormValidator'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, getAllAddress, updateAddress } from '../../Redux/ActionCreators/SecurityCheckActionCreator'
import { toast, ToastContainer } from 'react-toastify'
const errorOption = {
  name: "Name is Mandatory",
  hno: "House no is Mandatory",
  phone: "Phone is Mandatory",
  area: "Area is Mandatory",
  pinCode: "Pin Code is Mandatory",
  landmark: "Landmark is Mandatory",
  city: "City is Mandatory",
  state: "State is Mandatory"
}
export default function ManageAddress() {
  const { address, addSuccess, deleteSuccess, updateSuccess } = useSelector(s => s.AddressStateData)
  let [id, setId] = useState()

  const { username } = useSelector(s => s.LoginStateData);
  const dataOption = {
    name: "",
    hno: "",
    phone: "",
    area: "",
    pinCode: "",
    landmark: "",
    city: "",
    state: ""
  }
  let [data, setData] = useState(dataOption)
  let [errorMessage, setErrorMessage] = useState(errorOption)
  let [btnOp, setBtnOp] = useState("Add")

  let [showForm, setShowForm] = useState(false)
  let [show, setShow] = useState(false)
  let dispatch = useDispatch()

  useEffect(() => {
    (() => {
      dispatch(getAllAddress(username))
    })()
  }, [username, addSuccess, deleteSuccess, updateSuccess])

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setData({ ...data, [name]: value })
  }
  function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    console.log(error)
    if (error) {
      setShow(true)
    } else {
      if (btnOp === "Add") {
        dispatch(addNewAddress(data))
        setShowForm(false)
        toast('Address created successfully!!!')
        setData(dataOption)
      } else if (btnOp === "Update") {
        dispatch(updateAddress(data, id))
        toast('Address updated successfully!!!')
        setShowForm(false)
      }
    }
  }
  function handleDelete(id) {
    if (window.confirm('Are you sure want to Delete?'))
      dispatch(deleteAddress(id))
    toast('Address deleted successfully!!!')
  }
  function handleUpdate(item) {
    setErrorMessage(dataOption)
    setBtnOp("Update")
    setData({ ...data, ...item })
    setShowForm(true)
    setId(item.id)
  }

  return (
    <div>
      <div className="float-end">
        <button onClick={() => {
          setShowForm(true)
          setData(dataOption)
          setBtnOp("Add")
          setErrorMessage(errorOption)
        }} className='btn btn-dark mb-3'>Add New Address</button>
      </div>

      {address?.length > 0 && address.map((item, index) => (
        <table key={index} className="table table-bordered mt-3">
          <tbody>
            <th className='border-2 text-center' colSpan={2}>Address {index + 1}</th>
            <tr><th>Name</th><td>{item.name}</td></tr>
            <tr><th>Phone</th><td>{item.phone}</td></tr>
            <tr><th>Area</th><td>{item.area}</td></tr>
            <tr><th>City</th><td>{item.city}</td></tr>
            <tr><th>Pin Code</th><td>{item.pinCode}</td></tr>
            <tr><th>State</th><td>{item.state}</td></tr>
            <tr colSpan={2} className='text-end border-2'>
              <td className='border-0'></td>
              <div className="btn-group ">
                <button onClick={() => handleUpdate(item)} className='btn btn-sm btn-dark mx-3 px-4'><i className='bi bi-pencil'></i></button>
                <button onClick={() => handleDelete(item.id)} className='btn btn-sm btn-danger mx-3 px-4'><i className='bi bi-x'></i></button>
              </div>
            </tr>
          </tbody>
        </table>
      ))}

      <div className={`modal fade ${showForm ? 'show d-block' : ''}`} id="exampleModal" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{btnOp} Address</h5>
              <button onClick={() => setShowForm(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={postData}>
                <div className="row">
                  <div className="col-lg-12 mb-0">
                    <label className='form-label' htmlFor="name">Name*</label>
                    <input value={data.name} type="text" id="name" name="name" className={`form-control ${show && errorMessage.name ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Name' />
                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}

                  </div>

                  <div className="col-lg-6 mb-0">
                    <label className='form-label' htmlFor="phone">Mobile Number*</label>
                    <input value={data.phone} type="number" id="phone" name="phone" className={`form-control ${show && errorMessage.phone ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Phone' />
                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}

                  </div>


                  <div className="col-lg-6 mb-0">
                    <label className='form-label' htmlFor="hno">House no, Flat, Apartment*</label>
                    <input value={data.hno} type="text" id="hno" name="hno" className={`form-control ${show && errorMessage.hno ? 'border-danger' : ''}`} onChange={getInputData} placeholder='House no' />
                    {show && errorMessage.hno ? <p className='text-danger'>{errorMessage.hno}</p> : null}

                  </div>


                  <div className="col-lg-6 mb-0">
                    <label className='form-label' htmlFor="area">Area, Street, Sector, Village*</label>
                    <input value={data.area} type="text" id="area" name="area" className={`form-control ${show && errorMessage.area ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Area' />
                    {show && errorMessage.area ? <p className='text-danger'>{errorMessage.area}</p> : null}

                  </div>


                  <div className="col-lg-6 mb-0">
                    <label className='form-label' htmlFor="landmark">Landmark*</label>
                    <input value={data.landmark} type="text" id="landmark" name="landmark" className={`form-control ${show && errorMessage.landmark ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Landmark' />
                    {show && errorMessage.landmark ? <p className='text-danger'>{errorMessage.landmark}</p> : null}

                  </div>

                  <div className="col-lg-6 mb-0">
                    <label className='form-label' htmlFor="pinCode">Pin Code*</label>
                    <input value={data.pinCode} type="number" id="pinCode" name="pinCode" className={`form-control ${show && errorMessage.pinCode ? 'border-danger' : ''}`} onChange={getInputData} placeholder='Pin Code' />
                    {show && errorMessage.pinCode ? <p className='text-danger'>{errorMessage.pinCode}</p> : null}

                  </div>

                  <div className="col-lg-6 mb-0">
                    <label className='form-label' htmlFor="city">Town/City*</label>
                    <input value={data.city} type="text" id="city" name="city" className={`form-control ${show && errorMessage.city ? 'border-danger' : ''}`} onChange={getInputData} placeholder='City' />
                    {show && errorMessage.city ? <p className='text-danger'>{errorMessage.city}</p> : null}

                  </div>

                  <div className="col-12 mb-0">
                    <label className='form-label' htmlFor="state">State*</label>
                    <input value={data.state} type="text" id="state" name="state" className={`form-control ${show && errorMessage.state ? 'border-danger' : ''}`} onChange={getInputData} placeholder='State' />
                    {show && errorMessage.state ? <p className='text-danger'>{errorMessage.state}</p> : null}
                  </div>
                  <div className="modal-footer">
                    <button onClick={() => setShowForm(false)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-dark">{btnOp}</button>
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
