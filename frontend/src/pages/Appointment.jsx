import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth()
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        if (!slotTime) {
            toast.warning('Please select a time slot')
            return
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/apis/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Doctor Profile Card */}
            <div className="mt-16 mb-12">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-2xl h-32"></div>
                <div className="bg-white rounded-2xl shadow-lg p-6 relative">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Doctor Image */}
                        <div className="md:w-64 mx-auto md:mx-0 -mt-20">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-30"></div>
                                <img 
                                    className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl border-4 border-white shadow-lg mx-auto" 
                                    src={docInfo.image} 
                                    alt={docInfo.name} 
                                />
                            </div>
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-1 mt-4 md:mt-0">
                            <div className="flex items-center">
                                <h1 className="text-3xl font-bold text-gray-800">{docInfo.name}</h1>
                                <img className="w-6 h-6 ml-2" src={assets.verified_icon} alt="Verified" />
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <span className="text-gray-600">{docInfo.degree} - {docInfo.speciality}</span>
                                <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-medium">{docInfo.experience}</span>
                            </div>
                            
                            <div className="mt-6">
                                <div className="flex items-center mb-2">
                                    <h3 className="font-semibold text-gray-800">About</h3>
                                    <img className="w-4 h-4 ml-1" src={assets.info_icon} alt="Info" />
                                </div>
                                <p className="text-gray-600">{docInfo.about}</p>
                            </div>
                            
                            <div className="mt-6 flex items-center">
                                <div className="px-4 py-2 bg-cyan-50 rounded-lg">
                                    <span className="text-gray-600">Appointment fee:</span>
                                    <span className="ml-2 text-xl font-semibold text-cyan-600">{currencySymbol}{docInfo.fees}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Appointment Date & Time</h2>
                
                {/* Date Selection */}
                <div className="mb-8">
                    <h3 className="text-gray-600 font-medium mb-4">Available Dates</h3>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {docSlots.length > 0 && docSlots.map((item, index) => (
                            item[0] && (
                                <div 
                                    key={index} 
                                    onClick={() => setSlotIndex(index)} 
                                    className={`flex flex-col items-center justify-center min-w-20 h-24 p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                        slotIndex === index 
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md transform scale-105' 
                                            : 'border border-gray-200 hover:border-cyan-300 hover:bg-cyan-50'
                                    }`}
                                >
                                    <p className="font-bold">{daysOfWeek[item[0].datetime.getDay()]}</p>
                                    <p className="text-2xl mt-1">{item[0].datetime.getDate()}</p>
                                    <p className="text-xs mt-1">{new Intl.DateTimeFormat('en-US', { month: 'short' }).format(item[0].datetime)}</p>
                                </div>
                            )
                        ))}
                    </div>
                </div>
                
                {/* Time Selection */}
                <div className="mb-8">
                    <h3 className="text-gray-600 font-medium mb-4">Available Time Slots</h3>
                    <div className="flex flex-wrap gap-3">
                        {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setSlotTime(item.time)}
                                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                                    item.time === slotTime
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md'
                                        : 'border border-gray-200 text-gray-600 hover:border-cyan-300 hover:bg-cyan-50'
                                }`}
                            >
                                {item.time.toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Book Button */}
                <button 
                    onClick={bookAppointment}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book Appointment
                </button>
            </div>

            {/* Related Doctors Section */}
            <div className="mb-8">
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment

