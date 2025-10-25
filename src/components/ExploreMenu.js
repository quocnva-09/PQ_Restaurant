import React from 'react'
import { menuList } from '../assets/assets'
// import NewArrivals from './NewArrivals'
// import FoodItems from './FoodItems'
const ExploreMenu = ({category, setCategory}) => {

  return (
    <section className='max-padd-container py-22 xl:py-10 bg-white'>
    {/* //<section className='mx-auto max-w-[1440px] px-4 lg:px-12 flex justify-between items-center bg-white'> */}
      <div className='flex flex-col gap-5'> 
      <h3 className='text-gray-50'>Menu Của Chúng Tôi</h3>
      <div className='flex justify-between items-center text-center my-5 overflow-x-scroll hide-scrollbar'>
        {menuList.map((item,index)=>{
            return (
                <div key={index} onClick={()=>setCategory(prev=>prev===item.name ? "All":item.name)}>
                    <img src={item.img} alt="" className={category===item.name
                    ?"border-4 border-[tomato] p-0.5 w-28 h-28 rounded-full object-cover"
                        :"w-28 h-28 rounded-full object-cover"}/>
                    <p className='mt-[10px] text-gray-50 font-bold cursor-pointer'>{item.name}</p>
                </div>
            )
        })}
      </div>
      <hr className='gap h-0.5 '/>
    </div>
    </section>
    
  )
}

export default ExploreMenu
