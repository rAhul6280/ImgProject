
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App(){ 

  return (
    <div className="bg-[#121213] box-border min-h-screen text-white  flex  justify-center">
      <ToastContainer/>
        <Outlet/>
    </div>
  )
}

export default App
