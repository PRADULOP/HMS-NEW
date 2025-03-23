import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="container mt-20  px-4 py-12 relative">
      {/* Decorative Elements */}
      <div className="absolute -top-10 right-12 w-24 h-24 bg-cyan-100 rounded-full opacity-50 blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-cyan-200 rounded-full opacity-40 blur-lg"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-cyan-300 rounded-full opacity-60 animate-pulse"></div>
      
      {/* Dots pattern */}
      <div className="absolute right-12 top-1/4 hidden lg:block">
        <div className="grid grid-cols-2 gap-2">
          <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
          <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
          <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
          <div className="w-2 h-2 bg-cyan-200 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10">
        {/* About Us Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 relative inline-block">
            ABOUT <span className="text-cyan-600">US</span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"></div>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-cyan-200 rounded-xl"></div>
              <img 
                className="w-full rounded-xl shadow-lg relative z-10 hover:scale-105 transition-transform duration-500" 
                src={assets.about_image} 
                alt="About CareConnect" 
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-100 rounded-full opacity-50 z-0"></div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center gap-6 md:w-3/5 lg:w-2/3 text-gray-600">
            <p className="text-lg leading-relaxed">
              Welcome to <span className="font-semibold text-cyan-600">CareConnect</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. At CareConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            
            <p className="text-lg leading-relaxed">
              CareConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, CareConnect is here to support you every step of the way.
            </p>
            
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                Our vision at CareConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 relative inline-block">
            WHY <span className="text-cyan-600">CHOOSE US</span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "EFFICIENCY",
              description: "Streamlined appointment scheduling that fits into your busy lifestyle."
            },
            {
              title: "CONVENIENCE",
              description: "Access to a network of trusted healthcare professionals in your area."
            },
            {
              title: "PERSONALIZATION",
              description: "Tailored recommendations and reminders to help you stay on top of your health."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="group border border-gray-200 rounded-xl p-8 flex flex-col gap-4 hover:bg-gradient-to-r from-cyan-500 to-cyan-600 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 group-hover:bg-white group-hover:text-cyan-600 transition-all mb-2">
                {index === 0 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )}
                {index === 2 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About

// import React from 'react'
// import { assets } from '../assets/assets'

// const About = () => {
//   return (
//     <div>

//       <div className='text-center text-2xl pt-10 text-[#707070] mt-16'>
//         <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
//       </div>

//       <div className='my-10 flex flex-col md:flex-row gap-12'>
//         <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
//         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
//           <p>Welcome to CareConnect, your trusted partner in managing your healthcare needs conveniently and efficiently. At CareConnect, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
//           <p>CareConnect is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, CareConnect is here to support you every step of the way.</p>
//           <b className='text-gray-800'>Our Vision</b>
//           <p>Our vision at CareConnect is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
//         </div>
//       </div>

//       <div className='text-xl my-4'>
//         <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
//       </div>

//       <div className='flex flex-col md:flex-row mb-20'>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-cyan-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>EFFICIENCY:</b>
//           <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-cyan-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>CONVENIENCE: </b>
//           <p>Access to a network of trusted healthcare professionals in your area.</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-cyan-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>PERSONALIZATION:</b>
//           <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default About
