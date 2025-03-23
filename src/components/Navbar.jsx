import React from 'react'

const Navbar = () => {
  return (
  <nav className='flex justify-between bg-slate-700 md:w-full text-white py-3'>
    <div className="logo flex items-center relative left-7 gap-1">
        <img height={40} width={40} src="/list3.png" alt="List" />
        <span className='font-bold text-xl '>iTask</span>
    </div>
    <ul className="flex mx-10 gap-8 cursor-pointer items-center">
        <li className='hover:font-bold transition-all duration-100'>Home</li>
        <li className='hover:font-bold transition-all duration-100'>Your Tasks</li>
    </ul>
  </nav>
  )
}

export default Navbar
