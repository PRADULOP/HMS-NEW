import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className="container mx-auto px-4 relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 right-12 w-20 h-20 bg-cyan-100 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute bottom-8 left-20 w-16 h-16 bg-cyan-200 rounded-full opacity-40 blur-lg"></div>
            <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-white rounded-full opacity-70 animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-white rounded-full opacity-60 animate-ping"></div>
            
            {/* Cross pattern decorative element (top right) */}
            <div className="absolute top-0 right-32 hidden lg:flex items-center justify-center">
                <div className="w-8 h-1 bg-cyan-200 rounded rotate-45"></div>
                <div className="w-8 h-1 bg-cyan-200 rounded -rotate-45 absolute"></div>
            </div>
            
            {/* Dots pattern (left side) */}
            <div className="absolute left-8 top-1/3 hidden md:block">
                <div className="grid grid-cols-2 gap-2">
                    <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
                    <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
                    <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
                    <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
                </div>
            </div>

            <div className="flex bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl shadow-lg overflow-hidden px-6 sm:px-10 md:px-14 lg:px-16 my-16 md:mx-6 relative z-10">
                {/* Wave decorative element */}
                <div className="absolute top-0 left-0 right-0 h-2 overflow-hidden">
                    <div className="h-16 w-full bg-cyan-400 rounded-full opacity-30 -translate-y-12"></div>
                </div>
                
                {/* Circular accent */}
                <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-400 rounded-full opacity-20"></div>
                
                {/* ------- Left Side ------- */}
                <div className="flex-1 py-10 sm:py-12 md:py-16 lg:py-24 relative z-10">
                    <div className="space-y-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            Book Appointment
                            <span className="block mt-2 md:mt-4">With 500+ Trusted Doctors</span>
                        </h2>
                        <p className="text-white text-opacity-90 text-base md:text-lg max-w-lg mt-4 hidden sm:block">
                            Connect with experienced healthcare professionals and get the care you deserve
                        </p>
                        
                        {/* Decorative line under text */}
                        <div className="w-20 h-1 bg-white opacity-60 rounded-full"></div>
                        
                        <button 
                            onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                            className="mt-6 bg-white text-gray-700 px-8 py-3 rounded-md font-medium shadow-md hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transform hover:-translate-y-1 group"
                        >
                            Create account
                            <span className="inline-block ml-2 transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>

                {/* ------- Right Side ------- */}
                <div className="hidden md:block md:w-1/2 lg:w-[400px] relative">
                    {/* Floating dots around image */}
                    <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full opacity-60 animate-float-slow"></div>
                    <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white rounded-full opacity-70 animate-float-medium"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-white rounded-full opacity-50 animate-float-fast"></div>
                    
                    {/* <img 
                        className="w-full absolute bottom-0 right-0 max-w-md object-contain h-full transform transition-transform duration-500 hover:scale-105 drop-shadow-xl" 
                        src={assets.appointment_img} 
                        alt="Doctor illustration" 
                    /> */}
                </div>
            </div>
            
            {/* Bottom decorative element */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-cyan-200 rounded-full opacity-70"></div>
        </div>
    )
}

// Add these animations to your global CSS or use inline styles
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes float-medium {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes float-fast {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  .animate-float-slow {
    animation: float-slow 5s ease-in-out infinite;
  }
  .animate-float-medium {
    animation: float-medium 4s ease-in-out infinite;
  }
  .animate-float-fast {
    animation: float-fast 3s ease-in-out infinite;
  }
`;
document.head.appendChild(styleTag);

export default Banner



