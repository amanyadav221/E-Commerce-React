import React, { useEffect } from 'react'
import Crousel from './Crousel'

import BrandSlider from '../components/BrandSlider'
import Stats from '../components/Stats'
import Features from '../components/Features'

import Products from '../components/Products'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import ProductSlider from '../components/ProductSlider'
import About from '../components/About'
import MainCategorySlider from '../components/MainCategorySlider'
import SubCategorySlider from '../components/SubCategorySlider'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMainCategory } from '../Redux/ActionCreators/MainCategoryActionCreators'
import { getAllProduct } from '../Redux/ActionCreators/ProductActionCreators'

export default function HomePage() {
  let MainCategoryStateData = useSelector(state => state.MainCategoryStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()
  useEffect(() => {
    (() => {
      dispatch(getAllMainCategory())
    })()
  }, [MainCategoryStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getAllProduct())
    })()
  }, [ProductStateData.length])
  return (
    <div>
      <Crousel />
      {/* <BrandSlider /> */}
      <About />
      <Stats />
      <Features />
      <MainCategorySlider />
      <Products mainCategory={MainCategoryStateData.filter((x => { return x.status === "true" }))} product={ProductStateData.filter((x => x.status === "true"))} />

      <Testimonials />
      <SubCategorySlider />
      {
        MainCategoryStateData.filter(x => x.status == "true").map(item => {
          return <ProductSlider key={item.name} title={item.name} data={ProductStateData?.filter(x => x.status == "true" && x.mainCategory.name === item.name)} />
        })
      }
      <Faq />
      
    </div>
  )
}
