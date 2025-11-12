import React from 'react'
import { NavLink } from 'react-router'
import { assets } from '../assets/assets.js'
function Sidebar() {
  return (
    <div className='w-[18%] border-r-2 border-gray-400 '>

        <div className='flex flex-col gap-4 pt-6  '>

<NavLink className="    flex   gap-2 border  border-gray-300 b-r-0  px-2 py-1  md:px-2 md:py-3 "  to="/app/orders">

      <img className=' ' src={assets.order_icon} alt="" />
      <p className='hidden md:block'>Orders</p>

    </NavLink>
     <NavLink className="flex   gap-2 border  border-gray-300 b-r-0  px-2 py-1  md:px-2 md:py-3 "  to="/app/incomplete-orders">

      <img className=' ' src={assets.order_icon} alt="" />
      <p className='hidden md:block'>Incomplete Orders</p>

    </NavLink>
     <NavLink className="flex     gap-2 border  border-gray-300 b-r-0  px-2 py-1  md:px-2 md:py-3 "  to="/app/orders-ratio">

      <img className=' ' src={assets.order_icon} alt="" />
      <p className='hidden md:block'>Delivered</p>

    </NavLink>
     
        </div>

    
</div>

  )
}

export default Sidebar