import { useEffect, useRef } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import authReducer, {
  logout,
  login,
  resetError,
} from "../redux/features/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { userLogin } from "../redux/features/auth/authService";

const Login = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  function handleClickToSignup() {
    navigate("/signup");
  }
  useEffect(() => {
    if (state?.error) {
      toast.error(state?.error);
      dispatch(resetError());
    }
  }, [state.error]);

  useEffect(() => {
    if (state?.user) {
      toast.success("login successfull");
      if (state?.user?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [state?.user]);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim()))
      return "Please enter a valid email address";
    return "";
  }

  function validatePassword(password) {
    if (password.length < 6) {
      return "Enter a valid password";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.getValue();
      const password = passwordRef.current.getValue();

      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);
      if (emailError) {
        toast.error(emailError);
        return;
      }

      if (passwordError) {
        toast.error(passwordError);
        return;
      }

      const data = {
        email,
        password,
      };
      // userLogin(data);
      dispatch(login(data));
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="w-120 flex flex-col   px-15 py-20 bg-white/90  rounded-2xl shadow-[5px_4px_27px_0px_rgba(0,0,0,0.1)] ">
          <h1 className="my-5 font-bold text-3xl text-center"> Login </h1>
          <Input
            className={"rounded my-3 py-2 bg-gray-100 px-2 decoration-0"}
            placeHolder={"Enter your email"}
            ref={emailRef}
          />
          <Input
            className={" rounded my-3 py-2 bg-gray-100 px-2 decoration-0"}
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
              {" "}
              <button onClick={handleClickToSignup}>Signup</button>
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
