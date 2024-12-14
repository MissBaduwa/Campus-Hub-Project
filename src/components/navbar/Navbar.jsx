import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const role = localStorage.getItem('role');
  
  // Simulate user logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Reset login state
    localStorage.removeItem('isLoggedIn'); 
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/login');
  };


  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn'); 
    setIsLoggedIn(loggedIn === 'true'); 
  }, []);


  return (
    <nav className="bg-gray-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="hover:text-pink-200 font-bold">Campus Hub</Link>
      <div className="flex space-x-4">
        {!isLoggedIn && isAuthPage ? (
          <>
            <Link to="/login" className="hover:text-pink-200">Login</Link>
            <Link to="/register" className="hover:text-pink-200">Register</Link>
          </>
        ) : (
          <>
            <Link to="/home" className="hover:text-pink-200">Home</Link>
            <Link to="/events" className="hover:text-pink-200">Events</Link>
            <Link to="/profile" className="hover:text-pink-200">Profile</Link>
            <button onClick={handleLogout} className="hover:text-pink-200">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
