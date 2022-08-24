import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import TodoList from "../components/TodoList";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export type Todo = {
  text?: string;
  done?: boolean;
};

function TodoListContainer() {
  const currentUser = useAuthContext()?.currentUser;
  const [todoLists, setTodoLists] = useState<Array<string>>([]);
  const [todos, setTodos] = useState<Array<Todo[]>>([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, currentUser!.uid, "todos"), (doc) => {
      const data: {} = doc.data()!.todos;
      const titles = Object.values(data).map((todoList: any) => {
        return todoList && todoList.title;
      });
      const todos = Object.values(data).map((todoList: any) => {
        return todoList && todoList.todos;
      });
      setTodoLists(titles);
      setTodos(todos);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col w-full p-4 animate-fade">
      <h1 className="text-white text-3xl mb-1">Todos</h1>
      <div className="flex p-2 bg-slate-200 rounded-md flex-wrap shadow-xl dark:bg-gray-700">
        {todoLists.length > 0 ? (
          todoLists.map((listTitle, index) => {
            return (
              <TodoList key={index} title={listTitle} todos={todos[index]} />
            );
          })
        ) : (
          <p className="w-full h-40 flex justify-center items-center text-black dark:text-white text-xl">
            No Todos
          </p>
        )}
      </div>
    </div>
  );
}

export default TodoListContainer;
