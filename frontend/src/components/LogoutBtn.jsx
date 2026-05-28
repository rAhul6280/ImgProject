import React from 'react'
import useAuth from '../hooks/useAuth'

function LogoutBtn() {
  const { handleLogout } = useAuth()



  return (
    <div>
        <button 
        onClick={() => {
          handleLogout()
        }}
        className="px-6 py-3 rounded-2xl  bg-red-500 text-white text-md font-bold hover:bg-red-600 ">Logout</button>
    </div>
  )
}

export default LogoutBtn