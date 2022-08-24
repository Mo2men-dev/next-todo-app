import { db } from "../firebase/firebase";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteField,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { Todo } from "../components/TodoListContainer";

// create 3 documents in the collection with the id of the user called "todos" , "timetables" and "notes"
export const createNewCollectionDocs = async (userId: string) => {
  await setDoc(doc(db, userId, "todos"), {
    userId,
    title: "Todos",
    createdAt: new Date(),
    todos: {},
  });
  await setDoc(doc(db, userId, "timetables"), {
    userId,
    title: "Timetables",
    createdAt: new Date(),
    timetables: {},
  });
  await setDoc(doc(db, userId, "notes"), {
    userId,
    title: "Notes",
    createdAt: new Date(),
    notes: [],
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
  todos: Todo[]
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

// add a timetable to the "timetables" document
export const addTimetable = async (
  userId: string,
  timetableTitle: string,
  headers: string[],
  rows: {
    title: string;
    data: string[];
  }[]
) => {
  const fieldRef = doc(db, userId, "timetables");
  await updateDoc(fieldRef, {
    [`timetables.${timetableTitle}`]: {
      headers: headers,
      rows: rows,
    },
  });
};

// delete a timetable
export const deleteTimetable = async (userId: string, timetableId: string) => {
  const fieldRef = doc(db, userId, "timetables");
  await updateDoc(fieldRef, {
    [`timetables.${timetableId}`]: deleteField(),
  });
};

// add a note to the "notes" document
export const addNote = async (userId: string, noteContent: string) => {
  const fieldRef = doc(db, userId, "notes");
  await updateDoc(fieldRef, {
    notes: arrayUnion(noteContent),
  });
};

// remove a note
export const removeNote = async (userId: string, noteContent: string) => {
  const fieldRef = doc(db, userId, "notes");
  await updateDoc(fieldRef, {
    notes: arrayRemove(noteContent),
  });
};
