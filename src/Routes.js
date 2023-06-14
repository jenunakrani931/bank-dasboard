import { useRoutes, Navigate } from "react-router-dom";
import AuthLayout from "./Layouts/AuthLayoute";
import MainLayout from "./Layouts/MainLayuout";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import TransferToUser from "./Pages/TransferToUser";
import History from "./Pages/History";
import Inbox from "./Pages/Inbox";
import ManageUsers from "./Pages/ManageUsers";
import Product from "./Pages/Product";
import Category from "./Pages/Category";
import Book from "./Pages/Book";
import Author from "./Pages/Author";

export default function Router() {
  const token = localStorage.getItem("token");

  let element = useRoutes([
    {
      element: !token ? <AuthLayout />: <Navigate to="/product" /> ,
      children: [
        { path: "/", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
      ],
    },
    {
      element: !token ? <Navigate to="/" /> : <MainLayout />,
      children: [
        { path: "/product", element: <Product /> },
        { path: "/category", element: <Category /> },
        { path: "/author", element: <Author /> },
        { path: "/book", element: <Book /> },
        { path: "/transfer-to-user", element: <TransferToUser /> },
        { path: "/history", element: <History /> },
        { path: "/inbox", element: <Inbox /> },
        { path: "/manage-users/:val", element: <ManageUsers /> },
      ],
    },
    {
      path: "*",
      element: <>404 Page not Found</>,
    },
  ]);

  return element;
}
