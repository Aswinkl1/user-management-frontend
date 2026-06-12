import { useEffect, useRef, useState } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { userSignup } from "../redux/features/auth/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim()))
    return "Please enter a valid email address";
  return "";
}

function validatePassword(password) {
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  const hasUpperCase = /[A-Z]/.test(password);
  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter";
  }

  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (!hasSpecialChar) {
    return "Password must contain at least one special character";
  }
  return "";
}
const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const RePasswordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  function handleClickToLogin() {
    navigate("/login");
  }

  useEffect(() => {
    if (state?.error) {
      toast.error(state?.error);
      dispatch(resetError());
    }
  }, [state.error]);

  useEffect(() => {
    if (state?.user) {
      navigate("/");
    }
  }, [state?.user]);
  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current?.getValue() || "";
    const name = nameRef.current?.getValue() || "";
    const password = passwordRef.current?.getValue() || "";
    const rePassword = RePasswordRef.current?.getValue() || "";

    if (email && name && password && rePassword) {
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      if (emailError) {
        toast.error(emailError);
      }

      if (passwordError) {
        toast.error(passwordError);
        return;
      }

      if (password != rePassword) {
        toast.error("password didn't match");
        return;
      }

      const user = { email, name, password };

      try {
        const ee = await userSignup(user);
        toast.success("sign in successfull");
        navigate("/login");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    } else {
      toast.error("please enter valid values");
    }
  }
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="w-120 flex flex-col   px-15 py-20 bg-white/90  rounded-2xl shadow-[5px_4px_27px_0px_rgba(0,0,0,0.1)] ">
          <h1 className="my-5 font-bold text-3xl text-center"> Signup </h1>
          <Input
            className={" rounded my-3 py-2 bg-gray-50 px-2 decoration-0"}
            placeHolder={"Enter your Name"}
            ref={nameRef}
          />
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

          <Input
            className={" rounded my-3 py-2 bg-gray-50 px-2 decoration-0"}
            placeHolder={"Re Enter password"}
            ref={RePasswordRef}
          />

          <Button
            className={
              " bg-blue-500 py-2 rounded decoration-0 text-white font-bold mt-5"
            }
            text={"SignUp"}
            handleClick={handleSubmit}
          />
          <p className="mt-3 text-center">
            Already have an account?
            <a
              href=""
              className="ml-3 text-end hover:cursor-pointer text-blue-700"
            >
              <button onClick={handleClickToLogin}>Login</button>
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
