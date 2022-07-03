import { useAuthContext } from "../context/AuthContext";
import { deleteTimetable } from "../helpers/firestore";

export interface TimeTableType {
  headers: string[];
  rows: Array<{
    title: string;
    data: string[];
  }>;
}

function TimeTable(props: { title: string; timeTable: TimeTableType }) {
  const currentUser = useAuthContext()?.currentUser;
  return (
    <div className="flex flex-col w-full justify-center items-center my-2">
      <span className="w-full">
        <span className="bg-yellow-400 text-black font-semibold dark:bg-slate-400 dark:text-white p-1 rounded-t-md">
          {props.title}
        </span>
      </span>
      <table className="w-full border-collapse border-spacing-0 table-auto text-xs text-left bg-yellow-400 text-gray-500 mb-1 mx-1 dark:bg-slate-400 dark:text-gray-400">
        <thead className="text-xs text-black uppercase bg-yellow-400 dark:bg-slate-400 dark:text-slate-200">
          <tr>
            <th scope="col" className="w-5 p-1"></th>
            {props.timeTable.headers.map((header, index) => (
              <th key={`${index}${header}`} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              <button
                className="flex bg-red-600 p-1 whitespace-nowrap font-medium rounded-md text-white text-xs"
                onClick={() => {
                  deleteTimetable(currentUser!.uid, props.title);
                }}
              >
                Delete Table
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.timeTable.rows?.map((row, index) => (
            <tr
              key={`${index}${row.title}`}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="p-1">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {row.title}
              </th>
              {row.data.map((data, index) => (
                <td key={`${index}`} className="px-6 py-4">
                  {data}
                </td>
              ))}
              <td className="px-6 py-4"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeTable;
