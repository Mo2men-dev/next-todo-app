import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useAuthContext } from "../context/AuthContext";
import { removeNote } from "../helpers/firestore";

function Note(props: { noteText: string }) {
  // a random color for each note
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-700",
    "bg-indigo-700",
    "bg-purple-700",
    "bg-pink-700",
    "bg-gray-500",
    "bg-black",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const currentUser = useAuthContext()?.currentUser;

  return (
    <div
      className={`${color} text-white p-2 whitespace-nowrap rounded-md m-0.5 flex justify-center shadow-lg`}
    >
      {props.noteText.toUpperCase()}
      <button
        onClick={() => {
          removeNote(currentUser!.uid, props.noteText);
        }}
        className="text-white ml-1 font-bold"
      >
        <TiDeleteOutline />
      </button>
    </div>
  );
}

export default Note;
