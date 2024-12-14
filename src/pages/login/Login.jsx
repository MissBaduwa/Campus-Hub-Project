import React, { useState } from 'react';
import { loginUser } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';


const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log('API Response:', response); 
      const { token, role } = response;
  
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); 
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('id', decodedToken.id); 
        alert('Login successful!');
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Sorry. Login failed. Please try again.');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="flex flex-nowrap bg-white rounded-lg shadow-md overflow-hidden max-w-5xl">

        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-pink-500 mb-6">Welcome Back</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 hover:bg-pink-600"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register">
              <button className="bg-white text-pink-500 px-6 py-3 rounded-full shadow-lg hover:bg-pink-100 transition-all">
                Register
              </button>
            </Link>
          </p>
        </div>


        <div className="md:block w-1/2 bg-pink-500">
          <img
            src="/img5.jpg" 
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};


export default Login;
