import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useAuthContext } from "../context/AuthContext";
import { addTodoList } from "../helpers/firestore";

function AddTodoForm(props: {
  addTodoForm: boolean;
  setAddTodoForm: (value: boolean) => void;
  todoListTitle: string;
  setTodoListTitle: (value: string) => void;
  todo: string;
  setTodo: (value: string) => void;
  todos: Array<string>;
  setTodos: (value: Array<string>) => void;
  removeTodo: (index: number) => void;
}) {
  const currentUser = useAuthContext()?.currentUser;
  return (
    <div className="absolute top-0 felx justify-center items-center bg-black bg-opacity-25 w-full h-full z-50">
      <button
        type="button"
        onClick={() => {
          props.setAddTodoForm(!props.addTodoForm);
        }}
        className="flex justify-center items-center text-white my-3 mx-4 bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center"
      >
        <TiDeleteOutline className="text-lg" />
      </button>
      <form className="relative w-3/4 p-3 felx shadow-2xl bg-indigo-600 dark:bg-gray-800 rounded-md top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2">
        <div>
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Todo List Title
          </label>
          <input
            type="text"
            id="small-input"
            value={props.todoListTitle}
            onChange={(e) => props.setTodoListTitle(e.target.value)}
            placeholder="Todo List Title"
            className="block p-2 w-full shadow-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mt-1">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Todo
          </label>
          <div className="flex items-center h-fit">
            <input
              type="text"
              value={props.todo}
              onChange={(e) => props.setTodo(e.target.value)}
              id="small-input"
              placeholder="Todo"
              className="mr-1 p-2 w-full text-gray-900 shadow-md bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              disabled={!props.todo}
              onClick={() => {
                props.setTodos([...props.todos, props.todo]);
                props.setTodo("");
              }}
              className="px-3 py-2 text-xs font-medium text-center shadow-md text-black disabled:bg-gray-200 dark:disabled:bg-gray-400 bg-white rounded-lg hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-2 text-sm bg-white shadow-md text-black p-1 rounded-md dark:text-white dark:bg-slate-500">
          Added Todos:
          {props.todos.length ? (
            props.todos.map((todo, index) => (
              <div
                key={index}
                className="mt-1 dark:text-white bg-indigo-600 flex shadow-md justify-between items-center font-semibold rounded-md py-1 px-2 dark:bg-gray-700 text-black"
              >
                <span className="text-white">{todo}</span>
                <button type="button" onClick={() => props.removeTodo(index)}>
                  <TiDeleteOutline className="text-lg text-white dark:text-red-500" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-sm flex w-full justify-center text-black items-center dark:text-white">
              No Todos
            </span>
          )}
        </div>
        <div className="relative felx py-3">
          <button
            disabled={!props.todoListTitle || !props.todos.length}
            onClick={() => {
              addTodoList(currentUser!.uid, props.todoListTitle, props.todos);
              props.setTodoListTitle("");
              props.setTodos([]);
            }}
            type="button"
            className="relative left-full -translate-x-16 px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg hover:bg-slate-300 disabled:bg-gray-200 dark:disabled:bg-gray-400 shadow-md focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodoForm;
