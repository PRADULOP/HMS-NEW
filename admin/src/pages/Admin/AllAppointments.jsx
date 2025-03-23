import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  const filteredAppointments = appointments.filter(item => {
    // Status filter
    if (filterStatus === 'completed' && !item.isCompleted) return false;
    if (filterStatus === 'cancelled' && !item.cancelled) return false;
    if (filterStatus === 'active' && (item.isCompleted || item.cancelled)) return false;
    
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    return item.userData.name.toLowerCase().includes(searchLower) || 
           item.docData.name.toLowerCase().includes(searchLower);
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>
        <p className="text-gray-500 mt-1">Manage and monitor patient appointments</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setFilterStatus('all')} 
            className={`px-4 py-2 text-sm font-medium rounded-md ${filterStatus === 'all' ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilterStatus('active')} 
            className={`px-4 py-2 text-sm font-medium rounded-md ${filterStatus === 'active' ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilterStatus('completed')} 
            className={`px-4 py-2 text-sm font-medium rounded-md ${filterStatus === 'completed' ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Completed
          </button>
          <button 
            onClick={() => setFilterStatus('cancelled')} 
            className={`px-4 py-2 text-sm font-medium rounded-md ${filterStatus === 'cancelled' ? 'bg-cyan-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Age</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover" src={item.userData.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.userData.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{calculateAge(item.userData.dob)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{slotDateFormat(item.slotDate)}</div>
                      <div className="text-sm text-gray-500">{item.slotTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover bg-gray-200" src={item.docData.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.docData.name}</div>
                          <div className="text-xs text-gray-500">Specialist</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{currency}{item.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.cancelled ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-800">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!item.cancelled && !item.isCompleted && (
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;

// import React, { useEffect } from 'react'
// import { assets } from '../../assets/assets'
// import { useContext } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { AppContext } from '../../context/AppContext'

// const AllAppointments = () => {

//   const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
//   const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments()
//     }
//   }, [aToken])

//   return (
//     <div className='w-full max-w-6xl m-5 '>

//       <p className='mb-3 text-lg font-medium'>All Appointments</p>

//       <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
//         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>
//         {appointments.map((item, index) => (
//           <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//             <p className='max-sm:hidden'>{index+1}</p>
//             <div className='flex items-center gap-2'>
//               <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
//             </div>
//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
//             <div className='flex items-center gap-2'>
//               <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p>
//             </div>
//             <p>{currency}{item.amount}</p>
//             {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
//           </div>
//         ))}
//       </div>

//     </div>
//   )
// }

// export default AllAppointments