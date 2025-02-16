import React from "react";

export const ModalConfirm = (props) => {
  const { isOpen, onClose, onConfirm, deskripsi, buttonText = "Confirm" } = props; 
 return (
  <div
   className={`fixed z-50 top-0 left-0 w-screen backdrop-brightness-50 h-screen inset-0 flex items-center justify-center transition-opacity duration-200 ${
    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
   }`}
  >
   <div
    className={`bg-white text-slate-900 p-6 rounded-lg shadow-lg w-80 transform transition-transform duration-200 ${
     isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
    }`}
   >
    <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
    <p>{deskripsi}</p>
    <div className="mt-4 flex justify-end space-x-2">
     <button onClick={onClose} className="px-4 py-2 border rounded">
      Cancel
     </button>
     <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
      {buttonText}
     </button>
    </div>
   </div>
  </div>
 );
};
