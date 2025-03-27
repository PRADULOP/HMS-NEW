import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'


import axios from 'axios'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/apis/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
                {/* Profile Header */}
                <div className="relative">
                    {/* Profile Image with Overlay */}
                    <div className="relative h-64 overflow-hidden">
                        <img 
                            className="absolute inset-0 w-full h-full object-none filter brightness-75" 
                            src={profileData.image} 
                            alt={`${profileData.name}'s profile`} 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                                {profileData.name}
                            </h1>
                            <div className="flex items-center space-x-3 mt-2">
                                <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm">
                                    {profileData.speciality}
                                </span>
                                <span className="text-white text-sm">
                                    {profileData.degree}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-8 space-y-6 ">
                    {/* About Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-cyan-500 pb-2 mb-4">
                            About
                        </h2>
                        {isEdit ? (
                            <textarea 
                                className="w-full p-4 border border-cyan-500 rounded-lg focus:ring-2 focus:ring-cyan-300 transition-all"
                                rows={6}
                                value={profileData.about}
                                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                            />
                        ) : (
                            <p className="text-gray-600 leading-relaxed">
                                {profileData.about}
                            </p>
                        )}
                    </div>

                    {/* Professional Details */}
                    <div className="grid md:grid-cols-2 gap-6 bg-cyan-50/50 p-6 rounded-xl">
                        <div>
                            <p className="text-sm text-gray-500">Appointment Fee</p>
                            {isEdit ? (
                                <input 
                                    type="number" 
                                    className="w-full border border-cyan-500 rounded-md p-2 mt-1"
                                    value={profileData.fees}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                />
                            ) : (
                                <p className="text-xl font-bold text-cyan-600">
                                    {currency} {profileData.fees}
                                </p>
                            )}
                        </div>
                        
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            {isEdit ? (
                                <div className="space-y-2 mt-1">
                                    <input 
                                        type="text" 
                                        className="w-full border border-cyan-500 rounded-md p-2"
                                        value={profileData.address.line1}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                    />
                                    <input 
                                        type="text" 
                                        className="w-full border border-cyan-500 rounded-md p-2"
                                        value={profileData.address.line2}
                                        onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-700">
                                    {profileData.address.line1}
                                    <br />
                                    {profileData.address.line2}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Availability and Actions */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <input 
                                type="checkbox" 
                                checked={profileData.available}
                                onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                className="form-checkbox h-5 w-5 text-cyan-600 rounded focus:ring-cyan-500"
                            />
                            <span className="text-gray-700">Available</span>
                        </div>

                      
                        {isEdit ? (
                            <button 
                                onClick={updateProfile}
                                className="px-6 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors shadow-md"
                            >
                                Save Changes
                            </button>
                            
                            ) : (
                            <button 
                                onClick={() => setIsEdit(prev => !prev)}
                                className="px-6 py-2 border border-cyan-500 text-cyan-500 rounded-full hover:bg-cyan-500 hover:text-white transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile