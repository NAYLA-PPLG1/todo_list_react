import React, { useEffect, useState } from "react";
// import { ChevronDownIcon } from '@heroicons/react/20/solid';

export const ModalInputTask = ({ isOpen, onClose, onSubmit, value }) => {
  // const [isOpen] = useState(true)
  const [task, setTask] = useState(value || {
    todoTask: '',
    dueDate: '',
    priority: 'Low',
  });


  useEffect(() => {
    if (value) {
      setTask({
        ...value,
        dueDate: value.dueDate.seconds
          ? new Date(value.dueDate.seconds * 1000).toISOString().split("T")[0]
          : "",
      });
    }
  }, [value])


  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(task); // Kirim task ke parent (misalnya untuk ditambahkan ke list)
    onClose(false)
    setTask({ todoTask: '', dueDate: '', priority: 'Low' })
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-screen backdrop-brightness-50 h-screen inset-0 flex items-center justify-center transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transform transition-transform duration-200 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
            {value ? 'Edit Task' : 'Add Task'}
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

          {/* Deskripsi Tugas */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="todoTask">Task</label>
            <input
              id="todoTask"
              name="todoTask"
              value={task.todoTask}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Your Task"
              required
            />
          </div>

          {/* Tanggal */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="dueDate">Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Prioritas */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Tombol */}
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 hover:opacity-80 border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 hover:opacity-80 bg-blue-500 text-white rounded-md dark:bg-blue-700"
            >
              {value ? 'Edit' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
