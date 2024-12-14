import React, { useState } from 'react';
import { registerUser } from '../../utils/api';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    preferences: '', 
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="flex flex-nowrap bg-white rounded-lg shadow-md overflow-hidden max-w-5xl">
        
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-pink-500 mb-6">Create An Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
              </select>
            </div>

            <div>
              <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">Preferences</label>
              <textarea
                id="preferences"
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows="4"
                placeholder="Enter your preferences (optional)"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 hover:bg-pink-600"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/login">
              <button className="bg-white text-pink-500 px-6 py-3 rounded-full shadow-lg hover:bg-pink-100 transition-all">
                Login
              </button>
            </Link>
          </p>
        </div>
         
         <div className="md:block w-1/2 bg-pink-500">
          <img
            src="/assets/img5.jpg" 
            alt="Registration Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};


export default Register;
