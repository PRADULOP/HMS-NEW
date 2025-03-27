import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className="container mx-auto py-16 px-4">
            <div className="flex flex-col items-center mb-12">
                <div className="relative mb-6">
                    <h1 className="text-4xl font-bold text-gray-800">Top Doctors to Book</h1>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-cyan-500 rounded-full"></div>
                </div>
                <p className="max-w-md text-center text-gray-600">Simply browse through our extensive list of trusted doctors.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {doctors.slice(0, 10).map((item, index) => (
                    <div 
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className="group relative overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="p-5">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                item.available 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-gray-100 text-gray-500'
                            }`}>
                                <span className={`w-2 h-2 rounded-full mr-2 ${
                                    item.available ? 'bg-green-500' : 'bg-gray-500'
                                }`}></span>
                                {item.available ? 'Available' : 'Not Available'}
                            </div>
                            <h3 className="mt-3 text-xl font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-cyan-500 font-medium">{item.speciality}</p>
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-cyan-500 transition-all duration-300 group-hover:w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-12">
                <button 
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                    className="px-8 py-3 bg-white border-2 border-cyan-500 text-cyan-500 font-semibold rounded-lg hover:bg-cyan-500 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg flex items-center"
                >
                    <span>View All Doctors</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TopDoctors