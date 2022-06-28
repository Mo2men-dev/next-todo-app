import { db } from "../firebase/firebase";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

// create 3 documents in the collection with the id of the user called "todos" , "timelines" and "notes"
export const createNewCollectionDocs = async (userId: string) => {
  await setDoc(doc(db, userId, "todos"), {
    userId,
    title: "Todos",
    createdAt: new Date(),
    todos: {},
  });
  await setDoc(doc(db, userId, "timelines"), {
    userId,
    title: "Timelines",
    createdAt: new Date(),
    timelines: {},
  });
  await setDoc(doc(db, userId, "notes"), {
    userId,
    title: "Notes",
    createdAt: new Date(),
    notes: {},
  });
};

// get the "todos" field inside the "todos" document
export const getTodosLists = async (userId: string) => {
  const docRef = doc(db, userId, "todos");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().todos;
  } else {
    console.log("No such document!");
  }
};

// add a new todo list to the "todos" document
export const addTodoList = async (
  userId: string,
  todoListTitle: string,
  todos: string[]
) => {
  const fieldRef = doc(db, userId, "todos");
  await updateDoc(fieldRef, {
    [`todos.${todoListTitle}`]: {
      title: todoListTitle,
      todos,
    },
  });
};

// a function to update the "todos" field inside the "todos" document
export const updateTodosLists = async (userId: string, data: {}) => {
  const fieldRef = doc(db, userId, "todos");
  await updateDoc(fieldRef, data);
};

// delete a todo list
export const deleteTodoList = async (userId: string, todoId: string) => {
  const fieldRef = doc(db, userId, "todos");
  await updateDoc(fieldRef, {
    [`todos.${todoId}`]: deleteField(),
  });
};
