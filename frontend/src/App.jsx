import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-[#121213] box-border text-white  flex items-center justify-center">
        <Outlet/>
    </div>
  )
}

export default App
