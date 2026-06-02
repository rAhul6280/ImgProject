import React from "react";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { useEffect } from "react";

function Home() {
  const { loading} = useAuth();

  
  return loading ? <Loading/>:(
    <div>
      <nav>
        <Navbar />
      </nav>
    </div>
  )
}

export default Home
