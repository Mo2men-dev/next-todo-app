import React from "react";
import Image from "next/image";
import logo from "../public/Logo.png";

function Logo() {
  return (
    <Image
      src={logo}
      alt="logo"
      width={window.innerWidth > 650 ? 376 : 250}
      height={window.innerWidth > 650 ? 142 : 100}
      className="mx-auto"
    />
  );
}

export default Logo;
