import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [selectedSpecialty, setSelectedSpecialty] = useState(speciality || 'All')
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const specialities = ['All', 'General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist']

  useEffect(() => {
    if (selectedSpecialty === 'All') {
      setFilterDoc(doctors)
    } else {
      setFilterDoc(doctors.filter(doc => doc.speciality === selectedSpecialty))
    }
  }, [selectedSpecialty, doctors])

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty)
    specialty === 'All' ? navigate('/doctors') : navigate(`/doctors/${specialty}`)
  }

  return (
    <div className="container mt-16 px-4 py-8 relative">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Find Your Doctor</h1>
      <p className="text-gray-600 mb-8">Select a specialty to see available doctors.</p>

      {/* Horizontal Specialties */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {specialities.map((specialty, index) => (
          <button
            key={index}
            onClick={() => handleSpecialtyClick(specialty)}
            className={`py-2 px-4 rounded-full border text-sm whitespace-nowrap ${
              selectedSpecialty === specialty 
                ? 'bg-cyan-500 text-white border-cyan-500' 
                : 'border-gray-300 text-gray-700 hover:bg-cyan-100'
            }`}
          >
            {specialty}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filterDoc.length > 0 ? (
          filterDoc.map((doctor, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${doctor._id}`); scrollTo(0, 0) }}
              className="group border border-gray-200 hover:border-cyan-300 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg bg-white hover:-translate-y-2"
            >
              <div className="bg-gradient-to-b from-cyan-50 to-white h-48 flex items-center justify-center overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={doctor.image}
                  alt={doctor.name}
                />
              </div>
              <div className="p-5">
                <div className={`flex items-center gap-2 text-sm mb-2 ${doctor.available ? 'text-green-500' : "text-gray-500"}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${doctor.available ? 'bg-green-500' : "bg-gray-500"}`}></span>
                  <span>{doctor.available ? 'Available' : "Not Available"}</span>
                </div>
                <h3 className="text-gray-800 text-lg font-medium mb-1 group-hover:text-cyan-600 transition-colors">{doctor.name}</h3>
                <p className="text-gray-500 text-sm">{doctor.speciality}</p>
                <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
                  <button className="bg-cyan-50 text-cyan-600 w-full py-2 rounded-md text-sm font-medium hover:bg-cyan-100 transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No doctors found for <strong>{selectedSpecialty}</strong>
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors

