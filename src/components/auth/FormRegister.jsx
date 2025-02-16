import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const FormRegister = () => {
 const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
})

 const handleRegister = async (e) => {
    const { displayName, email, password } = formData;
  e.preventDefault();
  try {
   // Register ke firebase auth
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   const user = userCredential.user;

   await updateProfile(user, { displayName });
   await setDoc(doc(db, "users", user.uid), {
    username: displayName,
    email,
    password,
    createAt: new Date(),
   });
   alert("Register Succesfully! now go straight to the page");
   window.location.href = "/pages/home"
  } catch (error) {
   console.error("Error registrasi: ", error);
   alert("Terjadi kesalahan saat registrasi.");
  }
 };

 return (
  <div className="w-full justify-center items-center dark:text-white/80 text-black/60">
   <form onSubmit={handleRegister} className="col-span-3  sm:col-span-1 flex-col gap-5 mt-5 grid grid-rows-3">
    <div>
     <p className="text-md">Username</p>
     <input
      className="border border-slate-400 shadow-md p-3 w-full rounded-xl"
      type="text"
      placeholder="Username"
      onChange={(e) => setFormData({...formData, displayName: e.target.value})}
     />
    </div>

    <div>
     <p className="text-md">Email</p>
     <input
      className="border border-slate-400 shadow-md p-3 w-full rounded-xl"
      type="email"
      placeholder="example@gmail.com"
      onChange={(e) => setFormData({...formData, email: e.target.value})}
     />
    </div>

    <div>
     <p className="text-md">Password</p>
     <input
      className="border border-slate-400 shadow-md p-3 w-full rounded-xl"
      type="password"
      placeholder="****"
      onChange={(e) => setFormData({...formData, password: e.target.value})}
     />
    </div>

    {/* <div>
     <select className="border w-full p-2" onChange={(e) => setRole(e.target.value)}>
      <option value="petugas">Petugas</option>
      <option value="administrator">Administrator</option>
     </select>
    </div> */}
    <button className="bg-blue-500 rounded-xl shadow-md h-12 text-white font-semibold" type="submit">
     Submit
    </button>
   </form>
  </div>
 );
};

export default FormRegister;
