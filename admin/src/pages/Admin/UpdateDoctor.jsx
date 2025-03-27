import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const UpdateDoctor = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [docImg, setDocImg] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [existingImage, setExistingImage] = useState('')

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/apis/admin/doctor/${id}`, {
                    headers: { 
                        'Authorization': `Bearer ${aToken}`
                    }
                })
                
                if (data.success) {
                    const doctor = data.doctor
                    setName(doctor.name)
                    setEmail(doctor.email)
                    setExperience(doctor.experience)
                    setFees(doctor.fees)
                    setAbout(doctor.about)
                    setSpeciality(doctor.speciality)
                    setDegree(doctor.degree)
                    setExistingImage(doctor.image)
                    
                    // Set address fields
                    if (doctor.address) {
                        setAddress1(doctor.address.line1 || '')
                        setAddress2(doctor.address.line2 || '')
                    }
                }
            } catch (error) {
                toast.error(error.message)
                console.log(error)
            }
        }

        if (id) {
            fetchDoctorDetails()
        }
    }, [id, backendUrl, aToken])

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            const formData = new FormData()

            if (docImg) {
                formData.append('image', docImg)
            }
            formData.append('name', name)
            formData.append('email', email)
            if (password) {
                formData.append('password', password)
            }
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.put(`${backendUrl}/apis/admin/update-doctor/${id}`, formData, { 
                headers: { 
                    'Authorization': `Bearer ${aToken}`,
                    'Content-Type': 'multipart/form-data',  
                }
            })
            
            if (data.success) {
                toast.success(data.message)
                navigate('/doctor-list')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
            <form onSubmit={onSubmitHandler} className="w-full max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-cyan-800">Update Doctor</h2>
                    <div className="h-1 flex-grow mx-4 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full"></div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header with image upload area */}
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-500 p-6 flex items-center gap-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                <span className="text-white text-xs font-medium">Change Photo</span>
                            </div>
                            <label htmlFor="doc-img" className="cursor-pointer block">
                                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white flex items-center justify-center">
                                    {docImg ? (
                                        <img 
                                            className="w-full h-full object-cover" 
                                            src={URL.createObjectURL(docImg)} 
                                            alt="Doctor preview" 
                                        />
                                    ) : existingImage ? (
                                        <img 
                                            className="w-full h-full object-cover" 
                                            src={existingImage} 
                                            alt="Doctor" 
                                        />
                                    ) : (
                                        <img 
                                            className="w-16 h-16 opacity-70" 
                                            src={assets.upload_area} 
                                            alt="Upload area" 
                                        />
                                    )}
                                </div>
                            </label>
                            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" className="hidden" />
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-semibold">Doctor Profile</h3>
                            <p className="text-blue-100 text-sm">{docImg ? 'New photo selected' : 'Current photo displayed'}</p>
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left column */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Dr. John Doe"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="doctor@example.com" 
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Password (Leave blank to keep current)</label>
                                    <input 
                                        type="password" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter new password if changing" 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                                    <select 
                                        value={experience}
                                        onChange={e => setExperience(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none appearance-none bg-white"
                                    >
                                        <option value="1 Year">1 Year</option>
                                        <option value="2 Year">2 Years</option>
                                        <option value="3 Year">3 Years</option>
                                        <option value="4 Year">4 Years</option>
                                        <option value="5 Year">5 Years</option>
                                        <option value="6 Year">6 Years</option>
                                        <option value="8 Year">8 Years</option>
                                        <option value="9 Year">9 Years</option>
                                        <option value="10 Year">10 Years</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Consultation Fee (₹)</label>
                                    <input 
                                        type="number" 
                                        value={fees}
                                        onChange={e => setFees(e.target.value)}
                                        placeholder="Enter amount" 
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                                    <select 
                                        value={speciality}
                                        onChange={e => setSpeciality(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none appearance-none bg-white"
                                    >
                                        <option value="General physician">General physician</option>
                                        <option value="Gynecologist">Gynecologist</option>
                                        <option value="Dermatologist">Dermatologist</option>
                                        <option value="Pediatricians">Pediatricians</option>
                                        <option value="Neurologist">Neurologist</option>
                                        <option value="Gastroenterologist">Gastroenterologist</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Medical Degree</label>
                                    <input 
                                        type="text" 
                                        value={degree}
                                        onChange={e => setDegree(e.target.value)}
                                        placeholder="e.g. MBBS, MD, MS" 
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input 
                                        type="text" 
                                        value={address1}
                                        onChange={e => setAddress1(e.target.value)}
                                        placeholder="Street address"
                                        required 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none"
                                    />
                                    <input 
                                        type="text" 
                                        value={address2}
                                        onChange={e => setAddress2(e.target.value)}
                                        placeholder="City, State, Zip"
                                        required 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <label className="block text-sm font-medium text-gray-700">About Doctor</label>
                            <textarea 
                                value={about}
                                onChange={e => setAbout(e.target.value)}
                                placeholder="Include doctor's biography, achievements, specializations and areas of expertise..."
                                rows={5}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition duration-200 outline-none"
                            ></textarea>
                        </div>

                        <div className="mt-10 flex justify-end gap-4">
                            <button 
                                type="button"
                                onClick={() => navigate('/doctor-list')}
                                className="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg shadow hover:shadow-md transition"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 focus:ring-4 focus:ring-cyan-200"
                            >
                                Update Doctor
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateDoctor