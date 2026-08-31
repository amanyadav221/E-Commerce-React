import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMainCategory } from '../Redux/ActionCreators/MainCategoryActionCreators'
import { getAllSubCategory } from '../Redux/ActionCreators/SubCategoryActionCreators'
import { getAllBrand } from '../Redux/ActionCreators/BrandActionCreators'
import { getAllProduct } from '../Redux/ActionCreators/ProductActionCreators'
import { Link } from 'react-router-dom'

export default function ShopPage() {
  let [data, setData] = useState([])
  let [sortFilter, setSortFilter] = useState()
  let [search, setSearch] = useState()
  let [mc, setMc] = useState([])
  let [sc, setSc] = useState([])
  let [br, setBr] = useState([])
  let [min, setMin] = useState(-1)
  let [max, setMax] = useState(-1)
  let [selectedColor, setSelectedColor] = useState([])
  let [selectedSize, setSelectedSize] = useState([])
  let MainCategoryStateData = useSelector(state => state.MainCategoryStateData)
  let SubCategoryStateData = useSelector(state => state.SubCategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()
  let color = ["Red", "Blue", "White", "Green", "Gray", "Purple", "Pink", "Yellow", "Orange", "Cyan", "SkyBlue", "Black"]
  let size = ["XXXL", "XXL", "XL", "LG", "MD", "SM", "XS", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "Free Size"]
  function getInputCheckBoxColorAndSize(field, value) {
    const temp = field === "color" ? selectedColor : selectedSize
    let updated;

    if (temp.includes(value)) {
      updated = temp.filter(x => x !== value);  // remove
    } else {
      updated = [...temp, value];                // add
    }

    if (field === "color")
      setSelectedColor(updated)
    else
      setSelectedSize(updated)
    console.log(updated)
    filterProduct(mc, sc, br, field === "color" ? updated : selectedColor, field === "size" ? updated : selectedSize)
  }
  useEffect(() => {
    (() => {
      dispatch(getAllMainCategory())
    })()
  }, [MainCategoryStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getAllSubCategory())
    })()
  }, [SubCategoryStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getAllBrand())
    })()
  }, [BrandStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getAllProduct())
      if (ProductStateData.length) {
        setData(ProductStateData.filter(x => x.status == "true"))
      }
    })()
  }, [ProductStateData.length])
  function getInputCheckBox(field, value) {
    const temp = field === "mc" ? mc : field === "sc" ? sc : br   //  works for color & size

    let updated;

    if (temp.includes(value)) {
      updated = temp.filter(x => x !== value);  // remove
    } else {
      updated = [...temp, value];                // add
    }
    //console.log(updated)
    if (field === "mc") {
      setMc(updated)
    } else if (field === "sc") {
      setSc(updated)
    } else {
      setBr(updated)
    }
    filterProduct(field === "mc" ? updated : mc, field === "sc" ? updated : sc, field === "br" ? updated : br, selectedColor, selectedSize)
  }
  function isInclude(arr1, arr2) {
    let flag = false
    console.log(arr1)
    console.log(arr2)
    for (let items of arr1) {
      console.log(items)
      if (arr2.includes(items)) {
        flag = true
        break
      }
    }
    return flag
  }
  function filterProduct(mc, sc, br, color, size) {
    let data = ProductStateData.filter(x => x.status == "true" &&
      (mc.length === 0 || mc.includes(x.mainCategory.name)) &&
      (sc.length === 0 || sc.includes(x.subCategory.name)) &&
      (br.length === 0 || br.includes(x.brand.name)) &&
      (color.length === 0 || isInclude(color, x.color)) &&
      (size.length === 0 || isInclude(size, x.size))
    )
    applySortFilter(data, sortFilter, min, max)
  }
  function applySortFilter(data, option, min, max) {
    setSortFilter(option)
    if (min != -1 && max != -1)
      data = data.filter(x => x.finalPrice >= min && x.finalPrice <= max)
    if (option === "1") {
      data = data.sort((x, y) => y.id.localeCompare(x.id))
    } else if (option === "2") {
      data = data.sort((x, y) => x.finalPrice - y.finalPrice)
    } else {
      data = data.sort((x, y) => y.finalPrice - x.finalPrice)
    }
    setData(data)
  }
  function postSearch(e) {
    e.preventDefault()
    let ch = search.toLocaleLowerCase()
    let data = ProductStateData.filter(x => x.status == "true" &&
      (
        x.name.toLocaleLowerCase().includes(ch) ||
        x.mainCategory.name.toLocaleLowerCase() === ch ||
        x.subCategory.name.toLocaleLowerCase() === ch ||
        x.brand.name.toLocaleLowerCase() === ch ||
        x.color.includes(ch) ||
        x.size.includes(ch) ||
        x.discription?.includes(ch)
      )

    )

    applySortFilter(data, sortFilter, min, max)
  }
  return (
    <div>
      <main className="main">
        <Hero title="Shop Page" />
        <section id="portfolio" className="portfolio section my-0" style={{ margin: 0 }}>
          <div className="container-fluid my-0">
            <div className="row isotope-layout">
              <div className="col-lg-3 col-md-3 col-sm-6 my-0">
                <div className="list-group my-0 ">
                  <div className="list-group-item list-group-item-action text-light bg-dark" aria-current="true">
                    Main Category
                  </div>
                  {
                    MainCategoryStateData.filter(x => x.status == "true").map(item => {
                      return <button key={item.name} type="button" className="list-group-item list-group-item-action ">
                        <input type="checkbox" checked={mc.includes(item.name)} onChange={() => getInputCheckBox('mc', item.name)} name="" id={item.name} className='form-check-input border-dark me-2' />
                        <label for={item.name}>{item.name}</label></button>
                    })
                  }

                </div>

                <div className="list-group my-3">
                  <div className="list-group-item list-group-item-action text-light bg-dark" aria-current="true">
                    Sub Category
                  </div>
                  <div className="row">
                    {
                      SubCategoryStateData.filter(x => x.status == "true").map(item => {
                        return <div className="col-lg-6">
                          <button key={item.name} type="button" className="list-group-item list-group-item-action">
                            <input type="checkbox" checked={sc.includes(item.name)} onChange={() => getInputCheckBox('sc', item.name)} name="" id={item.name} className='form-check-input border-dark me-2' />
                            <label for={item.name}>{item.name}</label></button>
                        </div>
                      })
                    }
                  </div>

                </div>

                <div className="list-group my-3">
                  <div className="list-group-item list-group-item-action text-light bg-dark" aria-current="true">
                    Brand
                  </div>
                  <div className="row">
                    {
                      BrandStateData.filter(x => x.status == "true").map(item => {
                        return <div className="col-lg-6 ">
                          <button key={item.name} type="button" className="list-group-item list-group-item-action">
                            <input type="checkbox" checked={br.includes(item.name)} onChange={() => getInputCheckBox('br', item.name)} name="" id={item.name} className='form-check-input border-dark me-2' />
                            <label for={item.name}>{item.name}</label></button>
                        </div>
                      })
                    }
                  </div>

                </div>
                <div className="list-group my-3">
                  <div className="list-group-item list-group-item-action text-light bg-dark" aria-current="true">
                    Select Color
                  </div>
                  <div className="row">
                    {
                      color.map((item, index) => {
                        return <div key={index} className="col-lg-6 ">
                          <button type="button" className="list-group-item list-group-item-action">
                            <input type="checkbox" checked={selectedColor.includes(item)} onChange={() => getInputCheckBoxColorAndSize('color', item)} name="" id={item} className='form-check-input border-dark me-2' />
                            <label for={item}>{item}</label></button>
                        </div>
                      })
                    }
                  </div>

                </div>
                <div className="list-group my-3">
                  <div className="list-group-item list-group-item-action text-light bg-dark" aria-current="true">
                    Select Size
                  </div>
                  <div className="row">
                    {
                      size.map((item, index) => {
                        return <div key={index} className="col-lg-6 ">
                          <button type="button" className="list-group-item list-group-item-action">
                            <input type="checkbox" checked={selectedSize.includes(item)} onChange={() => getInputCheckBoxColorAndSize('size', item)} name="" id={item} className='form-check-input border-dark me-2' />
                            <label for={item}>{item}</label></button>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className="list-group my-3">
                  <div className="list-group-item list-group-item-action text-light bg-dark" aria-current="true">
                    Price Filter
                  </div>
                  <div className="row mt-1">
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      applySortFilter(data, sortFilter, min, max)
                    }}>
                      <input value={min == -1 ? "" : min} type="number" name="min" className='form-control my-0' placeholder='Minimum' onChange={(e) => setMin(e.target.value)} />
                      <input value={max == -1 ? "" : max} type="number" name="max" className='form-control my-1' placeholder='Maximum' onChange={(e) => setMax(e.target.value)} />
                      <button type="submit" className='btn btn-dark w-100'>Apply</button>
                    </form>
                  </div>
                </div>

              </div>

              <div className="col-lg-9 col-md-9 my-2">
                <div className="row gy-4 isotope-container">

                  <div className="row w-100 m-0" style={{ margin: 0 }}>
                    <div className="col-lg-9 p-0">

                      <form onSubmit={(e) => postSearch(e)} >
                        <div className="btn-group w-100">
                          <input type="search" name="search" onChange={(e) => setSearch(e.target.value)} className='form-control border-dark' placeholder='Search Products by Name, Category, Brand, Color, Size, etc' />
                          <button type="submit" className='btn btn-dark mx-2 border border-rounded'>Search</button>
                        </div>
                      </form>
                    </div>

                    <div className="col-lg-3 mt-0 pt-0">
                      <select value={sortFilter} onChange={(e) => applySortFilter(data, e.target.value, min, max)} className='form-select border-dark'>
                        <option value={1}>Latest</option>
                        <option value={2}>Price Low to High</option>
                        <option value={3}>Price High to Low</option>
                      </select>
                    </div>
                  </div>

                  {
                    data.map(item => {
                      return <div key={item.id} className="col-lg-4 mt-2 pt-0 col-md-6 portfolio-item isotope-item filter-app">
                        <div className="portfolio-content">
                          <img src={`data:${item.pics[0].fileType};base64,${item.pics[0].base64}`}
                            style={{ height: 400, width: 450 }}
                            alt={item.pics[0].name} className="img-fluid" />
                          <div className=" portfolio-info">
                            <h4>{item.brand.name}</h4>
                            <h3 className='text-light fs-5 position-absolute w-100 text-center' style={{ bottom: 70 }}>{item.name}</h3>
                            <p style={{ bottom: 30 }} className='p-2'><del className='p-1'>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice}<sup>{item.discount}% off</sup></p>
                            <Link to={`/product/${item.id}`}
                              className='btn btn-dark d-block text-light position-absolute text-center w-100'
                              style={{ bottom: 5, right: 2, width: 290 }}
                            >
                              Add To Cart
                            </Link>
                          </div>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
