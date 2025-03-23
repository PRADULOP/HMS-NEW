import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          {/* <img className='mb-5 w-40' src={assets.logo} alt="" /> */}
          <span className="mb-5 w-40 font-bold text-xl text-cyan-600 px-3">Care Connect</span>
          <p className='w-full md:w-2/3 text-gray-600 leading-6 px-3'>At CareConnect, we connect you with highly qualified and experienced doctors from various specialties. Our trusted network of medical professionals includes certified practitioners, specialists, and surgeons with years of expertise in providing top-notch healthcare. Whether you need a general consultation, a specialist advice, or ongoing care, CareConnect ensures you have access to the best medical services from the comfort of your home.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 px-3'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600 px-3'>
            <NavLink to='/'><li>Home</li></NavLink>
           <NavLink to='/about'> <li>About us</li></NavLink>
           <NavLink to='/contact'> <li>Contact</li></NavLink>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 px-3'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600 px-3'>
            <li>+91 9999999999</li>
            <li>careconnect@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ careconnect.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
