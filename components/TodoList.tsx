import React, { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { deleteTodoList, updateTodosLists } from "../helpers/firestore";
import { MdDone } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";
import Draggable from "react-draggable";

function TodoList(props: { title: string; todos: Array<string> }) {
  const [editTodo, setEditTodo] = useState(false);
  const [editTodoTitle, setEditTodoTitle] = useState(false);
  const [todoListTitle, setTodoListTitle] = useState(props.title);
  const [todosState, setTodosState] = useState(props.todos);
  const currentUser = useAuthContext()?.currentUser;

  // get current todo list X coordinate and save it to local storage
  const [x, setX] = useState(
    parseInt(JSON.parse(localStorage.getItem(`${props.title}-x`) || "0"))
  );

  // a drag event listener for the todo list that makes sure it doesn't go off screen
  const handleDrag = (e: any, ui: any) => {
    // make sure the todo list doesn't go off screen and on mobile devices
    if (window.innerWidth < 768) {
      if (ui.x < 0) {
        ui.x = 0;
      } else if (ui.x > window.innerWidth - 200) {
        ui.x = window.innerWidth - 200;
      }
    }
    if (ui.x < 0) {
      localStorage.setItem(`${props.title}-x`, "0");
      setX(0);
    } else if (ui.x > window.innerWidth - 200) {
      localStorage.setItem(`${props.title}-x`, `${window.innerWidth - 200}`);
      setX(window.innerWidth - 200);
    }
    localStorage.setItem(`${props.title}-x`, JSON.stringify(ui.x));
    setX(ui.x);
  };

  return (
    <Draggable
      axis="x"
      bounds=".todo-list-container"
      handle=".handle"
      defaultPosition={{ x: x, y: 0 }}
      position={{ x: x, y: 0 }}
      grid={[10, 10]}
      scale={1}
      onDrag={handleDrag}
    >
      <div className="handle hover:cursor-move w-fit h-fit bg-yellow-400 m-1 rounded-md p-2 shadow-md dark:bg-slate-400">
        <div className="flex w-full justify-between items-center">
          {editTodoTitle ? (
            <div className="flex justify-between items-center">
              <input
                className="block p-1 my-1 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={todoListTitle}
                onChange={(e) => {
                  setTodoListTitle(e.target.value);
                }}
              />
              <button>
                <TiDeleteOutline
                  className="ml-2 text-red-600"
                  onClick={() => setEditTodoTitle(!editTodoTitle)}
                />
              </button>
              <button
                className="ml-2 text-green-600"
                onClick={() => {
                  updateTodosLists(currentUser!.uid, {
                    todos: {
                      todoListTitle: {
                        title: todoListTitle,
                        todos: todosState,
                      },
                    },
                  });
                  setEditTodoTitle(!editTodoTitle);
                }}
              >
                <MdDone />
              </button>
            </div>
          ) : (
            <div className="flex justify-between">
              <h1 className="text-lg font-bold text-black dark:text-slate-200">
                {props.title}
              </h1>
              <button>
                <BsFillPencilFill
                  className="ml-2 text-slate-100"
                  onClick={() => setEditTodoTitle(!editTodoTitle)}
                />
              </button>
              <button>
                <AiFillDelete
                  className="ml-2 text-red-500"
                  onClick={() => {
                    deleteTodoList(currentUser!.uid, props.title);
                  }}
                />
              </button>
            </div>
          )}
        </div>
        {props.todos.map((todo, index) => {
          return (
            <div key={index} className="flex flex-col">
              {editTodo ? (
                <div className="flex">
                  <input
                    className="block p-1 my-1 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    value={todosState[index]}
                    onChange={(e) => {
                      const newTodos = [...props.todos];
                      newTodos[index] = e.target.value;
                      setTodosState(newTodos);
                    }}
                  />
                  <button>
                    <TiDeleteOutline
                      className="ml-2 text-red-600"
                      onClick={() => setEditTodo(!editTodo)}
                    />
                  </button>
                  <button
                    className="ml-2"
                    onClick={() => {
                      updateTodosLists(currentUser!.uid, {
                        todos: {
                          [todoListTitle]: {
                            title: todoListTitle,
                            todos: todosState,
                          },
                        },
                      });
                      setEditTodo(!editTodo);
                    }}
                  >
                    <MdDone className="text-green-600" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div className="mb-1">
                    <input
                      id="purple-checkbox"
                      type="checkbox"
                      value=""
                      className="relative top-2/4 -translate-y-2/4 w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="purple-checkbox"
                      className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {todo}
                    </label>
                  </div>
                  <button>
                    <BsFillPencilFill
                      className="ml-2 text-slate-100"
                      onClick={() => setEditTodo(!editTodo)}
                    />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Draggable>
  );
}

export default TodoList;
