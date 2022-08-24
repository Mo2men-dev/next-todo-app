import React, { useEffect, useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { deleteTodoList, updateTodosLists } from "../helpers/firestore";
import { MdDone } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";
import { Todo } from "./TodoListContainer";

function TodoList(props: { title: string; todos: Array<Todo> }) {
  const [editTodo, setEditTodo] = useState(false);
  const [editTodoTitle, setEditTodoTitle] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState<Todo>({
    text: "",
    done: false,
  });
  const [todoListTitle, setTodoListTitle] = useState(props.title);
  const [todosState, setTodosState] = useState<Todo[]>(props.todos);
  const currentUser = useAuthContext()?.currentUser;

  return (
    <>
      <div className="w-fit h-fit bg-yellow-400 m-1 rounded-md p-2 shadow-md dark:bg-slate-400">
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
                disabled={todoListTitle === props.title}
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
                <AiOutlinePlus
                  className="ml-2 text-emerald-700"
                  onClick={() => {
                    setAddTodo(!addTodo);
                  }}
                />
              </button>
              <button>
                <AiFillDelete
                  className="ml-2 text-red-500"
                  onClick={() => {
                    deleteTodoList(currentUser!.uid, props.title);
                    localStorage.removeItem(`${props.title}-x`);
                  }}
                />
              </button>
            </div>
          )}
          {/* create a form to add a new todo that renders conditionaly based on the addTodo state */}
          {addTodo ? (
            <div className="flex justify-between p-1 ml-1">
              <input
                value={newTodo.text}
                maxLength={20}
                onChange={(e) => {
                  setNewTodo({
                    ...newTodo,
                    text: e.target.value,
                  });
                }}
                className="block p-1 my-1 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                className="text-sm ml-1"
                onClick={() => {
                  const newTodos = [...todosState, newTodo];
                  setTodosState(newTodos);
                  updateTodosLists(currentUser!.uid, {
                    todos: {
                      [todoListTitle]: {
                        title: todoListTitle,
                        todos: newTodos,
                      },
                    },
                  });
                  setNewTodo({
                    ...newTodo,
                    text: "",
                  });
                }}
              >
                Add
              </button>
            </div>
          ) : null}
        </div>
        {props.todos.map((todo, index) => {
          return (
            <div key={index} className="flex flex-col">
              {editTodo ? (
                <div className="flex">
                  <input
                    className="block p-1 my-1 w-fit text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    value={todosState[index].text}
                    onChange={(e) => {
                      const newTodos = [...props.todos];
                      newTodos[index].text = e.target.value;
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
                      checked={todo.done}
                      onClick={() => {
                        const updateCheckboxForTodo = [...props.todos];
                        updateCheckboxForTodo[index].done =
                          !props.todos[index].done;
                        setTodosState(updateCheckboxForTodo);
                      }}
                      onChange={() => {
                        updateTodosLists(currentUser!.uid, {
                          todos: {
                            [todoListTitle]: {
                              title: todoListTitle,
                              todos: todosState,
                            },
                          },
                        });
                      }}
                      className="relative top-2/4 -translate-y-2/4 w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="purple-checkbox"
                      className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {todo.text}
                    </label>
                  </div>
                  <div className="flex">
                    <button>
                      <BsFillPencilFill
                        className="ml-2 text-slate-100"
                        onClick={() => setEditTodo(!editTodo)}
                      />
                    </button>
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => {
                        // checks if todo list will be empty after deleting todo
                        const newTodos = [...props.todos];
                        if (newTodos.length <= 2) {
                          deleteTodoList(currentUser!.uid, props.title);
                          localStorage.removeItem(`${props.title}-x`);
                        } else {
                          newTodos.splice(index, 1);
                          setTodosState(newTodos);
                          updateTodosLists(currentUser!.uid, {
                            todos: {
                              [todoListTitle]: {
                                title: todoListTitle,
                                todos: newTodos,
                              },
                            },
                          });
                        }
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TodoList;
