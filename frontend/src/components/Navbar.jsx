import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LogoutBtn from './LogoutBtn';

function Navbar() {
    const { user } = useAuth();
  return (
        
            <div className=" justify-between w-xl md:w-5xl backdrop-blur-sm rounded-full border-white py-4 px-6 flex items-center ">
                <NavLink to={'/'} className="font-extrabold text-white font-serif text-xl">shoW<span className=" text-red-400">Pic</span></NavLink>
               { !user && <div className="flex gap-2  "> 
                    <NavLink to={'/login'} className="px-6 py-3 rounded-full text-md hover:bg-gray-600/80 " >Login</NavLink>
                    <NavLink to={'/register'} className="px-6 py-3 rounded-2xl hover:rounded-full bg-white shadow-md shadow-white/40 text-black text-md font-bold hover:bg-white/80 ">SignUP</NavLink>
                </div>}
                {user && <LogoutBtn />}
            </div>
        
  )
}

export default Navbar