import { useRef } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit() {
    if (emailRef.current && passwordRef.current) {
      alert(emailRef.current.getValue());
      alert(passwordRef.current.getValue());
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="w-120 flex flex-col   px-15 py-20 bg-white/90  rounded-2xl shadow-[5px_4px_27px_0px_rgba(0,0,0,0.1)] ">
          <h1 className="my-5 font-bold text-3xl text-center"> Login </h1>
          <Input
            className={" rounded my-3 py-2 bg-gray-50 px-2 decoration-0"}
            placeHolder={"Enter your email"}
            ref={emailRef}
          />
          <Input
            className={" rounded my-3 py-2 bg-gray-50 px-2 decoration-0"}
            placeHolder={"Enter your password"}
            ref={passwordRef}
          />

          <Button
            className={
              " bg-blue-500 py-2 rounded decoration-0 text-white font-bold mt-5"
            }
            text={"login"}
            handleClick={handleSubmit}
          />

          <p className="mt-3 text-center">
            Dont have an account?
            <a
              href=""
              className="ml-3 text-end hover:cursor-pointer text-blue-700"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
