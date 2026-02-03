import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/layout/Layout";
import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Registeration from "./component/pages/Registeration";
import DashboardLayout from "./component/dashboard/layout/DashboardLayout";
import DashboardHome from "./component/dashboard/DashboardHome";
import UpdateProfile from "./component/dashboard/UpdateProfile";
import ForgotPassword from "./component/pages/ForgotPassword";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", 
        element: <Home />
      },

      { path: "/login", 
        element: <Login />
      },

      { path: "/register",
        element: <Registeration />
      },
      {
        path:"/forgotPassword",
        element:<ForgotPassword/>
      },
      {
        path: "/dashboardHome",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "update",
            element: <UpdateProfile />,
          },
        ],
      },
    ],
  },
]);

const App = ()=>{
  return <RouterProvider router={router} />;
};

export default App;
