import React from 'react'

function Navbar() {
  return (
  <nav className=" flex items-center justify-between px-[4%] py-2 ">
  {/* Logo */}
  <div className="text-xl font-bold">
    Logo
  </div>

  {/* Logout Button */}
  <div>
    <button className=" font-semi bg-emerald-950  text-white px-4 py-2 rounded  text-lg md:text-lg hover:bg-gray-100 transition duration-300">
      Logout
    </button>
  </div>
</nav>

  )
}

export default Navbar