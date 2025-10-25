import React from 'react'
import Title from './Title'
import { myAssets } from '../assets/assets'
function About ()  {
  return (
    <section className='max-padd-container py-12 xl:py-24'>
      {/* CONTAINER */}
      <div className='flexCenter flex-col gap-16 xl:gap-8 xl:flex-row'>
        {/* Left Side */}
        <div className='flex-1 '>
        <Title title1={"Điểm nổi bật"} title2={"dịch vụ của chúng "} 
        titleStyles={"items-start"}/>
        <div className='flex flex-col items-start gap-y-4'>
          <div className='flexCenter gap-x-4'>
            <div className='h-16 min-w-16 bg-solid flexCenter rounded-md'>
              <img src={myAssets.delivery} alt="" width={22} className='invert'/>
              </div>
              <div>
                <h4>Giao Hàng Nhanh</h4>
                <p>Chúng tôi vận chuyển những món ăn ngon và nóng đến cho bạn chỉ trong vài phút</p>
              </div>
          </div>
          <div className='flexCenter gap-x-4'>
            <div className='h-16 min-w-16 bg-solid flexCenter rounded-md'>
              <img src={myAssets.secure} alt="" width={22} className='invert'/>
              </div>
              <div>
                <h4>Bảo Mật Khi Thanh Toán</h4>
                <p>Mọi Thanh Toán Của Bạn Dều Được Bảo Mật Với Phương Thức Thanh Toán Đơn Giản Và Nhanh Chóng</p>
              </div>
          </div>
          <div className='flexCenter gap-x-4'>
            <div className='h-16 min-w-16 bg-solid flexCenter rounded-md'>
              <img src={myAssets.phone} alt="" width={22} className='invert'/>
              </div>
              <div>
                <h4>Hỗ Trợ 24/7</h4>
                <p>CHúng Tôi Luôn Hỗ Trợ Các Bạn 24/7</p>
              </div>
          </div>
        </div>
        </div>
        {/* Right Side */}
        <div className='flex-1 flexCenter gap-5'> 
          <div className='flex-1'>
            <img src={myAssets.feature1} alt="" className='rounded-3xl'/>
          </div>
          <div className='flex-1 flex gap-5 flex-col'>
            <img src={myAssets.feature2} alt="" className='rounded-3xl'/>
            <img src={myAssets.feature3} alt="" className='rounded-3xl'/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
