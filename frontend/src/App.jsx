
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {AuthContextProvider} from './context/AuthContext.jsx'

function App(){ 

  return (
    <AuthContextProvider> 
    <div className="bg-[#121213] box-border min-h-screen text-white  flex  justify-center">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        
        draggable
        
        theme="dark"

      />
        <Outlet/>
    </div>
    </AuthContextProvider>
  )
}

export default App
