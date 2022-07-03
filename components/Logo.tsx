import React from "react";

function Logo() {
  return (
    <img
      src="/Logo.png"
      alt="logo"
      width={window.innerWidth > 650 ? 376 : 250}
      height={window.innerWidth > 650 ? 142 : 100}
      className="mx-auto"
    />
  );
}

export default Logo;
