import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
 const [email, setEmail] = useState("");
//  const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 const handleLogin = async (event) => {
  event.preventDefault();
  try {
   const usercredential = await signInWithEmailAndPassword(auth, email, password);
   navigate("/pages/home");
   alert("Login Succesfully!");
  } catch (error) {
  //  alert("Incorrect email or password.");
   console.error("Login error:", error.code, error.message);
   alert(`Error: ${error.message}`);

  }
 };

 return (
  <div className="w-full justify-center items-center">
   <form onSubmit={handleLogin} className="dark:text-white/80 text-black/60 col-span-3 sm:col-span-1 flex-col gap-4 mt-5 grid grid-rows-3 items-end">
    <div>
     <label className=" text-md">Email</label>
     <input
      className="border border-slate-400 shadow-md p-3 w-full rounded-xl"
      type="email"
      placeholder="example@gmail.com"
      onChange={(e) => setEmail(e.target.value)}
     />
    </div>
    <div>
     <label className=" text-md">Password</label>
     <input className="border border-slate-400 shadow-md p-3 w-full rounded-xl" type="password" placeholder="****" onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button className="bg-blue-500 rounded-xl shadow-md h-12 text-white font-semibold" type="submit">
     Sign In
    </button>
   </form>
  </div>
 );
};

export default FormLogin;
