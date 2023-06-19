import React from 'react';
import GoogleLogo from '../assets/google_logo.png';

const GoogleSignUpButton = ({handleClick}) => {
  return (
   <>
    <button className="flex items-center justify-center px-4 py-2 mt-6 bg-white border border-blue-500 hover:bg-blue-500 active:bg-blue-300
    hover:text-white text-blue-500 rounded-md focus:outline-none" onClick={handleClick}>
      <div className="bg-white rounded-md p-1">
        <img src={GoogleLogo} alt="Google Logo" className="w-4 h-4" />
      </div>
      <span className="font-medium ml-2">Register with Google</span>
    </button>
   </>
  );
};

const GoogleLoginButton = ({handleClick}) => {
  return (
    <button className="flex items-center justify-center px-4 py-2 mt-6 bg-white border border-blue-500 hover:bg-blue-500 active:bg-blue-300
    hover:text-white text-blue-500 rounded-md focus:outline-none" onClick={handleClick}>
      <div className="bg-white rounded-md p-1">
        <img src={GoogleLogo} alt="Google Logo" className="w-4 h-4" />
      </div>
      <span className="font-medium ml-2">SignIn with Google</span>
    </button>
  );
};

export { GoogleLoginButton, GoogleSignUpButton };
