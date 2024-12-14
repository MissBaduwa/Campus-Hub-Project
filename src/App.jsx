import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Landing from './pages/landing/Landing';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Profile from './pages/profile/Profile';
import Events from './pages/events/Events';
import EventCalendar from './pages/eventcalendar/EventCalendar';
import UpdateEvents from './pages/updateevents/UpdateEvents';



const App = () => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
   const token = localStorage.getItem('token');
   const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;
   setIsLoggedIn(!!token); 
 }, []);

 
 return(
  <Router>
    <Navbar isLoggedIn={isLoggedIn}/>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/update-events" element={<UpdateEvents />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/eventcalendar" element={<EventCalendar />} />
    </Routes>
    <Footer/>
  </Router>
 );
};


export default App;
