import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className="mt-24 mx-auto  py-10 px-6 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative group">
                        {isEdit ? (
                            <label htmlFor="image" className="cursor-pointer block">
                                <div className="relative w-40 h-40 overflow-hidden rounded-full border-4 border-cyan-100 shadow-md">
                                    <img 
                                        className={`w-full h-full object-cover transition-opacity duration-300 ${image ? 'opacity-80' : 'opacity-75'}`} 
                                        src={image ? URL.createObjectURL(image) : userData.image} 
                                        alt="Profile" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
                                        <img 
                                            className="w-12 h-12" 
                                            src={image ? '' : assets.upload_icon} 
                                            alt="Upload" 
                                        />
                                    </div>
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" className="hidden" />
                            </label>
                        ) : (
                            <div className="w-40 h-40 overflow-hidden rounded-full border-4 border-cyan-100 shadow-md">
                                <img 
                                    className="w-full h-full object-cover" 
                                    src={userData.image} 
                                    alt="Profile" 
                                />
                            </div>
                        )}
                    </div>

                    {/* Edit/Save Button */}
                    <div>
                        {isEdit ? (
                            <button 
                                onClick={updateUserProfileData} 
                                className="w-full px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Changes
                            </button>
                        ) : (
                            <button 
                                onClick={() => setIsEdit(true)} 
                                className="w-full px-6 py-2.5 border-2 border-cyan-500 text-cyan-600 font-medium rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Profile Details Section */}
                <div className="flex-1 w-full">
                    <div className="mb-6">
                        {isEdit ? (
                            <input 
                                className="w-full text-3xl font-bold text-gray-800 bg-gray-50 border-b-2 border-cyan-300 focus:border-cyan-500 focus:outline-none px-2 py-1 transition-colors" 
                                type="text" 
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                value={userData.name} 
                            />
                        ) : (
                            <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-cyan-200 pb-2">{userData.name}</h1>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm">
                        <h2 className="text-cyan-700 font-semibold mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            CONTACT INFORMATION
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
                            <div className="font-medium text-gray-700">Email:</div>
                            <div className="text-cyan-600">{userData.email}</div>
                            
                            <div className="font-medium text-gray-700">Phone:</div>
                            {isEdit ? (
                                <input 
                                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400" 
                                    type="text" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                    value={userData.phone} 
                                />
                            ) : (
                                <div className="text-cyan-600">{userData.phone}</div>
                            )}
                            
                            <div className="font-medium text-gray-700">Address:</div>
                            {isEdit ? (
                                <div className="space-y-2">
                                    <input 
                                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400" 
                                        type="text" 
                                        placeholder="Address Line 1"
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                        value={userData.address.line1} 
                                    />
                                    <input 
                                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400" 
                                        type="text" 
                                        placeholder="Address Line 2"
                                        onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                        value={userData.address.line2} 
                                    />
                                </div>
                            ) : (
                                <div className="text-gray-600">
                                    {userData.address.line1}<br />
                                    {userData.address.line2}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                        <h2 className="text-cyan-700 font-semibold mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            BASIC INFORMATION
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
                            <div className="font-medium text-gray-700">Gender:</div>
                            {isEdit ? (
                                <select 
                                    className="w-full md:w-auto bg-white border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                    value={userData.gender}
                                >
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <div className="text-gray-600">{userData.gender}</div>
                            )}
                            
                            <div className="font-medium text-gray-700">Birthday:</div>
                            {isEdit ? (
                                <input 
                                    className="w-full md:w-auto bg-white border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400" 
                                    type="date" 
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                    value={userData.dob} 
                                />
                            ) : (
                                <div className="text-gray-600">{userData.dob}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile

// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { assets } from '../assets/assets'

// const MyProfile = () => {

//     const [isEdit, setIsEdit] = useState(false)

//     const [image, setImage] = useState(false)

//     const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

//     // Function to update user profile data using API
//     const updateUserProfileData = async () => {

//         try {

//             const formData = new FormData();

//             formData.append('name', userData.name)
//             formData.append('phone', userData.phone)
//             formData.append('address', JSON.stringify(userData.address))
//             formData.append('gender', userData.gender)
//             formData.append('dob', userData.dob)

//             image && formData.append('image', image)

//             const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

//             if (data.success) {
//                 toast.success(data.message)
//                 await loadUserProfileData()
//                 setIsEdit(false)
//                 setImage(false)
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)
//         }

//     }

//     return userData ? (
//         <div className='mt-20 max-w-lg flex flex-col gap-2 text-sm pt-5'>

//             {isEdit
//                 ? <label htmlFor='image' >
//                     <div className='inline-block relative cursor-pointer'>
//                         <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
//                         <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
//                     </div>
//                     <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
//                 </label>
//                 : <img className='w-36 rounded' src={userData.image} alt="" />
//             }

//             {isEdit
//                 ? <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
//                 : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
//             }

//             <hr className='bg-[#ADADAD] h-[1px] border-none' />

//             <div>
//                 <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
//                 <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
//                     <p className='font-medium'>Email id:</p>
//                     <p className='text-cyan-500'>{userData.email}</p>
//                     <p className='font-medium'>Phone:</p>

//                     {isEdit
//                         ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
//                         : <p className='text-cyan-500'>{userData.phone}</p>
//                     }

//                     <p className='font-medium'>Address:</p>

//                     {isEdit
//                         ? <p>
//                             <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
//                             <br />
//                             <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
//                         : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
//                     }

//                 </div>
//             </div>
//             <div>
//                 <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
//                 <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
//                     <p className='font-medium'>Gender:</p>

//                     {isEdit
//                         ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
//                             <option value="Not Selected">Not Selected</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                         </select>
//                         : <p className='text-gray-500'>{userData.gender}</p>
//                     }

//                     <p className='font-medium'>Birthday:</p>

//                     {isEdit
//                         ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
//                         : <p className='text-gray-500'>{userData.dob}</p>
//                     }

//                 </div>
//             </div>
//             <div className='mt-10'>

//                 {isEdit
//                     ? <button onClick={updateUserProfileData} className='border border-cyan-500 px-8 py-2 rounded-full hover:bg-cyan-500 hover:text-white transition-all'>Save information</button>
//                     : <button onClick={() => setIsEdit(true)} className='border border-cyan-500 px-8 py-2 rounded-full hover:bg-cyan-500 hover:text-white transition-all'>Edit</button>
//                 }

//             </div>
//         </div>
//     ) : null
// }

// export default MyProfile