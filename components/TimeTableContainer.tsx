import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import TimeTable from "../components/TimeTable";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import type { TimeTableType } from "../../next-todo/components/TimeTable";

function TimeTableContainer() {
  const currentUser = useAuthContext()?.currentUser;
  const [timeTableTitles, setTimeTableTitles] = useState<string[]>([]);
  const [timeTables, setTimeTables] = useState<TimeTableType[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, currentUser!.uid, "timetables"), (doc) => {
      const data = doc.data()!.timetables;
      setTimeTableTitles(Object.keys(data));
      const tables: TimeTableType[] = Object.values(data);
      setTimeTables(tables);
      return () => unsub();
    });
  }, []);

  return (
    <div className="flex flex-col w-full p-4 animate-fade">
      <h1 className="text-white text-3xl mb-1">Tables</h1>
      <div className="flex p-2 bg-slate-200 rounded-md flex-wrap overflow-x-auto shadow-xl dark:bg-gray-700">
        {timeTables.length > 0 ? (
          timeTables.map((table: any, index) => {
            return (
              <TimeTable
                key={index}
                timeTable={table}
                title={timeTableTitles[index]}
              />
            );
          })
        ) : (
          <p className="w-full h-40 flex justify-center items-center text-black dark:text-white text-xl">
            No Tables
          </p>
        )}
      </div>
    </div>
  );
}

export default TimeTableContainer;
