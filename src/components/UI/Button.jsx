const Button = ({ text, className }) => {
  return (
    <>
      <button type="submit" className={className}>
        {text}
      </button>
    </>
  );
};

export default Button;
