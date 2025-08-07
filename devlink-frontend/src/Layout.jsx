import { useContext } from "react";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth"; 
  // for multiple routes
  // or ['/login', '/register'].includes()
  const { loading } = useContext(UserContext);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <>
      {!hideNavbar && <Header />}
      <ToastContainer theme="dark"  />
      <Outlet />
    </>
  );
}
