import React from 'react';


const Button = ({ label, onClick, type = 'button', variant = 'primary', disabled = false }) => {
  const baseStyles = 'px-4 py-2 font-semibold rounded-lg';
  const variants = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
  };


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  );
};


export default Button;

  