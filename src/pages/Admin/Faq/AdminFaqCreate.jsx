import React, { useEffect, useState } from 'react'
import Hero from '../../../components/Hero'
import AdminSideBar from '../../AdminSideBar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import { getAllFaq, createFaq } from "../../../Redux/ActionCreators/FaqActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function AdminFaqCreate() {
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()
    let [category, setCategory] = useState([])
    let [data, setData] = useState({
        question: "",
        answer: "",
        status: "true"
    })
    let navigate = useNavigate()
    let [errorMessage, setErrorMessage] = useState({
        question: "",
        answer: ""
    })
    useEffect(() => {
        (() => {
            dispatch(getAllFaq())
            if (FaqStateData?.length) {
                setCategory(
                    FaqStateData.map(item => item.question)
                )
            }
        })()
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

    async function postData(e) {
        e.preventDefault()
        let errors = {
            question: FormValidator({ target: { name: "question", value: data.question } }),
            answer: FormValidator({ target: { name: "answer", value: data.answer } })
        }
        let hasErr = Object.values(errors).some(err => err !== "")

        // duplicate question check (only if question is valid)
        if (!errors.question) {
            const exists = category.some(
                val =>
                    typeof val === "string" &&
                    val.toLowerCase() === data.question.toLowerCase()
            )
            if (exists) {
                errors.question = "This Question already exists!"
                hasErr = true
            }
        }

        setErrorMessage(errors)
        setShow(true)

        if (hasErr) return

        dispatch(createFaq(data))
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
                        <h4 className='bg-dark text-light text-center p-2'>Admin Faq Create
                            <Link to="/admin/faq"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
                        </h4>
                        <div className="col-12 border-3 border-dark card p-5 mt-4">
                            <form onSubmit={postData}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <label>Question*</label>
                                        <input
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
                                        <select name="status" onChange={getInputData} className='form-select border-dark'>
                                            <option value={"true"}>
                                                Active
                                            </option>
                                            <option value={"false"}>
                                                In-Active
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <button className="btn btn-dark w-100" type="submit">Create</button>
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
