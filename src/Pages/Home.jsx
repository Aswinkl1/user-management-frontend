import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { logoutUser } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  useEffect(() => {
    if (!state.user) {
      navigate("/login");
    }
  }, [state.user]);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 p-8 text-center">
          <h1 className="text-white text-2xl font-bold">Welcome Back</h1>
          <p className="text-blue-100 mt-2 text-sm">Manage your account</p>
        </div>

        <div className="p-8 flex flex-col gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02]"
          >
            Profile
          </button>

          <button
            onClick={() => dispatch(logoutUser())}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 px-6 rounded-lg transition duration-200 mt-2 flex justify-center items-center gap-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
