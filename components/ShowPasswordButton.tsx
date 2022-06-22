import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function ShowPasswordButton(props: {
  className?: string;
  onClick: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <span
      className="flex flex-col absolute justify-end items-end left-full top-10 -translate-x-8"
      onClick={() => {
        setShowPassword(!showPassword);
      }}
    >
      {showPassword ? (
        <AiFillEyeInvisible
          className={`${props.className}`}
          onClick={props.onClick}
        />
      ) : (
        <AiFillEye className={`${props.className}`} onClick={props.onClick} />
      )}
    </span>
  );
}

export default ShowPasswordButton;
