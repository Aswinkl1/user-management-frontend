import { useState } from "react";

const Input = ({ text, className, placeHolder }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={className}
        placeholder={placeHolder}
      />
    </>
  );
};

export default Input;
