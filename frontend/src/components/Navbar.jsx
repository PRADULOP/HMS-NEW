import React, { useContext, useState, useEffect, useCallback } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  // Debounce function to optimize scroll handling
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY > 20
    if (scrollPosition !== scrolled) setScrolled(scrollPosition)
  }, [scrolled])

  useEffect(() => {
    const handleDebouncedScroll = () => requestAnimationFrame(handleScroll)
    window.addEventListener('scroll', handleDebouncedScroll)
    return () => window.removeEventListener('scroll', handleDebouncedScroll)
  }, [handleScroll])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  // Reusable NavLink Component
  const MenuItem = ({ to, label }) => {
    const isActive = location.pathname === to
    return (
      <NavLink
        to={to}
        onClick={() => setShowMenu(false)}
        className={`block px-4 py-2 rounded-md transition-colors ${
          isActive ? 'text-cyan-600 font-semibold bg-cyan-50' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        {label}
      </NavLink>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-white shadow-md' : 'py-4 bg-white/90 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate('/')} 
          className='flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform'
        >
          <span className="font-bold text-xl text-cyan-600">Care Connect</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6">
          <MenuItem to="/" label="HOME" />
          <MenuItem to="/doctors" label="ALL DOCTORS" />
          <MenuItem to="/about" label="ABOUT" />
          <MenuItem to="/contact" label="CONTACT" />
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {token && userData ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100">
                <img src={userData.image} alt="User" className="w-9 h-9 rounded-full border-2 border-cyan-500 object-cover" />
                <span className="hidden sm:block">{userData.name}</span>
              </div>

              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl border border-gray-100 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button onClick={() => navigate('/my-profile')} className="w-full text-left px-4 py-2 hover:bg-gray-50">My Profile</button>
                <button onClick={() => navigate('/my-appointments')} className="w-full text-left px-4 py-2 hover:bg-gray-50">My Appointments</button>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Logout</button>
              </div>
            </div>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')} 
                className="hidden md:flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-md hover:shadow-lg"
              >
                Log In
              </button>
             
            </>
          )}

          {/* Mobile Menu Trigger */}
          <button onClick={() => setShowMenu(true)} className="md:hidden p-2 rounded-full hover:bg-gray-100">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-xl transition-transform ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-bold text-cyan-600">Care Connect</span>
            <button onClick={() => setShowMenu(false)} className="p-2 rounded-full hover:bg-gray-100">✕</button>
          </div>

          {/* Menu Items */}
          <div className="p-4">
            <MenuItem to="/" label="HOME" />
            <MenuItem to="/doctors" label="ALL DOCTORS" />
            <MenuItem to="/about" label="ABOUT" />
            <MenuItem to="/contact" label="CONTACT" />

            {/* Mobile Logout */}
            {token && userData ? (
              <>
                <button onClick={() => navigate('/my-profile')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">My Profile</button>
                <button onClick={() => navigate('/my-appointments')} className="block w-full text-left px-4 py-2 hover:bg-gray-50">My Appointments</button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Logout</button>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="block w-full px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 mt-4">Sign In</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar





// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'

// const Navbar = () => {

//   const navigate = useNavigate()

//   const [showMenu, setShowMenu] = useState(false)
//   const { token, setToken, userData } = useContext(AppContext)

//   const logout = () => {
//     localStorage.removeItem('token')
//     setToken(false)
//     navigate('/login')
//   }

//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
//       <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo2} alt="" />
//       <ul className='md:flex items-start gap-5 font-medium hidden'>
//         <NavLink to='/' >
//           <li className='py-1'>HOME</li>
//           <hr className='border-none outline-none h-0.5 bg-cyan-500 w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/doctors' >
//           <li className='py-1'>ALL DOCTORS</li>
//           <hr className='border-none outline-none h-0.5 bg-cyan-500 w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/about' >
//           <li className='py-1'>ABOUT</li>
//           <hr className='border-none outline-none h-0.5 bg-cyan-500 w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/contact' >
//           <li className='py-1'>CONTACT</li>
//           <hr className='border-none outline-none h-0.5 bg-cyan-500 w-3/5 m-auto hidden' />
//         </NavLink>
//       </ul>

//       <div className='flex items-center gap-4 '>
//         {
//           token && userData
//             ? <div className='flex items-center gap-2 cursor-pointer group relative'>
//               <img className='w-8 rounded-full' src={userData.image} alt="" />
//               <img className='w-2.5' src={assets.dropdown_icon} alt="" />
//               <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//                 <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4'>
//                   <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
//                   <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                   <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
//                 </div>
//               </div>
//             </div>
//             : <button onClick={() => navigate('/login')} className='bg-cyan-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
//         }
//         <button onClick={() => navigate('/admin-login')} className='bg-cyan-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Admin/Doctor</button>
        
//         <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

//         {/* ---- Mobile Menu ---- */}
//         <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//           <div className='flex items-center justify-between px-5 py-6'>
//             <img src={assets.logo} className='w-36' alt="" />
//             <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="" />
//           </div>
//           <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//             <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar