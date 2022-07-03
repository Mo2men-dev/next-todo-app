import React, { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { addTimetable } from "../helpers/firestore";
import { useAuthContext } from "../context/AuthContext";

function AddTimeTableForm(props: {
  addTimeTableForm: boolean;
  setAddTimeTableForm: (value: boolean) => void;
  timeTableTitle: string;
  setTimeTableTitle: (value: string) => void;
}) {
  const [header, setHeader] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rowData, setRowData] = useState("");
  const [rowTitle, setRowTitle] = useState("");
  const [row, setRow] = useState<{
    title: string;
    data: string[];
  }>({
    title: "",
    data: [],
  });
  const [rows, setRows] = useState<
    {
      title: string;
      data: string[];
    }[]
  >([]);

  const currentUser = useAuthContext()?.currentUser;

  const handleCreateTable = () => {
    addTimetable(currentUser!.uid, props.timeTableTitle, headers, rows);
  };

  return (
    <div className="absolute top-0 felx justify-center items-center bg-black bg-opacity-25 w-full h-full z-50">
      <button
        type="button"
        onClick={() => {
          props.setAddTimeTableForm(!props.addTimeTableForm);
          props.setTimeTableTitle("");
          setHeaders([]);
          setRows([]);
        }}
        className="flex justify-center items-center text-white my-3 mx-4 bg-red-700 focus:outline-none font-medium rounded-full text-sm p-2 text-center"
      >
        <TiDeleteOutline className="text-lg" />
      </button>
      <div className="relative w-3/4 p-3 felx shadow-2xl bg-indigo-600 dark:bg-gray-800 rounded-md top-1/3 -translate-y-1/3 left-1/2 -translate-x-1/2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Table Title
          </label>
          <input
            type="text"
            max={20}
            value={props.timeTableTitle}
            onChange={(e) => props.setTimeTableTitle(e.target.value)}
            id="small-input"
            placeholder="Table Title"
            className="block p-2 w-full shadow-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block my-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Table Headers
          </label>
          <div className="flex">
            <input
              type="text"
              max={20}
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              id="small-input"
              placeholder="Table Header"
              className="block p-2 w-full mr-1 shadow-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <button
              type="button"
              disabled={!header}
              className="px-3 py-2 text-xs font-medium text-center shadow-md text-black disabled:bg-gray-200 dark:disabled:bg-gray-400 bg-white rounded-lg hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setHeaders([...headers, header]);
                setHeader("");
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <label className="block my-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Table Rows
          </label>
          <div className="flex">
            <input
              type="text"
              value={rowTitle}
              onChange={(e) => {
                setRowTitle(e.target.value);
                setRow({ ...row, title: e.target.value });
              }}
              max={20}
              className="block p-2 w-full mr-1 shadow-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Row Title"
            />
            <input
              type="text"
              value={rowData}
              onChange={(e) => {
                setRowData(e.target.value);
                setRow({ ...row, data: rowData.split(",") });
              }}
              className="block p-2 w-full mr-1 shadow-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Row data separate with ',' "
            />
            <button
              type="button"
              disabled={
                !rowTitle ||
                !rowData ||
                rowData.split(",").length !== headers.length - 1
              }
              className="px-3 py-2 text-xs font-medium text-center shadow-md text-black disabled:bg-gray-200 dark:disabled:bg-gray-400 bg-white rounded-lg hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setRows([...rows, row]);
                setRowTitle("");
                setRowData("");
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center my-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Table Layout
          </label>
          <button
            className="px-3 py-2 text-xs font-medium text-center shadow-md text-black disabled:bg-gray-200 dark:disabled:bg-gray-400 bg-white rounded-lg hover:bg-slate-300 focus:outline-none dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
            onClick={() => {
              props.setTimeTableTitle("");
              setHeaders([]);
              setRows([]);
            }}
          >
            CLEAR
          </button>
        </div>
        <div className="flex flex-col justify-center items-center bg-white mt-2 p-2 overflow-auto shadow-md rounded-md dark:bg-gray-700">
          <table className="w-full border-collapse border-spacing-0 text-xs text-left bg-yellow-400 text-gray-500 m-1 dark:bg-slate-400 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-yellow-400 dark:bg-slate-400 dark:text-slate-200">
              <tr>
                <th scope="col" className="w-5 p-1"></th>
                {headers.map((header, index) => (
                  <th
                    key={`${index}${header}`}
                    scope="col"
                    className="px-6 py-3 "
                  >
                    {header}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
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
                  <td className="px-6 py-4">
                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-2 p-2">
          <button
            onClick={() => {
              handleCreateTable();
              props.setTimeTableTitle("");
              setHeaders([]);
              setRows([]);
            }}
            disabled={
              !props.timeTableTitle || headers.length < 1 || rows.length < 1
            }
            className="flex bg-blue-800 p-1 whitespace-nowrap dark:bg-black border-blue-600 border-2 font-medium dark:border-gray-600 bg-opacity-75 rounded-md text-slate-200 dark:text-slate-400 text-xs disabled:bg-slate-600 disabled:dark:bg-slate-600"
          >
            Create Table
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTimeTableForm;
