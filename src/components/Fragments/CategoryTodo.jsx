import React, { useEffect, useState } from "react";
import { DropdownMenu } from "../Elements/DropdownMenu";
import { FormEdit } from "./FormEdit";

export const CategoryTodo = (props) => {
 const { selectCategory, listCategories, handleDelete, toggleEdit, handleEdit } = props;
 const [isOpenCat, setIsOpenCat] = useState("");

 const toggleCategoryList = (value) => {
  selectCategory(value);
  setIsOpenCat(value);
 };
 
 useEffect(() => {
  if (listCategories.length > 0) {
   setIsOpenCat(listCategories[0].id);
  }
 }, [listCategories]);

 return (
  <div className="w-full flex py-5 items-start max-h-full">
   {/* Container utama */}
   <div className="group py-5 rounded-xl shadow-md w-full bg-white/5 max-h-full overflow-hidden">
    <h2 className="text-lg font-semibold mb-2 px-5">List</h2>

    {/* List kategori dengan efek hover untuk menampilkan scrollbar */}
    <ul className="bg-linear-to-t scrollbar-hidden max-h-72 overflow-hidden sm:hover:overflow-y-auto overflow-y-auto">

     {listCategories.map((value) =>
      value.isEdited ? (
       <FormEdit key={value.id} task={value} toggleEdit={toggleEdit} handleEdit={handleEdit} fieldName={"name"} />
      ) : ( 
       <li key={value.id} className="flex justify-between px-4 my-3">
        <button
         onClick={() => toggleCategoryList(value.id)}
         className={`z-40 w-full text-start hover:bg-white/15 px-3 rounded-l-md ${
          isOpenCat === value.id && "bg-black/15"
         }`}
        >
         {value.name}
        </button>
        <div>
         <DropdownMenu caption="Option" handleDelete={handleDelete} task={value} toggleEdit={toggleEdit} />
        </div>
       </li>
      )
     )}
    </ul>
   </div>
  </div>
 );
};
