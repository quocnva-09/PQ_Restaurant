import React, {useEffect, useState} from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay } from 'swiper/modules';
import { promotion } from '../assets/assets';
import ItemPromotions from './ItemPromotions';

const Promotion = () => {

    const [newPromotions,setNewPromotions]=useState([]);
    
      useEffect(()=>{
        const data=promotion.filter((item)=>item.inStock).slice(0,10);
        setNewPromotions(data);
      }, [promotion])

  return (
      <section className='max-padd-container py-15 bg-white'>
      <div className='flexCenter flex-col pb-10'>
        <h3 className='uppercase text-gray-50'>Promotions</h3>
      </div>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          500:{
            slidesPerView:2,
          },
          700:{
            slidesPerView:3,
          },
          1022:{
            slidesPerView:4,
          },
          1350:{
            slidesPerView:5,
          },
          
        }}
        modules={[Autoplay]}
        className="min-h-[325px]"
      >
        {newPromotions.map((promo)=>(
          <SwiperSlide key={promo.id}>
            <ItemPromotions promo={promo} /> 
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Promotion
