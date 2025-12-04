import { useImperativeHandle, useRef, useState } from "react";

const Input = ({ text, className, placeHolder, ref }) => {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        getValue: () => {
          return inputRef.current.value;
        },
      };
    },
    []
  );

  return (
    <>
      <input
        type="text"
        className={className}
        placeholder={placeHolder}
        ref={inputRef}
      />
    </>
  );
};

export default Input;
