import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='bg-gradient-to-b from-white to-blue-50 py-20 rounded-2xl'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl sm:text-4xl font-bold text-slate-800 mb-4'>
                        <span className='relative'>
                            <span className='relative z-10'>Find by Speciality</span>
                            <span className='absolute bottom-1 left-0 w-full h-3 bg-cyan-200 opacity-40 z-0'></span>
                        </span>
                    </h2>
                    <p className='max-w-2xl mx-auto text-slate-600 text-lg'>
                        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                    </p>
                </div>
                
                <div className='relative'>

                    
                    <div className='flex gap-6 md:gap-8 py-4 px-2 overflow-x-auto scrollbar-hide snap-x'>
                        {specialityData.map((item, index) => (
                            <Link 
                                to={`/doctors/${item.speciality}`} 
                                onClick={() => scrollTo(0, 0)} 
                                className='group flex flex-col items-center flex-shrink-0 snap-start' 
                                key={index}
                            >
                                <div className='w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-md overflow-hidden p-2 flex items-center justify-center mb-4 relative group-hover:shadow-lg transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105'>
                                    {/* Inner circle pulse effect */}
                                    <div className='absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl'></div>
                                    
                                    {/* Image */}
                                    <img 
                                        className='w-16 sm:w-20 relative z-10 transition-all duration-300 transform group-hover:scale-110' 
                                        src={item.image} 
                                        alt={item.speciality} 
                                    />
                                </div>
                                
                                <div className='relative overflow-hidden'>
                                    <p className='font-medium text-center text-slate-700 text-sm sm:text-base whitespace-nowrap'>
                                        {item.speciality}
                                    </p>
                                    
                                    {/* Animated underline on hover */}
                                    <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full'></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                
                <div className='flex justify-center mt-12'>
                    <Link to='/doctors'><button className='px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center'>
                        View All Specialities
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button></Link>
                </div>
            </div>
        </div>
    )
}

export default SpecialityMenu

// import React from 'react'
// import { specialityData } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const SpecialityMenu = () => {
//     return (
//         <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
//             <h1 className='text-3xl font-medium'>Find by Speciality</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
//             <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
//                 {specialityData.map((item, index) => (
//                     <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index}>
//                         <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="" />
//                         <p>{item.speciality}</p>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default SpecialityMenu