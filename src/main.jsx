import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store.js";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import AdminHome from "./Pages/Admin/Home.jsx";
import { checkAuth } from "./redux/features/auth/authSlice.js";

async function authLoderForLogin() {
  console.log("i am the workd");
  const user = store.getState().auth.user;
  if (!user) {
    const action = await store.dispatch(checkAuth());
    console.log(action);
    if (checkAuth.fulfilled.match(action)) {
      if (action.payload.data.isAdmin) {
        return redirect("/admin");
      }

      return redirect("/");
    } else {
      console.log("iwiiwi");
      return null;
    }
  } else {
    return redirect("/");
  }
  // return redirect("/");
}

async function authLoder() {
  const user = store.getState().auth.user;
  if (!user) {
    const action = await store.dispatch(checkAuth());
    console.log(action);
    if (checkAuth.fulfilled.match(action)) {
      if (action.payload.data.isAdmin) {
        return redirect("/admin");
      }
      return null;
    } else {
      return redirect("/login");
    }
  } else {
    return null;
  }
  // return redirect("/");
}

async function authLoderAdmin() {
  const user = store?.getState()?.auth?.user;

  if (!user) {
    const action = await store.dispatch(checkAuth());
    console.log(action);
    if (checkAuth.fulfilled.match(action)) {
      if (action.payload.data.isAdmin) {
        return null;
      }
      return redirect("/");

      console.log("fufj");
    } else {
      return redirect("/login");
    }
  } else {
    return null;
  }
  // return redirect("/");
}
const router = createBrowserRouter([
  {
    path: "/",
    // middleware: [authLoder],
    loader: authLoder,
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "/profile",
        Component: Profile,
      },
    ],
  },
  {
    // middleware: [authLoderForLogin],
    loader: authLoderForLogin,
    Component: App,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
    ],
  },

  {
    path: "/admin",
    loader: authLoderAdmin,
    Component: AdminHome,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
