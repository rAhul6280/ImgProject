import React,{useEffect} from 'react'
import useAuth from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

function AuthLayout({children,authenticated}) {
  const {user ,loading}=useAuth();
  const navigate= useNavigate()

  useEffect(()=>{
    // console.log(authenticated,user);
      if(loading) return;
    
      if(authenticated && !user) navigate('/login');

      else if(!authenticated && user) navigate('/');
    
  }, [loading, authenticated, user, navigate]);

  return loading?<Loading/>: <> {children}</>
}
export default AuthLayout