import React from 'react'

const ItemPromotions = ({promo}) => {


  return (
    <div className='relative mt-20 group'>
      <div className='mx-auto rounded-full absolute left-0 right-0 -top-21 h-[177px] w-[177px]'>
        <img 
        src={promo.img[0]} 
        alt="promoImg" 
        // height={} 
        // width={177}
        />
        <img 
        src={promo.img[1] ? promo.img[1]:promo.img[0]} 
        alt="promoImg" 
        // height={177} 
        // width={177} 
        />
      </div>
    </div>
  )
}

export default ItemPromotions
