const Button = ({ text, className, handleClick }) => {
  return (
    <>
      <button type="submit" className={className} onClick={handleClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
