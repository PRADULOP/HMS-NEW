import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          navigate('/admin-dashboard') 
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl bg-white text-gray-600 shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 m-auto">
            <span className="text-cyan-500">{state}</span> Login
          </h2>
          
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className="border border-gray-300 rounded-md w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all" 
              type="email" 
              required 
            />
          </div>
          
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className="border border-gray-300 rounded-md w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all" 
              type="password" 
              required 
            />
          </div>
          
          <button className="bg-cyan-500 text-white w-full py-2.5 mt-2 rounded-md text-base font-medium hover:bg-cyan-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50">
            Login
          </button>
          
          <p className="text-sm text-center w-full mt-2">
            {state === 'Admin' ? (
              <>Doctor Login? <span onClick={() => setState('Doctor')} className="text-cyan-500 font-medium hover:text-cyan-700 cursor-pointer transition-colors">Click here</span></>
            ) : (
              <>Admin Login? <span onClick={() => setState('Admin')} className="text-cyan-500 font-medium hover:text-cyan-700 cursor-pointer transition-colors">Click here</span></>
            )}
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login

