import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";

const AuthLayout = (props) => {
 const { children, type } = props;
 const [currentUser, setCurrentUser] = useState("");

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
   if (user) {
    setCurrentUser(user);
   } else {
    setCurrentUser(null);
   }
  });
  return () => unsubscribe();
 }, []);

 const handleLogout = async () => {
  try {
   if (currentUser) {
    const confirmation = window.confirm(`Are you sure you want to logout, ${currentUser.displayName}?`);
    if (confirmation) {
     await signOut(auth);
     alert("You have been logged out.");
    }
   } else {
    alert("No user is logged in.");
   }
  } catch (error) {
   console.error("Error during logout:", error);
  }
 };

 const navigate = useNavigate();

 return (
  <div className="w-full text-black/20 bg-[#f4f6ff] dark:bg-[#0b192c] min-h-screen  justify-center md:grid md:grid-cols-3 flex-col py-4 px-4 h-auto">
   <div className="w-full col-span-2 md:grid md:grid-cols-2">
    <div className="col-span-1">
     <button onClick={() => navigate("/")}>
      <svg
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 24 24"
       fill="currentColor"
       className="size-10 dark:text-white/30 hover:text-black/30 dark:hover:text-white/20 "
      >
       <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
        clipRule="evenodd"
       />
      </svg>
     </button>
    </div>
    <div className="w-full mt-12 md:mt-0 dark:bg-white/0 bg-slate-100 shadow-lg shadow-slate-500 dark:shadow-sky-700 p-8 text-white/90 h-full col-start-2 sm:col-end-5 xl:col-end-4 flex-col justify-center items-center">
     <h1 className="text-xl text-blue-500 dark:text-white/50 md:text-4xl">
      {type === "login" ? "Hello Friend" : "Welcome"}
     </h1>
     <p className="text-sm text-black/50 dark:text-white/50 sm:mt-4">
      {type === "login" ? "Welcome back, are you having a good day?" : "Are you going to do something today?"}
     </p>
     {children}
     <Navigation type={type} />
     <div className="w-full flex justify-center font-semibold">
      {type === "login" ? (
       <p className="mt-5 text-sm text-black/50 dark:text-white/50">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-blue-500 font-semibold">
         Sign Up
        </Link>
       </p>
      ) : (
       <p className="mt-5 text-sm text-black/50 dark:text-white/50">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 font-semibold">
         Sign In
        </Link>
       </p>
      )}
     </div>
     {currentUser ? (
      <button
       type="button"
       className="w-full mt-5 border-2 p-2 rounded-full border-red-600 text-red-600"
       onClick={() => handleLogout()}
      >
       Log out
      </button>
     ) : null}
    </div>
   </div>
  </div>
 );
};

const Navigation = ({ type }) => {
 const RegisterLink = () => {
  window.location.href = "/auth/register";
 };
 if (type === "login") {
  return (
   <button
    className="border-2 border-blue-500 rounded-xl shadow-md w-full h-12 mt- text-blue-500 mt-5 font-semibold"
    onClick={() => RegisterLink()}
   >
    Sign Up
   </button>
  );
 }
};

export default AuthLayout;
