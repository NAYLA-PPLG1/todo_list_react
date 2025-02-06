import React from "react";
import { DropdownMenu } from "../Elements/DropdownMenu";
import { FormEdit } from "./FormEdit";

export const CategoryTodo = (props) => {
  const { selectCategory, listCategories, handleDelete, toggleEdit, handleEdit } = props;

  return (
    <div className="w-full flex py-5 items-start max-h-full">
      {/* Container utama */}
      <div className="group py-5 rounded-xl shadow-md w-full bg-white/5 max-h-full overflow-hidden">
        <h2 className="text-lg font-semibold mb-2 px-5">Category List</h2>

        {/* List kategori dengan efek hover untuk menampilkan scrollbar */}
        <ul className="bg-linear-to-t scrollbar-hidden group-hover:scrollbar-hover max-h-56 overflow-hidden hover:overflow-y-auto">
          {listCategories.map((value) =>
            value.isEdited ? (
              <FormEdit
                key={value.id}
                task={value}
                toggleEdit={toggleEdit}
                handleEdit={handleEdit}
                fieldName={"name"}
              />
            ) : (
              <li key={value.id} className="flex justify-between md:px-4 lg:px-8  my-3">
                <button
                  onClick={() => selectCategory(value.id)}
                  className="w-full text-start hover:bg-white/10 px-3 rounded-l-md"
                >
                  {value.name}
                </button>
                <div>
                  <DropdownMenu handleDelete={handleDelete} task={value} toggleEdit={toggleEdit} />
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};
