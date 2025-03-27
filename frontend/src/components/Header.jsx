import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-cyan-400 opacity-20 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-blue-400 opacity-20 rounded-full"></div>
        
        <div className="flex flex-col md:flex-row items-center relative z-10">


{/* Left Side - Image - FIXED */}
<div className="w-full md:w-1/2 md:self-stretch flex items-end">
            <div className="relative w-full h-full">
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-blue-50 opacity-20 rounded-lg rotate-12 z-0"></div>
              <div className="absolute bottom-20 left-5 w-16 h-16 bg-cyan-50 opacity-20 rounded-full z-0"></div>
              
              {/* Main image - FIXED */}
              <div className="relative w-full h-full flex items-end">
                <div className="relative w-full">
                  <div className="relative w-full overflow-hidden">
                    {/* Image shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-600/20 rounded-xl z-10"></div>
                    
                    {/* The image */}
                    <img 
                      src={assets.fivedoctors} 
                      alt="Medical Team" 
                      className="w-full object-cover rounded-lg md:rounded-bl-none md:rounded-tl-lg md:rounded-tr-lg shadow-lg" 
                    />
                  </div>
                
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full md:w-1/2 px-6 md:px-12 py-12 md:py-16 lg:py-20">
            <div className="max-w-lg">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                <span>24/7 Medical Assistance Available</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Your Health, <br />
                <span className="relative">
                  Our Priority
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5C17 2.5 33 1 80 1C127 1 147 6.5 199 5.5" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-white/80 text-lg mb-8 max-w-md">
                Connect with board-certified specialists and schedule appointments with just a few clicks, anytime and anywhere.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                        <div className={`w-full h-full bg-gradient-to-br from-cyan-${300 + i*100} to-blue-${300 + i*100}`}></div>
                      </div>
                    ))}
                  </div>
                  <div className="text-white">
                    <div className="text-xl font-bold">500+</div>
                    <div className="text-white/70 text-sm">Trusted Doctors</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <div className="text-xl font-bold">24/7</div>
                    <div className="text-white/70 text-sm">Available Support</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#speciality" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-cyan-600 font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  Book Appointment
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <a 
                  href="/doctors" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Find Doctors
                </a>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
      
      
    </div>
  )
}

export default Header


