import React from 'react'
import { myAssets } from '../assets/assets';

const ItemPromotions = ({promo}) => {
  const imageSrc = myAssets[promo.img];


  return (
    <div className='relative mt-20 group'>
      <div className='mx-auto rounded-full absolute left-0 right-0 -top-21 h-[177px] w-[177px]'>
        <img 
        src={imageSrc} 
        alt="promoImg" 
        // height={} 
        // width={177}
        />
        <img 
        src={imageSrc} 
        alt="promoImg" 
        // height={177} 
        // width={177} 
        />
      </div>
    </div>
  )
}

export default ItemPromotions
