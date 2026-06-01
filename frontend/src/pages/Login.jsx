import React, { useState, useEffect } from "react";
import Input from "../components/input";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading";

function Login() {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(form);
  };

  const isValid =
    form.email.trim() &&
    form.password.trim().length > 0 &&
    /\S+@\S+\.\S+/.test(form.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    await handleLogin(form);
    setForm({ email: "", password: "" });
  };

    if (loading) {
   return  <Loading/>
  
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-screen flex border-r-2 border-gray-500"></div>
      <div className="w-1/2 h-screen flex flex-col py-26  items-center">
        <h1 className="text-3xl font-bold mb-22"> Login to Your Account</h1>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full px-20"
        >
          <Input
            type={"email"}
            placeholder={"Email"}
            name={"email"}
            value={form.email}
            onChange={handleChange}
          />

          <Input
            type={"password"}
            placeholder={"Password"}
            value={form.password}
            name={"password"}
            onChange={handleChange}
          />

          <button
            type="button"
            className=" text-gray-300  rounded-full py-4  hover:bg-gray-600 my-4"
          >
            Forgot Password?
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-blue-600 text-white py-4 rounded-full font-bold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            Login
          </button>
          <Link
            to="/register"
            className="text-blue-600 border border-blue-600 py-4 rounded-full font-bold  text-center transition duration-300"
          >
            Create New Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
