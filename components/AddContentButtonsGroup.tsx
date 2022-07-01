import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AddTodoForm from "./AddTodoForm";

function AddContentButtonsGroup(props: {}) {
  const [addTodoForm, setAddTodoForm] = useState(false);
  const [todoListTitle, setTodoListTitle] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  // function to remove a todo from the todos array
  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-1 p-5">
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => setAddTodoForm(!addTodoForm)}
          aria-current="page"
          className="flex justify-evenly text-xs whitespace-nowrap items-center border-none py-2 px-4 font-medium text-blue-700 bg-white rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <AiOutlinePlus className="mr-1" />
          Add Todo List
        </button>
        <button
          type="button"
          className="flex justify-evenly border-none items-center py-2 px-4 text-xs whitespace-nowrap font-medium text-blue-700 bg-white hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <AiOutlinePlus className="mr-1" />
          Add Time Table
        </button>
        <button
          type="button"
          className="flex justify-center border-none items-center py-2 px-4 text-xs whitespace-nowrap font-medium text-blue-700 bg-white rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <AiOutlinePlus className="mr-1" />
          Add A Note
        </button>
      </div>
      {/* A form to add a todo list */}

      {addTodoForm ? (
        <AddTodoForm
          addTodoForm={addTodoForm}
          setAddTodoForm={setAddTodoForm}
          todoListTitle={todoListTitle}
          setTodoListTitle={setTodoListTitle}
          todo={todo}
          setTodo={setTodo}
          todos={todos}
          setTodos={setTodos}
          removeTodo={removeTodo}
        />
      ) : null}
    </div>
  );
}

export default AddContentButtonsGroup;
