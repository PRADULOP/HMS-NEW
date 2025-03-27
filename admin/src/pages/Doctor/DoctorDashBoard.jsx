import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  const DashboardCard = ({ icon, value, label, className = '' }) => (
    <div className={`bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-cyan-500 ${className}`}>
      <div className="flex items-center space-x-4">
        <img className="w-12 h-12 object-contain" src={icon} alt={label} />
        <div>
          <p className="text-2xl font-bold text-gray-800">{label === 'Earnings' ? `${currency} ${value}` : value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )

  return dashData && (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="container mx-auto">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <DashboardCard 
            icon={assets.earning_icon} 
            value={dashData.earnings} 
            label="Earnings" 
            className="bg-gradient-to-r from-cyan-50 to-white"
          />
          <DashboardCard 
            icon={assets.appointments_icon} 
            value={dashData.appointments} 
            label="Appointments" 
            className="bg-gradient-to-r from-purple-50 to-white"
          />
          <DashboardCard 
            icon={assets.patients_icon} 
            value={dashData.patients} 
            label="Patients" 
            className="bg-gradient-to-r from-green-50 to-white"
          />
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-cyan-500 text-white px-6 py-4 flex items-center space-x-3">
            <img src={assets.list_icon} alt="Bookings" className="w-6 h-6 filter brightness-0 invert" />
            <h2 className="text-xl font-semibold">Latest Bookings</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div 
                key={index} 
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" 
                    src={item.userData.image} 
                    alt={item.userData.name} 
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.userData.name}</p>
                    <p className="text-sm text-gray-500">
                      Booking on {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {item.cancelled ? (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">
                    Completed
                  </span>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => completeAppointment(item._id)}
                      className="p-2 bg-green-50 text-green-500 rounded-full hover:bg-green-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard