import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="bg-gradient-to-br min-h-screen py-16 mt-10">
      {/* Hero Section with Animated Border */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-cyan-200 rounded-lg transform rotate-1 opacity-20"></div>
          <div className="relative bg-white rounded-lg  p-5">
            <h2 className="text-center font-serif">
              <span className="text-3xl text-cyan-600 font-light tracking-wide">CONNECT</span>
              <span className="text-3xl text-gray-800 font-bold tracking-tight"> WITH US</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image with Overlay */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-70 transition duration-1000"></div>
            <div className="relative">
              <img 
                className="rounded-lg shadow-lg w-full object-cover" 
                src={assets.contact_image} 
                alt="CareConnect Office" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-lg">
                <p className="text-white font-medium">CareConnect Headquarters</p>
                <p className="text-cyan-100 text-sm">Where Compassion Meets Innovation</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="space-y-8">
            {/* Office Location Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500 hover:translate-y-[-4px] transition duration-300">
              <h3 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <svg className="w-6 h-6 text-cyan-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                OUR OFFICE
              </h3>
              <p className="text-gray-600 ml-8">
                Techno Park Phase 3<br />
                Trivandrum, Kerala<br />
                India
              </p>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:translate-y-[-4px] transition duration-300">
              <h3 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                GET IN TOUCH
              </h3>
              <div className="ml-8 space-y-2">
                <p className="text-gray-600 flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Tel:</span> 
                  (91) 9999999999
                </p>
                <p className="text-gray-600 flex items-center">
                  <span className="font-medium text-gray-700 mr-2">Email:</span> 
                  <a href="mailto:careconnect@gmail.com" className="text-cyan-600 hover:text-cyan-800 transition-colors">careconnect@gmail.com</a>
                </p>
              </div>
            </div>

            {/* Careers Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500 hover:translate-y-[-4px] transition duration-300">
              <h3 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                <svg className="w-6 h-6 text-cyan-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                CAREERS AT CareConnect
              </h3>
              <p className="text-gray-600 ml-8 mb-4">
                Join our team of healthcare innovators and make a difference in patients' lives.
              </p>
              <div className="ml-8">
                <button className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-cyan-600 border-2 border-cyan-600 rounded-md shadow-md">
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:opacity-100"></span>
                  <span className="relative flex items-center group-hover:text-white transition-colors duration-300 ease-out">
                    Explore Jobs
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


// import React from 'react'
// import { assets } from '../assets/assets'

// const Contact = () => {
//   return (
//     <div>

//       <div className='text-center text-2xl pt-10 text-[#707070] mt-20'>
//         <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
//       </div>

//       <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
//         <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
//         <div className='flex flex-col justify-center items-start gap-6'>
//           <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
//           <p className=' text-gray-500'>Techno Park phase 3<br />Trivandrum</p>
//           <p className=' text-gray-500'>Tel: (91) 9999999999 <br /> Email: careconnect@gmail.com</p>
//           <p className=' font-semibold text-lg text-gray-600'>CAREERS AT CareConnect</p>
//           <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
//           <button className='border border-black px-8 py-4 text-sm hover:bg-cyan-500 hover:text-white transition-all duration-500'>Explore Jobs</button>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Contact
