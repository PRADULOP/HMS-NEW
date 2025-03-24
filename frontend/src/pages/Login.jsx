import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  // Sync state based on URL
  const [state, setState] = useState('Login');
  useEffect(() => {
    const mode =
      location.search === '?login' || location.pathname === '/login'
        ? 'Login'
        : 'Sign Up';
    setState(mode);
  }, [location]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect if token already exists
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password || (state === 'Sign Up' && !name)) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      if (state === 'Sign Up') {
        // Sign Up API call
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success('Account created! Redirecting to login...');
          setTimeout(() => {
            navigate('/login?login');
          }, 1500);
        } else {
          toast.error(data.message);
        }
      } else {
        // Login API call
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Login successful');
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={onSubmitHandler} className="min-h-[90vh] flex items-center">
        <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-xl bg-white text-gray-600 shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-gray-500 mb-2">
            Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
          </p>

          {state === 'Sign Up' && (
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-gray-300 rounded-md w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                type="text"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-gray-300 rounded-md w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              type="email"
              placeholder="example@email.com"
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
              placeholder="********"
              required
            />
          </div>

          <button className="bg-cyan-500 text-white w-full py-2.5 mt-2 rounded-md text-base font-medium hover:bg-cyan-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50">
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>

          {state === 'Sign Up' ? (
            <p className="text-sm text-center w-full mt-2">
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-cyan-500 font-medium hover:text-cyan-700 cursor-pointer transition-colors"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-center w-full mt-2">
              Create a new account?{' '}
              <span
                onClick={() => setState('Sign Up')}
                className="text-cyan-500 font-medium hover:text-cyan-700 cursor-pointer transition-colors"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
