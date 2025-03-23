import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`min-h-screen bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <h2 className="text-lg font-bold text-cyan-500">
            Care<span className="text-gray-700">Connect</span>
          </h2>
        )}
        <button 
          onClick={toggleSidebar} 
          className="p-1 rounded-full hover:bg-gray-100 text-cyan-500"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* User Profile Section */}
      <div className={`p-4 ${collapsed ? 'text-center' : 'text-left'} border-b`}>
        <div className={`${collapsed ? 'flex justify-center' : 'flex items-center space-x-3'}`}>
          <div className="bg-cyan-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          {!collapsed && (
            <div>
              <p className="font-medium text-gray-700">{aToken ? 'Admin Panel' : 'Doctor Panel'}</p>
              <p className="text-xs text-gray-500">Healthcare System</p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Navigation */}
      {aToken && (
        <div className="mt-6">
          {!collapsed && <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Admin</p>}
          <ul className="space-y-1">
            <NavLink 
              to={'/admin-dashboard'} 
              className={({isActive}) => 
                `flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 transition-colors duration-200 ${
                  isActive 
                    ? 'bg-cyan-50 text-cyan-500 border-r-4 border-cyan-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className="bg-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </NavLink>
            
            <NavLink 
              to={'/all-appointments'} 
              className={({isActive}) => 
                `flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 transition-colors duration-200 ${
                  isActive 
                    ? 'bg-cyan-50 text-cyan-500 border-r-4 border-cyan-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className="bg-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {!collapsed && <span className="ml-3">Appointments</span>}
            </NavLink>
            
            <NavLink 
              to={'/add-doctor'} 
              className={({isActive}) => 
                `flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 transition-colors duration-200 ${
                  isActive 
                    ? 'bg-cyan-50 text-cyan-500 border-r-4 border-cyan-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className="bg-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {!collapsed && <span className="ml-3">Add Doctor</span>}
            </NavLink>
            
            <NavLink 
              to={'/doctor-list'} 
              className={({isActive}) => 
                `flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 transition-colors duration-200 ${
                  isActive 
                    ? 'bg-cyan-50 text-cyan-500 border-r-4 border-cyan-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className="bg-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              {!collapsed && <span className="ml-3">Doctors List</span>}
            </NavLink>
          </ul>
        </div>
      )}

      {/* Doctor Navigation */}
      {dToken && (
        <div className="mt-6">
          {!collapsed && <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Doctor</p>}
          <ul className="space-y-1">
            <NavLink 
              to={'/doctor-dashboard'} 
              className={({isActive}) => 
                `flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 transition-colors duration-200 ${
                  isActive 
                    ? 'bg-cyan-50 text-cyan-500 border-r-4 border-cyan-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className="bg-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              {!collapsed && <span className="ml-3">Dashboard</span>}
            </NavLink>
            
            <NavLink 
              to={'/doctor-appointments'} 
              className={({isActive}) => 
                `flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 transition-colors duration-200 ${
                  isActive 
                    ? 'bg-cyan-50 text-cyan-500 border-r-4 border-cyan-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className="bg-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              {!collapsed && <span className="ml-3">Appointments</span>}
            </NavLink>
            
            <NavLink 
              to={'/doctor-profile'} 
              className={({isActive}) => 
                `flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 transition-colors duration-200 ${
                  isActive 
                    ? 'bg-cyan-50 text-cyan-500 border-r-4 border-cyan-500' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className="bg-white p-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              {!collapsed && <span className="ml-3">Profile</span>}
            </NavLink>
          </ul>
        </div>
      )}

     
    </div>
  );
};

export default Sidebar;

