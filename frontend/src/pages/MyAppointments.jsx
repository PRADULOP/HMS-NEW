import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const handleChatNavigation = () =>{
        navigate('/chat/patientDashboard');
    }

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/apis/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/apis/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    const { data } = await axios.post(backendUrl + "/apis/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/apis/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    // Filter appointments
    const filteredAppointments = appointments.filter(appointment => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'upcoming') return !appointment.cancelled && !appointment.isCompleted;
        if (selectedFilter === 'completed') return appointment.isCompleted;
        if (selectedFilter === 'cancelled') return appointment.cancelled;
        return true;
    });

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-6 px-6">
                        <h1 className="text-2xl font-bold text-white">My Appointments</h1>
                        <p className="text-blue-100 mt-1">Manage your upcoming and past medical consultations</p>
                    </div>
                    
                    <div className="flex overflow-x-auto gap-2 px-6 py-3 bg-slate-50 border-b border-slate-200">
                        {['all', 'upcoming', 'completed', 'cancelled'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                    selectedFilter === filter 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>
                    
                    <div className="divide-y divide-slate-200">
                        {filteredAppointments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-slate-900">No appointments found</h3>
                                <p className="text-slate-500 mt-1">No {selectedFilter !== 'all' ? selectedFilter : ''} appointments to display</p>
                            </div>
                        ) : (
                            filteredAppointments.map((appointment, index) => (
                                <div key={index} className="relative p-6 transition-all hover:bg-blue-50">
                                    {appointment.cancelled && (
                                        <div className="absolute top-0 right-0 m-4">
                                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                Cancelled
                                            </span>
                                        </div>
                                    )}
                                    {appointment.isCompleted && (
                                        <div className="absolute top-0 right-0 m-4">
                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                Completed
                                            </span>
                                        </div>
                                    )}
                                    {!appointment.cancelled && !appointment.isCompleted && (
                                        <div className="absolute top-0 right-0 m-4">
                                            
                                        </div>
                                    )}
                                    
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="relative">
                                                <img 
                                                    className="w-32 h-32 rounded-xl object-cover border-2 border-slate-200" 
                                                    src={appointment.docData.image} 
                                                    alt={appointment.docData.name} 
                                                />
                                                {appointment.payment && (
                                                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                                                        Paid
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-semibold text-slate-900">{appointment.docData.name}</h3>
                                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 mt-1">
                                                {appointment.docData.speciality}
                                            </div>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                                                <div>
                                                    <div className="flex items-center text-slate-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-sm font-medium">Date:</span>
                                                        <span className="ml-1 text-sm">{slotDateFormat(appointment.slotDate)}</span>
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <div className="flex items-center text-slate-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-sm font-medium">Time:</span>
                                                        <span className="ml-1 text-sm">{appointment.slotTime}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="sm:col-span-2">
                                                    <div className="flex items-start text-slate-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <div>
                                                            <span className="text-sm font-medium">Address:</span>
                                                            <address className="not-italic text-sm mt-0.5 leading-relaxed">
                                                                {appointment.docData.address.line1}<br />
                                                                {appointment.docData.address.line2}
                                                            </address>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-2 justify-center mt-4 md:mt-0 min-w-fit">
                                            {!appointment.cancelled && !appointment.payment && !appointment.isCompleted && payment !== appointment._id && (
                                                <button 
                                                    onClick={() => setPayment(appointment._id)} 
                                                    className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-sm hover:shadow flex items-center justify-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                    </svg>
                                                    Pay Online
                                                </button>
                                            )}
                                            
                                            {!appointment.cancelled && !appointment.payment && !appointment.isCompleted && payment === appointment._id && (
                                                <>
                                                    
                                                    
                                                    <button 
                                                        onClick={() => appointmentRazorpay(appointment._id)} 
                                                        className="w-full px-4 py-2.5 bg-white text-slate-800 font-medium rounded-lg hover:bg-slate-100 transition-all border border-slate-200 shadow-sm flex items-center justify-center"
                                                    >
                                                        <img className="h-6" src={assets.razorpay_logo} alt="Razorpay" />
                                                    </button>
                                                </>
                                            )}
                                            
                                            {!appointment.cancelled && appointment.payment && !appointment.isCompleted && (
                                                <div className="w-full px-4 py-2.5 bg-teal-50 text-teal-700 font-medium rounded-lg border border-teal-200 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Payment Complete
                                                </div>
                                            )}
                                            
                                            {!appointment.cancelled && !appointment.isCompleted && (
                                                <button 
                                                    onClick={() => cancelAppointment(appointment._id)} 
                                                    className="w-full px-4 py-2.5 bg-white text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all border border-red-200 flex items-center justify-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Cancel Appointment
                                                </button>
                                                
                                            )}
                                            {!appointment.cancelled && (
    <button 
        onClick= {handleChatNavigation}
        className="w-full px-4 py-2.5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-600 transition-all shadow-sm hover:shadow flex items-center justify-center"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-3 3a9 9 0 100-18 9 9 0 000 18z" />
        </svg>
        Chat Now
    </button>
)}

                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                         
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAppointments

