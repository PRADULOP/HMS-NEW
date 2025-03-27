import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { Link, NavLink } from 'react-router-dom'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  const StatCard = ({ icon, count, label }) => (
    <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg">
        <img className="w-12 h-12" src={icon} alt={label} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-700">{count}</p>
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>
    </div>
  )

  return dashData && (
    <div className="py-8 px-6 w-full min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 ">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={assets.doctor_icon}
            count={dashData.doctors}
            label="Total Doctors"
          />
          <StatCard
            icon={assets.appointments_icon}
            count={dashData.appointments}
            label="Active Appointments"
          />
          <StatCard
            icon={assets.patients_icon}
            count={dashData.patients}
            label="Registered Patients"
          />
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-500 px-6 py-4 flex items-center gap-3">
            <img src={assets.list_icon} alt="List" className="w-6 h-6 invert" />
            <h2 className="text-lg font-semibold text-white">Latest Bookings</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div 
                key={index} 
                className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="mr-4">
                  <img 
                    src={item.docData.image} 
                    alt={item.docData.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
                  />
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-sm text-gray-600">
                    <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full mr-2">
                      {slotDateFormat(item.slotDate)}
                    </span>
                    Appointment
                  </p>
                </div>
                
                <div>
                  {item.cancelled ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
                      Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className="group p-2 rounded-full hover:bg-red-50 transition-colors duration-150"
                      title="Cancel Appointment"
                    >
                      <img 
                        src={assets.cancel_icon} 
                        alt="Cancel" 
                        className="w-6 h-6 group-hover:scale-110 transition-transform" 
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {dashData.latestAppointments.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-gray-500">No appointments found</p>
              </div>
            )}
          </div>

          {dashData.latestAppointments.length > 5 && (
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-right">
             <Link to='/all-appointments'> <button className="text-cyan-600 hover:text-cyan-800 text-sm font-medium">
                View All Appointments →
              </button></Link>
            </div>
          )}
        </div>
        
        
      </div>
    </div>
  )
}

export default Dashboard