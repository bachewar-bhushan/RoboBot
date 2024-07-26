import React, { useState, useEffect } from "react";
import { Link } from 'react-scroll';
import { useStateStore } from "../zustand/useStateStore";

const Navbar = () => {
  const {activeSection} = useStateStore();

  return (
    <div className="flex justify-center"><div className="flex justify-center rounded-b-xl mx-7  h-[7vh] shadow-lg items-center fixed w-[50vw] ">
      <div className='flex items-center justify-center '>
                <header className='header1 font-Montserrat text-3xl text-[#757fb1d0] italic font-black'>
                    Robo
                </header>
                <header className='header2 font-Montserrat text-2xl text-[#8b89898c] tracking-wide italic pt-1 font-black'>
                    Bot:
                </header>
                <header className="pt-2 mx-2 text-lg tracking-wide italic text-[#757fb1d0] font-medium">
                A Real-Time Gas Data Monitoring and Anomaly Detection Bot
                </header>
            </div>
    </div></div>
    
  );
};

export default Navbar;