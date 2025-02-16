import React, { useEffect, useState } from "react";
import { TodoItem } from "../components/Fragments/TodoItem";
import { FormInput } from "../components/Fragments/FormInput";
import {
 addDoc,
 collection,
 deleteDoc,
 doc,
 getDocs,
 onSnapshot,
 query,
 Timestamp,
 updateDoc,
 where,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { CategoryTodo } from "../components/Fragments/CategoryTodo";
// import { FormEdit } from "../components/Fragments/FormEdit";
import { ModalConfirm } from "../components/Elements/ModalConfirm";
import { ModalInputTask } from "../components/Elements/ModalInputTask";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const TodoWrapper = () => {
 const [categories, setCategories] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState(null);
 const [todos, setTodos] = useState([]);
 const [isOpenSidebar, setIsOpenSidebar] = useState(false);

 const [toggleLogout, setToggleLogout] = useState(false);
 // @function ModalDeleteConfirm at TodoItems
 const [IsModalOpen, setIsModalOpen] = useState(false);
 const [IdWasDelete, setIdWasDelete] = useState("");

 //Modal Task Input
 const [isOpenModalTask, setIsOpenModalTask] = useState(false);

 // Auth Func
 const [user, setUser] = useState(null);

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user_log) => {
   if (!user_log) {
    alert("You need to be logged in!");
    window.location.href = "/auth/login";
   } else {
    setUser(user_log);
   }
  });
  return () => unsubscribe();
 }, []);

 useEffect(() => {
  if (user) {
   const fetchCategories = async () => {
    try {
     const q = query(collection(db, "todoGroups"), where("userUid", "==", user.uid));
     const querySnapshot = await getDocs(q);
     const categoriesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
     }));
     setCategories(categoriesData);

     // If no categories, set the first one as the selected category
     if (categoriesData.length > 0) {
      setSelectedCategory(categoriesData[0].id);
     }
    } catch (error) {
     console.error("Error fetching categories:", error);
    }
   };

   fetchCategories();
  }
 }, [user]);
 useEffect(() => {
  if (!selectedCategory) return;
  const unsubscribe = onSnapshot(collection(db, "todoGroups", selectedCategory, "todos"), (snapshot) => {
   setTodos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
  return () => unsubscribe();

  // setSelectedCategory((prevTask))
 }, [selectedCategory]);

 const addCategory = async (value) => {
  if (!value.trim()) return;
  if (!value) alert("Please Input Your Todos Categories!");
  const docRef = await addDoc(collection(db, "todoGroups"), {
   name: value,
   isEdited: false,
   userUid: user.uid,
  });
  setCategories([
   ...categories,
   {
    id: docRef.id,
    name: value,
    isEdited: false,
    userUid: user.uid,
   },
  ]);
 };

 //  ListDelete
 const [isCofirmDeleteList, setIsConfirmDeleteList] = useState(false);
 const [idListDelete, setIdListDelete] = useState("");

 const handleDelete = async (id) => {
  await deleteDoc(doc(db, "todoGroups", id));
  setCategories(categories.filter((cat) => cat.id !== id));
  setIsConfirmDeleteList(false);
 };

 const toggleEdit = async (id, currentValue) => {
  await updateDoc(doc(db, "todoGroups", id), {
   isEdited: !currentValue,
  });

  setCategories((prevTask) => prevTask.map((task) => (task.id === id ? { ...task, isEdited: !currentValue } : task)));
 };

 const handleEdit = async (id, value) => {
  try {
   const useRef = doc(db, "todoGroups", id);
   await updateDoc(useRef, {
    name: value.name,
   });

   //Perbaru perubahan di UI, jadi gak kosong
   setCategories((prev) => prev.map((item) => (item.id === id ? { ...item, name: value.name } : item)));
  } catch (error) {
   console.error("ERROR 401:", error);
  }
 };

 //  HandleL
 const handleLogout = async () => {
  try {
   if (user) {
    if (toggleLogout) {
     await signOut(auth);
     window.location.href = "/";
    }
   } else {
    alert("Dibatalkan");
   }
  } catch (error) {
   console.error("Error during logout:", error);
  }
 };

 // Tambah Tugas KeSubCollection
 const addTask = async (value) => {
  await addDoc(collection(db, "todoGroups", selectedCategory, "todos"), {
   todoTask: value.todoTask,
   isEdited: false,
   isCompleted: false,
   priority: value.priority,
   dueDate: Timestamp.fromDate(new Date(value.dueDate)),
  });
 };

 const deleteTask = async (id) => {
  await deleteDoc(doc(db, "todoGroups", selectedCategory, "todos", id));
  setTodos(todos.filter((todo) => todo.id !== id));

  setIsModalOpen(false);
 };

 const toggleTaskEdit = async (id, currentValue) => {
  await updateDoc(doc(db, "todoGroups", selectedCategory, "todos", id), {
   isEdited: !currentValue,
  });

  setTodos((prevTask) => prevTask.map((task) => (task.id === id ? { ...task, isEdited: !currentValue } : task)));
 };

 const handleTaskEdit = async (id, value) => {
  try {
   await updateDoc(doc(db, "todoGroups", selectedCategory, "todos", id), {
    todoTask: value.todoTask,
    priority: value.priority,
    dueDate: Timestamp.fromDate(new Date(value.dueDate)),
   });
  } catch (error) {
   console.error("HandleTaskEdit", error);
  }
 };

 const onCompleted = async (id, currentValue) => {
  await updateDoc(doc(db, "todoGroups", selectedCategory, "todos", id), {
   isCompleted: !currentValue,
  });
 };

 //  Sort
 const priorityOrder = { High: 1, Medium: 2, Low: 3 };
 const sortedTodos = [...todos].sort((a, b) => {
  return priorityOrder[a.priority] - priorityOrder[b.priority];
 });

 return (
  <div className="min-h-screen bg-[#f4f6ff] dark:bg-[#0b192c] ">
   <div className="w-full grid grid-cols-12 justify-center text-slate-800 sm:min-h-screen">
    {/* Sidebar Toggle Navbar Android */}
    <nav className="z-40 flex justify-between sm:justify-end text-black/50 dark:text-white/50 w-full backdrop-blur-xs py-4 px-8 focus:outline-none top-0 left-0 fixed">
     <button onClick={() => setIsOpenSidebar(!isOpenSidebar)} className="inline sm:hidden">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
     </button>
     {user && (
      <div className="flex items-center gap-4">
       <h1>{user.displayName || user.email}</h1>
       <button
        type="button"
        className="hover:bg-red-600 hover:text-white border-2 p-1 px-5 text-sm rounded-full border-red-600 text-red-600"
        onClick={() => setToggleLogout(true)}
       >
        Logout
       </button>
      </div>
     )}
    </nav>

    {/* Nav resposive desktop */}

    <aside
     className={`z-40 fixed sm:p-0 pl-10 inset-y-0 left-0 md:1/4 bg-[#0B192C] lg:w-1/3 text-slate-300 transition-transform transform ${
      isOpenSidebar ? "-translate-x-14" : "-translate-x-full"
     } md:translate-x-0`}
    >
     <div className="w-full flex px-5 pt-11 sm:pt-8 flex-col dark:bg-black/15 light:bg-[#021526] ">
      <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
      <div className="min-h-screen flex p-5 flex-col">
       <FormInput funcInput={addCategory} placeholder={"Make Your Happier Day!"} />
       <CategoryTodo
        selectCategory={setSelectedCategory}
        handleEdit={handleEdit}
        toggleEdit={toggleEdit}
        handleDelete={(id) => {
         setIsConfirmDeleteList(true);
         setIdListDelete(id);
        }}
        listCategories={categories}
       />
      </div>
     </div>
    </aside>

    <div className="md:col-span-4 col-auto"></div>

    <div className="w-full min-h-screen p-5 flex flex-col dark:text-slate-300 pt-18 col-span-12 md:col-span-8 text-center sm:px-32">
     <h1 className="w-full text-3xl text-center ">Get Things Done!</h1>
     {selectedCategory ? (
      <div className="text-lg flex flex-col items-center w-full">
       <p className="text-sm mt-3 ">Task at {categories.find((c) => c.id === selectedCategory)?.name}</p>
       <div className="w-full flex justify-end">
        <button
         onClick={() => setIsOpenModalTask(true)}
         className="p-2 w-1/3 md:w-1/4 text-sm md:text-md rounded-md mt-8 text-white text-center bg-blue-600"
        >
         Add Task
        </button>
       </div>
       {sortedTodos.length === 0 ? (
        <div className="my-72 md:my-24 flex items-center">
          <h1 className="text-black/30 dark:text-white/20 tracking-wider text-2xl text-center flex items-center gap-3">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
          <path
           fillRule="evenodd"
           d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z"
           clipRule="evenodd"
          />
         </svg>
         No Items
        </h1>
        </div>
       ) : (
        sortedTodos.map((value) =>
         value.isEdited ? (
          <ModalInputTask
           key={value.id}
           isOpen={toggleTaskEdit}
           onClose={() => toggleTaskEdit(value.id, value.isEdited)}
           onSubmit={(task) => {
            handleTaskEdit(value.id, task);
            toggleTaskEdit(value.id, value.isEdited);
           }}
           value={value}
          />
         ) : (
          <TodoItem
           key={value.id}
           task={value}
           handleDelete={() => {
            setIdWasDelete(value.id);
            setIsModalOpen(true);
           }}
           toggleTaskEdit={toggleTaskEdit}
           onCompleted={onCompleted}
          />
         )
        )
       )}
      </div>
     ) : (
      <div className="w-full h-full flex justify-center items-center">
       <h1 className="my-20 text-black/30 dark:text-white/20 tracking-wider text-2xl text-center flex flex-col sm:flex-row items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12">
         <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
         <path
          fillRule="evenodd"
          d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
          />
        </svg>
          Oops! Please input your Category
       </h1>
      </div>
     )}
    </div>

    <ModalInputTask
     isOpen={isOpenModalTask}
     onSubmit={(task) => {
      addTask(task), setIsModalOpen(false);
     }}
     onClose={() => setIsOpenModalTask(false)}
    />

    <ModalConfirm
     deskripsi={"Do you want to delete this Task?"}
     isOpen={IsModalOpen}
     onClose={() => setIsModalOpen(false)}
     onConfirm={() => deleteTask(IdWasDelete)}
    />
    <ModalConfirm
     deskripsi={"Do you want to delete this List?"}
     isOpen={isCofirmDeleteList}
     onClose={() => setIsConfirmDeleteList(false)}
     onConfirm={() => handleDelete(idListDelete)}
    />
    <ModalConfirm
     deskripsi={"Do you want to logout?"}
     isOpen={toggleLogout}
     onClose={() => setToggleLogout(false)}
     onConfirm={() => handleLogout()}
     buttonText={"Logout"}
    />

    <div
     className={`fixed inset-0 z-10 opacity-0 bg-black transition-opacity ${
      isOpenSidebar ? "opacity-50" : "opacity-0 pointer-events-none"
     } sm:hidden`}
     onClick={() => setIsOpenSidebar(!isOpenSidebar)}
    ></div>
   </div>
  </div>
 );
};
