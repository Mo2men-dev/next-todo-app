import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";

function NotesContainer() {
  // user notes
  const [notes, setNotes] = useState<string[]>([]);
  const currentUser = useAuthContext()?.currentUser;

  useEffect(() => {
    onSnapshot(doc(db, currentUser!.uid, "notes"), (doc) => {
      const data = doc.data()!.notes;
      setNotes(data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full p-4 animate-fade">
      <h1 className="text-white text-3xl mb-1">Notes</h1>
      <div className="flex p-2 bg-slate-200 rounded-md flex-wrap shadow-xl dark:bg-gray-700">
        {notes.length > 0 ? (
          notes.map((note, index) => <Note key={index} noteText={note} />)
        ) : (
          <p className="w-full h-40 flex justify-center items-center text-black dark:text-white text-xl">
            No Notes
          </p>
        )}
      </div>
    </div>
  );
}

export default NotesContainer;
