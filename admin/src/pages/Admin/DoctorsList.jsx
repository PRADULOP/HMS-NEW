import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, deleteDoctor } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const handleUpdate = (doctorId) => {
    navigate(`/update/${doctorId}`);
  };

  const handleDelete = (doctorId) => {
    console.log('Delete Doctor ID:', doctorId);
    deleteDoctor(doctorId);
  };

  return (
    <div className="py-8 px-6 min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctors</h1>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {doctors.length} Doctors Registered
          </div>
        </div>

        {doctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <p className="mt-4 text-gray-500">No doctors registered yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className={`absolute inset-0 ${doctor.available ? 'bg-gradient-to-r from-green-400/20 to-blue-500/20' : 'bg-gradient-to-r from-gray-400/20 to-gray-500/20'} transition-colors duration-500`}></div>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doctor.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{doctor.speciality}</p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleUpdate(doctor._id)}
                      className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(doctor._id)}
                      className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;



