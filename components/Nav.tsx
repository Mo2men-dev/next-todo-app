import React, { useState } from "react";

function Nav() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  let htmlElement: HTMLHtmlElement | null;
  if (typeof window !== "undefined") {
    // get the html element
    htmlElement = document.querySelector("html");
  }
  // set the class name of the html elemnt to dark on click
  function handleClick() {
    setIsDarkMode(!isDarkMode);
    htmlElement?.classList.toggle("dark");
  }
  return (
    <div className="absolute top-0 right-0 w-full flex justify-end">
      <button
        type="button"
        onClick={handleClick}
        className="h-fit text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 m-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Dark
      </button>
    </div>
  );
}

export default Nav;
