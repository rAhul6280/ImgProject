import React from "react";

function Input (
  { placeholder, type, value, name, onChange, className,ref ,...props}
  
) {
  return (
    <div>
      <input
        placeholder={placeholder}
        name={name}
        min={4}
        max={22}
        type={type}
        value={value}
        onChange={onChange}
        ref={ref}
        className={` bg-transparent  border border-gray-600 hover:border-gray-400 hover:bg-gray-600/20  transition duration-300
      outline-none focus:ring-2 focus:ring-blue-500 px-2 w-full rounded-2xl py-4 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
