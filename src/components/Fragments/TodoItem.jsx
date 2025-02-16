import React, { useEffect, useState } from "react";

export const TodoItem = (props) => {
 const { task, handleDelete, toggleTaskEdit, onCompleted } = props;
 const [priority, setPriority] = useState(task.priority);

 return (
  <div className="group w-full">
   <div
    className={`relative w-full mt-5 flex items-center justify-between p-4 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-700
        bg-slate-600 dark:bg-gray-800  transition-all duration-300 ease-in-out
        group-hover:scale-105
        group-hover:shadow-md group-hover:shadow-[#066D94]
        hover:scale-105 hover:shadow-md hover:shadow-[#066D94] hover:outline-none
        dark:hover:ring-2 hover:ring-[#066D94] hover:ring-opacity-50`}
   >
    {/* Checkbox & Text */}
    <div className="flex items-center gap-3 w-full" onClick={() => onCompleted(task.id, task.isCompleted)}>
     <input
      type="checkbox"
      checked={task.isCompleted}
      onChange={() => onCompleted(task.id, task.isCompleted)}
      className="w-6 h-6 appearance-none border-2 border-gray-400 rounded-md checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-110 relative
    before:content-['✔'] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 before:text-white checked:before:scale-100"
     />
     <div className="flex w-full justify-between pr-4">
      <div className="flex flex-col gap-0.5 ml-3 align-top">
       <span
        className={`text-md sm:text-xl tracking-wider text-start font-semibold transition-all duration-200 ${
         task.isCompleted
          ? "line-through text-white/20"
          : "text-white/80 group-hover:text-white group-hover:[text-shadow:_0_0_5px_rgb(125,211,252)]"
        }`}
       >
        {task.todoTask}
       </span>
       <h1
        className={`text-xs text-start font-semibold ${
         task.isCompleted
          ? "text-white/20"
          : priority === "High"
          ? "text-red-500"
          : priority === "Medium"
          ? "text-yellow-500"
          : "text-green-500"
        }`}
       >
        {task.priority}
       </h1>
      </div>
      <div className="flex">
       <span
        className={`text-xs italic font-semibold transition-all duration-200  ${
         task.isCompleted ? " text-white/20" : "text-white/50"
        }`}
       >
        {task.dueDate?.toDate().toLocaleDateString("id-ID")}
       </span>
      </div>
     </div>
    </div>

    {/* Tombol Aksi */}
    <div className="flex justify-end z-20">
     <button
      onClick={() => toggleTaskEdit(task.id, task.isEdited)}
      className="p-3 hover:opacity-80 transition-all duration-200 hover:scale-110"
     >
      <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth={1.5}
       stroke="currentColor"
       className="size-6 text-white/50 hover:text-blue-600"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
       />
      </svg>
     </button>
     <button onClick={handleDelete} className="p-3 hover:opacity-80 transition-all duration-200 hover:scale-110">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       strokeWidth={1.5}
       stroke="currentColor"
       className="size-6 text-white/50 hover:text-red-400"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
       />
      </svg>
     </button>
    </div>
   </div>
  </div>
 );
};
