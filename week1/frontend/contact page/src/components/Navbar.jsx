import React from 'react';
import Logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <div className="w-full text-white flex bg-transparent pt-6 sticky px-5 justify-between items-center backdrop-blur">
      <div className="flex left-nav space-x-4 pl-8 cursor-pointer">
        <div className="size-11 animate-spin-slow ">
          <img src={Logo} alt="Logo"/>
        </div>
        <div className="text-white pt-2 text-xl font-semibold">
          App.js
        </div>
      </div>
      <div className="right-nav flex space-x-8 pr-20">
        <div>
          <button className="text-white hover:bg-white hover:text-black px-4 py-2 bg-black font-semibold rounded-xl">Login</button>
        </div>
        <div>
          <button className="text-white hover:bg-white hover:text-black px-4 py-2 font-semibold rounded-xl">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
