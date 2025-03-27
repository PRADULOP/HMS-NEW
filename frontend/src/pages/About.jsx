import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="container mt-20  px-4 py-12 relative">
    

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
              Welcome to <span className="font-semibold text-cyan-600">CareConnect</span>, Your reliable companion for seamless healthcare management. At CareConnect, we simplify scheduling doctor appointments and managing health records, ensuring a hassle-free experience for you.
            </p>
            
            <p className="text-lg leading-relaxed">
            CareConnect is dedicated to revolutionizing healthcare technology. We constantly innovate to enhance our platform, ensuring a seamless user experience and top-tier service. Whether scheduling your first appointment or managing ongoing care, CareConnect is your trusted partner at every stage.
            </p>
            
            <div className="mt-4">
              
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
              title: "Productivity,",
              description: "Effortless appointment scheduling designed to fit your busy lifestyle."
            },
            {
              title: "Accessibility",
              description: "Connect with a network of trusted healthcare professionals near you."
            },
            {
              title: "Individualization",
              description: "Personalized recommendations and reminders to keep you in control of your health."
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


