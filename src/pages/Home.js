import React from 'react'
import Hero from '../components/Hero'
import NewArrivals from '../components/NewArrivals'
import Promotion from '../components/Promotion'
import About from '../components/About'
import PopularProducts from '../components/PopularProducts'
import Comments from '../components/Comments'

const Home = () => {
  return (
    <>
      <Hero />
      <Promotion />
      <NewArrivals />
      <About />
      <PopularProducts />
      <Comments />
    </>
  )
}

export default Home
