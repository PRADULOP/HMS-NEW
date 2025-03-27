import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

const navigate = useNavigate()
  const handleChatNavigation = () =>{
    navigate('/chat');
}

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const PaymentBadge = ({ isPaid }) => (
    <span className={`px-2 py-1 me-2 text-xs font-medium rounded-md ${
      isPaid 
        ? 'bg-green-100 text-green-700' 
        : 'bg-gray-100 text-gray-700'
    }`}>
      {isPaid ? 'Online' : 'CASH'}
    </span>
  )

  const StatusBadge = ({ status }) => {
    if (status.cancelled) {
      return <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">Cancelled</span>
    }
    if (status.isCompleted) {
      return <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">Completed</span>
    }
    return null
  }

  const chatWithPatient = (patientId) => {
    console.log(`Starting chat with patient ID: ${patientId}`)
    // Integrate chat functionality here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <h1 className="text-2xl font-bold text-gray-800">All Appointments</h1>
          <div className="absolute -bottom-2 left-0 w-20 h-1 bg-cyan-500 rounded-full"></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-cyan-500">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] bg-gray-50 px-6 py-4 font-semibold text-gray-700 text-sm">
            <div>#</div>
            <div>Patient</div>
            <div>Payment</div>
            <div>Age</div>
            <div>Date & Time</div>
            <div>Fees</div>
            <div>Action</div>
            <div>Chat</div>
          </div>

          <div className="divide-y divide-gray-100">
            {appointments.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="text-gray-500">{index + 1}</div>
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.userData.image} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500" 
                    alt={item.userData.name} 
                  />
                  <span className="font-medium text-gray-800">{item.userData.name}</span>
                </div>
                <PaymentBadge isPaid={item.payment} />
                <div className="text-gray-600">{calculateAge(item.userData.dob)}</div>
                <div className="text-gray-700">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </div>
                <div className="font-semibold text-gray-800">{currency}{item.amount}</div>
                <div className="flex items-center space-x-2">
                  {item.cancelled || item.isCompleted ? (
                    <StatusBadge status={item} />
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
                <div>
                  <button 
                    onClick={() => chatWithPatient(item.userData.id)}
                    className="p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M8 14h8M4 6h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile List */}
        <div className="md:hidden divide-y divide-gray-100">
          {appointments.map((item, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.userData.image} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500" 
                    alt={item.userData.name} 
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.userData.name}</p>
                    <p className="text-sm text-gray-500">{calculateAge(item.userData.dob)} years</p>
                  </div>
                </div>
                <PaymentBadge isPaid={item.payment} />
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Date: {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p>Fees: {currency}{item.amount}</p>
              </div>
              <div className="mt-3 flex justify-between items-center">
                {item.cancelled || item.isCompleted ? (
                  <StatusBadge status={item} />
                ) : (
                  
                <button 
                onClick= {handleChatNavigation}
                    className="p-2 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    Chat
                  </button> 
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
