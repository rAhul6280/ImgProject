import React from "react";

import { Link } from "react-router-dom";
import Input from "../components/input";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

function Register() {
  const { register: registerUser}  = useAuth();
  const { register, handleSubmit ,formState:{errors} } = useForm();
  const createUser = async (data) => {

    try {
      const resp = await registerUser(data);
    } catch (error) {}
  };
  return (
    <div className="w-full  flex justify-center">
      <div className=" w-1/2  flex flex-col py-26  items-center">
        <h1 className="text-3xl font-bold mb-22">Create A New Account</h1>
        <form
          className="flex flex-col gap-6 w-full px-20"
          onSubmit={handleSubmit(createUser)}
           noValidate
        >
          <Input
            type={"text"}
            placeholder={"Username"}
            name={"username"}
            {...register("username", { required: true ,maxLength: 20 })}
            
          />
            {errors.username && <span className="text-red-500 text-sm">Username is required and should be less than 20 characters</span>}
          <Input
            type={"email"}
            placeholder={"Email"}
            name={"email"}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
            
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          <Input
            type={"password"}
            placeholder={"Password"}
            name={"password"}
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && <span className="text-red-500 text-sm">Password is required and should be at least 6 characters</span>}
          <Input 
            type={"password"}
            placeholder={"Confirm Password"}
            name={"confirmPassword"}
            {...register("confirmPassword", {
              required: true,
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}

          <button
            type="submit"
            className=" text-white font-bold bg-blue-500 rounded-full py-4  hover:bg-blue-600 my-4"
          >
            Register
          </button>
        </form>
        <p className="text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>  
        
      </div>
    </div>
  );
}

export default Register;
