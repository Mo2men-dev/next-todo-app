import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useAuthContext } from "../context/AuthContext";
import { addNote } from "../helpers/firestore";

function AddNoteForm(props: {
  addNoteForm: boolean;
  setAddNoteForm: (value: boolean) => void;
  noteText: string;
  setNoteText: (text: string) => void;
}) {
  const currentUser = useAuthContext()?.currentUser;
  return (
    <div className="absolute top-0 felx justify-center items-center bg-black bg-opacity-25 w-full h-full z-50">
      <button
        type="button"
        onClick={() => {
          props.setAddNoteForm(!props.addNoteForm);
          props.setNoteText("");
        }}
        className="flex justify-center items-center text-white my-3 mx-4 bg-red-700 focus:outline-none font-medium rounded-full text-sm p-2 text-center"
      >
        <TiDeleteOutline className="text-lg" />
      </button>
      <div className="relative w-3/4 p-3 felx shadow-2xl bg-indigo-600 dark:bg-gray-800 rounded-md top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2">
        <div className="flex">
          <input
            type="text"
            value={props.noteText}
            onChange={(e) => props.setNoteText(e.target.value)}
            max={100}
            className="block p-2 w-full mr-1 shadow-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            disabled={!props.noteText.length}
            type="button"
            onClick={() => {
              addNote(currentUser!.uid, props.noteText);
            }}
            className="px-3 py-2 text-xs font-medium text-center shadow-md text-black disabled:bg-gray-200 dark:disabled:bg-gray-400 bg-white rounded-lg hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNoteForm;
