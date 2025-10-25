import React, { useState } from 'react'
import Rating from './Rating'
import ExploreMenu from './ExploreMenu'

const Hero = () => {


  return (
    <section className='max-padd-container'>
      <div className="lg:bg-[url('/src/assets/udon_bg.png')] bg-cover bg-center
      bg-no-repeat h-screen w-full rounded-2x1 relative">
          {/* CONTAINER */}
        <div className='mx-auto max-w-[1440px] px-4 flex flex-col 
        justify-between h-full'>
          {/* Top */}
            <div className='max-w-[788px] pt-44 lg:pt-45'>
                <h3>Udon Ngon – Giá Ngon!</h3>
                <h2 className='uppercase !mb-0 tracking-[0.22rem]'>
                  <span className="text-solidOne">Mua Nhiều </span>
                  <br />
                <span className="text-black">Giảm Nhiều - 25% Off!</span></h2>
                <h1 className='font-[800] leading-none'>
                    Udon và Curry
                </h1>
                <div className='flex items-center'>
                    <h3>Giá Từ</h3>
                    <span className='bg-white p-1 inline-block rotate-[-2deg] ml-2.5 text-5xl font-extrabold'>
                        <span className='text-2xl relative bottom-3'>đ</span>89.
                        <span className='text-2x1'>000</span>
                    </span>
                </div>
                <button className='btn-solid !rounded-none p-5 w-52 text-lg font-bold mt-8 text-white'>Đặt Ngay</button>
            </div>
            {/* Bottom */}
            <div className="pb-9">
              <Rating />
            </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
