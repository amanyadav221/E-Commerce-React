import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import { getAllFaq, updateFaq } from '../../../Redux/ActionCreators/FaqActionCreators'
import { useDispatch, useSelector } from 'react-redux'
export default function AdminFaqUpdate() {
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()
    let { id } = useParams()
    let [data, setData] = useState({
        question: "",
        answer: "",
        status: "true"
    })
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState({
        question: "",
        answer: "",
        status: "true"
    })

    useEffect(() => {
        let time = (() => {
            dispatch(getAllFaq())
            if (FaqStateData.length) {
                let item = FaqStateData.find(x => x.id == id)
                console.log(FaqStateData)
                console.log(item)
                if (item) {
                    setData({ ...data, ...item })
                } else {
                    navigate("/admin/faq")
                }
            }
        })()
        return () => clearTimeout(time)
    }, [FaqStateData.length])
    function getInputData(e) {
        const name = e.target.name
        const value =
            name === "status"
                ? e.target.value === "true"
                : e.target.value

        setErrorMessage({
            ...errorMessage,
            [name]: FormValidator(e)
        })

        setData({
            ...data,
            [name]: value
        })
    }
    function postData(e) {
        e.preventDefault()
        let errors = {
            question: FormValidator({
                target: { name: "question", value: data.question }
            }),
            answer: FormValidator({
                target: { name: "answer", value: data.answer }
            })
        }
        // duplicate check ONLY if question has no validation error
        if (!errors.question) {
            const exists = FaqStateData.some(
                val =>
                    val.question?.toLowerCase() === data.question.toLowerCase() &&
                    val.question.toLowerCase() !== id.toLowerCase()
            )

            if (exists) {
                errors.question = "This FAQ already exists!"
            }
        }

        //  Update UI FIRST
        setErrorMessage(errors)
        setShow(true)

        //  Stop if any error exists
        const hasErr = Object.values(errors).some(err => err !== "")
        if (hasErr) return

        //  Safe submit
        dispatch(updateFaq(id, data))
        navigate("/admin/faq")
    }
    let [show, setShow] = useState(false)
    return (

        <div>
            <Hero title="Admin" />
            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSideBar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='bg-dark text-light text-center p-2'>Update Faq
                            <Link to="/admin/faq"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
                        </h4>
                        <div className="col-12 border-3 border-dark card p-5 mt-4">
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Question*</label>
                                        <input
                                            value={data.question}
                                            type="text"
                                            name="question"
                                            onChange={getInputData}
                                            className={`form-control ${show && errorMessage.question ? 'border-3 border-danger' : 'border-2 border-dark'
                                                }`}
                                            placeholder="Question"
                                        />
                                        {show && errorMessage.question && (
                                            <p className="text-danger">{errorMessage.question}</p>
                                        )}
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label>Answer*</label>
                                        <textarea
                                            value={data.answer}
                                            rows={4}
                                            name="answer"
                                            onChange={getInputData}
                                            className={`form-control ${show && errorMessage.answer ? 'border-3 border-danger' : 'border-2 border-dark'
                                                }`}
                                            placeholder="Answer"
                                        />
                                        {show && errorMessage.answer && (
                                            <p className="text-danger">{errorMessage.answer}</p>
                                        )}
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label>Status*</label>
                                        {/* {console.log(data.name)} */}
                                        <select name="status" value={data.status} onChange={getInputData} className='form-select border-dark'>
                                            <option value={"true"}>
                                                Active
                                            </option>
                                            <option value={"false"}>
                                                In-Active
                                            </option>
                                        </select>
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
