import React, { useState } from "react";

export const FormInput = (props) => {
 const { label, funcInput, className, placeholder, example } = props;
 const [value, setValue] = useState("");

 const handleSubmit = (e) => {
  e.preventDefault();

  funcInput(value);
  setValue("");
 };
 return (
  <form className={`${className}`} onSubmit={handleSubmit}>
     <label className="text-md md:text-xl">{label}</label>
   <div className="group mt-5 shadow-md w-full rounded-xl flex justify-between">
    <input
     className="w-full inputan rounded-l-xl px-4 bg-white/5 focus:outline-none group-focus-within:ring-2 group-focus-within:ring-blue-500 group-focus-within:ring-opacity-50 group-focus-within:shadow-lg group-focus-within:shadow-blue-500/50 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-300"
     type="text"
     placeholder={placeholder}
     value={value}
     onChange={(e) => setValue(e.target.value)}
    />
    <button className="py-3 text-sm sm:text-md px-4 w-1/4 h-full text-white text-center bg-blue-600 rounded-r-xl group-focus-within:ring-2 group-focus-within:ring-blue-600">
     Submit
    </button>
   </div>
   <span className="pl-2 text-sm text-white/50">{example}</span>
  </form> 
 );
};
